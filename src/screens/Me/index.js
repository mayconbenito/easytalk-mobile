import * as ImagePicker from 'expo-image-picker';
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

  async function uploadImage(uri) {
    try {
      const data = new FormData('image');
      data.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'profile_picture',
      });

      const response = await api('/me/profile-picture', {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
      });

      setUser({ ...user, picture: response.data.user.picture });
    } catch (err) {
      console.log(err);
    }
  }

  async function openImageLibrary() {
    await ImagePicker.requestCameraRollPermissionsAsync();
    const {
      status,
      canAskAgain,
    } = await ImagePicker.getCameraPermissionsAsync();

    if (status !== 'granted' && canAskAgain) {
      await ImagePicker.requestCameraRollPermissionsAsync();
    }

    const imageLibrary = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
      base64: true,
    });

    if (!imageLibrary.cancelled) uploadImage(imageLibrary.uri);
  }

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
            <Button onPress={openImageLibrary}>
              <ButtonText>Alterar foto de perfil</ButtonText>
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
