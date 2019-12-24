import React from 'react';

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
  return (
    <Container>
      <Form>
        <Title>Entrar</Title>

        <Input
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Endereço de e-mail"
        />
        <Input secureTextEntry returnKeyType="go" placeholder="Sua senha" />

        <NavigationContainer>
          <Button onPress={() => navigation.navigate('Register')}>
            <ButtonText>Criar Conta</ButtonText>
          </Button>
          <Button>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </NavigationContainer>

        <ErrorContainer>
          <ErrorMessage />
        </ErrorContainer>
      </Form>
    </Container>
  );
}

Login.navigationOptions = () => ({
  header: null,
});

export default Login;
