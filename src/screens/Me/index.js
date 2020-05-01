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
  Profile,
  ImageContainer,
  Image,
  Username,
  Button,
  ButtonText,
} from './styles';

function Me() {
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
      {loading && <Loading loading />}

      {!loading && (
        <>
          <Profile>
            <ImageContainer onPress={openImageLibrary}>
              <Image source={user.picture ? user.picture.url : user.picture} />
            </ImageContainer>
            <Username>{user && user.name}</Username>
          </Profile>

          <Button onPress={() => dispatch(SessionActions.deleteSession())}>
            <ButtonText>Sair do App</ButtonText>
          </Button>
        </>
      )}
    </Container>
  );
}

Me.navigationOptions = ({ navigation }) => ({
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

export default Me;
