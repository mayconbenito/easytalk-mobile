import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function AuthHandler({ navigation }) {
  async function verifyAuth() {
    const jwt = await AsyncStorage.getItem('@EasyTalk:Token');
    if (jwt) {
      navigation.navigate('AppStack');
    } else {
      navigation.navigate('AuthStack');
    }
  }

  verifyAuth();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <ActivityIndicator animating color="#000" size={36} />
    </View>
  );
}
