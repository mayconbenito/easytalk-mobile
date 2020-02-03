import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import Loading from '~/components/Loading';
import { colors } from '~/config/styles';
import api from '~/services/api';
import { Creators as SessionActions } from '~/store/ducks/session';

import {
  Container,
  Header,
  ImageContainer,
  Image,
  Username,
  ButtonsContainer,
  Button,
  ButtonText,
} from './styles';

function Me({ navigation }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get('/me');

        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUser();
  }, []);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color={colors.WHITE} />
        </TouchableOpacity>
      </Header>

      {loading && <Loading />}

      {!loading && (
        <>
          <ImageContainer>
            <Image source={user.picture ? user.picture.url : user.picture} />
          </ImageContainer>
          <Username>{user && user.name}</Username>

          <ButtonsContainer>
            <Button onPress={() => dispatch(SessionActions.deleteSession())}>
              <ButtonText>Deslogar do App</ButtonText>
            </Button>
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
}

Me.navigationOptions = () => ({
  header: null,
});

export default Me;
