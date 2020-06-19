import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Creators as LoginActions } from '~/store/ducks/login';

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

function Login({ navigation }) {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    dispatch(LoginActions.requestLogin({ email, password }));
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

        <LoginButton onPress={handleSubmit}>
          <ButtonText>Entrar</ButtonText>
        </LoginButton>

        <NavigationContainer>
          <RegisterButton onPress={() => navigation.navigate('Register')}>
            <ButtonText>Criar Conta</ButtonText>
          </RegisterButton>
        </NavigationContainer>

        <ErrorContainer>
          <ErrorMessage>{login.error}</ErrorMessage>
        </ErrorContainer>
      </Form>
    </Container>
  );
}

Login.navigationOptions = () => ({
  header: null,
});

export default Login;
