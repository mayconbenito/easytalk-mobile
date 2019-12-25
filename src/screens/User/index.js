import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  Picture,
  Username,
  ButtonsContainer,
  Button,
  ButtonText,
} from './styles';

function User({ navigation }) {
  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </Header>
      <Picture />
      <Username>{navigation.state.params.data.name}</Username>

      <ButtonsContainer>
        <Button>
          <ButtonText>Adicionar Contato</ButtonText>
        </Button>
        <Button>
          <ButtonText>Ver Conversa</ButtonText>
        </Button>
      </ButtonsContainer>
    </Container>
  );
}

User.navigationOptions = () => ({
  header: null,
});

export default User;
