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

function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    try {
      const response = await api.post('/register', {
        username,
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
        setError('Formato de nome de usuário, e-mail ou senha invalido');
      }

      if (
        err.response.status === 400 &&
        err.response.data.code === 'EMAIL_ALREADY_USED'
      ) {
        setError('E-mail já em uso por outro usuário');
      }
    }
  }

  return (
    <Container>
      <Form>
        <Title>Registrar</Title>

        <Input
          returnKeyType="next"
          placeholder="Nome de usúario"
          onChangeText={txt => setUsername(txt)}
        />
        <Input
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Endereço de e-mail"
          onChangeText={txt => setEmail(txt)}
        />
        <Input
          secureTextEntry
          returnKeyType="go"
          placeholder="Sua senha"
          onChangeText={txt => setPassword(txt)}
          onSubmitEditing={handleSubmit}
        />

        <NavigationContainer>
          <Button onPress={() => navigation.navigate('Login')}>
            <ButtonText>Entrar</ButtonText>
          </Button>
          <Button onPress={handleSubmit}>
            <ButtonText>Registrar</ButtonText>
          </Button>
        </NavigationContainer>

        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      </Form>
    </Container>
  );
}

Register.navigationOptions = () => ({
  header: null,
});

export default Register;
