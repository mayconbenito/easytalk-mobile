import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import Loading from '~/components/Loading';
import { colors } from '~/config/styles';
import api from '~/services/api';
import { Creators as ContactActions } from '~/store/ducks/contact';

import {
  Container,
  Profile,
  ImageContainer,
  Image,
  Username,
  ButtonsContainer,
  Button,
  ButtonText,
} from './styles';

function User({ navigation }) {
  const dispatch = useDispatch();
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
        dispatch(ContactActions.clearState());
        dispatch(ContactActions.fetchContacts());
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
        dispatch(ContactActions.clearState());
        dispatch(ContactActions.fetchContacts());
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      {loading && <Loading />}

      {!loading && (
        <>
          <Profile>
            <ImageContainer>
              <Image source={user.picture ? user.picture.url : user.picture} />
            </ImageContainer>
            <Username>{user && user.name}</Username>
          </Profile>

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

            <Button onPress={() => navigation.navigate('Chat', { user })}>
              <ButtonText>Ver Conversa</ButtonText>
            </Button>
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: colors.PRIMARY,
  },
  headerLeft: (
    <TouchableOpacity
      style={{ marginLeft: 10 }}
      onPress={() => navigation.goBack()}
    >
      <MaterialIcons name="arrow-back" size={30} color={colors.WHITE} />
    </TouchableOpacity>
  ),
});

export default User;
