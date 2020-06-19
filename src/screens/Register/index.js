import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Creators as RegisterActions } from '~/store/ducks/register';

import {
  Container,
  Form,
  Title,
  Input,
  NavigationContainer,
  LoginButton,
  RegisterButton,
  ButtonText,
  ErrorContainer,
  ErrorMessage,
} from './styles';

function Register({ navigation }) {
  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    dispatch(RegisterActions.requestRegister({ username, email, password }));
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

        <RegisterButton onPress={handleSubmit}>
          <ButtonText>Registrar</ButtonText>
        </RegisterButton>

        <NavigationContainer>
          <LoginButton onPress={() => navigation.navigate('Login')}>
            <ButtonText>Fazer Login</ButtonText>
          </LoginButton>
        </NavigationContainer>

        <ErrorContainer>
          <ErrorMessage>{register.error}</ErrorMessage>
        </ErrorContainer>
      </Form>
    </Container>
  );
}

Register.navigationOptions = () => ({
  header: null,
});

export default Register;
