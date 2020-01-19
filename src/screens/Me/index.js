import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Loading from '~/components/Loading';
import api from '~/services/api';

import { Container, Header, Picture, Username } from './styles';

function Me({ navigation }) {
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
          <MaterialIcons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </Header>

      {loading && <Loading />}

      {!loading && (
        <>
          <Picture />
          <Username>{user && user.name}</Username>
        </>
      )}
    </Container>
  );
}

Me.navigationOptions = () => ({
  header: null,
});

export default Me;
