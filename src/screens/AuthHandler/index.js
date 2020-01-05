import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

export default function AuthHandler({ navigation }) {
  const session = useSelector(state => state.session);

  async function verifyAuth() {
    if (session.jwt) {
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
