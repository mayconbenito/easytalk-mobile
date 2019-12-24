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

function Register({ navigation }) {
  return (
    <Container>
      <Form>
        <Title>Registrar</Title>

        <Input returnKeyType="next" placeholder="Nome de usúario" />
        <Input
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Endereço de e-mail"
        />
        <Input secureTextEntry returnKeyType="go" placeholder="Sua senha" />

        <NavigationContainer>
          <Button onPress={() => navigation.navigate('Login')}>
            <ButtonText>Entrar</ButtonText>
          </Button>
          <Button>
            <ButtonText>Registrar</ButtonText>
          </Button>
        </NavigationContainer>

        <ErrorContainer>
          <ErrorMessage />
        </ErrorContainer>
      </Form>
    </Container>
  );
}

Register.navigationOptions = () => ({
  header: null,
});

export default Register;
