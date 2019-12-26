import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Loading from '~/components/Loading';
import api from '~/services/api';

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
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const userId = navigation.state.params.data._id;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/users/${userId}`);

        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  async function handleAddContact() {
    try {
      const response = await api.post(`/contacts/${userId}`);

      if (response.status === 204) {
        setUser({ ...user, isContact: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveContact() {
    try {
      const response = await api.delete(`/contacts/${userId}`);

      if (response.status === 204) {
        setUser({ ...user, isContact: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </Header>

      {loading && <Loading />}

      {!loading && (
        <>
          <Picture />
          <Username>{user && user.name}</Username>

          <ButtonsContainer>
            {user && user.isContact ? (
              <Button onPress={handleRemoveContact}>
                <ButtonText>Remover Contato</ButtonText>
              </Button>
            ) : (
              <Button onPress={handleAddContact}>
                <ButtonText>Adicionar Contato</ButtonText>
              </Button>
            )}

            <Button>
              <ButtonText>Ver Conversa</ButtonText>
            </Button>
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
}

User.navigationOptions = () => ({
  header: null,
});

export default User;
