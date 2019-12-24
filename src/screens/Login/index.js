import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';

import api from '~/services/api';

import {
  Container,
  Form,
  Title,
  Input,
  NavigationContainer,
  Button,
  ButtonText,
  ErrorContainer,
  ErrorMessage,
} from './styles';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      if (response.data.jwt) {
        await AsyncStorage.setItem('@EasyTalk:Token', response.data.jwt);
        navigation.navigate('AppStack');
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        setError('Formato de e-mail ou senha invalido');
      }

      if (err.response.status === 401) {
        setError('E-mail ou senha incorreto');
      }
    }
  }

  return (
    <Container>
      <Form>
        <Title>Entrar</Title>

        <Input
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Endereço de e-mail"
          onChangeText={txt => setEmail(txt)}
          value={email}
        />
        <Input
          secureTextEntry
          returnKeyType="go"
          placeholder="Sua senha"
          onChangeText={txt => setPassword(txt)}
          value={password}
          onSubmitEditing={handleSubmit}
        />

        <NavigationContainer>
          <Button onPress={() => navigation.navigate('Register')}>
            <ButtonText>Criar Conta</ButtonText>
          </Button>
          <Button onPress={handleSubmit}>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </NavigationContainer>

        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </Form>
    </Container>
  );
}

Login.navigationOptions = () => ({
  header: null,
});

export default Login;
