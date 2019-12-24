import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FriendItem from '~/components/FriendItem';

import { Container } from './styles';

export default function Friends({ navigation }) {
  return (
    <>
      <Container>
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
      </Container>
      <FloatingAction
        color="#714cc1"
        onPressMain={() => navigation.navigate('Search')}
        overlayColor="rgba(0, 0, 0, 0)"
        floatingIcon={<MaterialIcons name="search" color="#fff" size={24} />}
      />
    </>
  );
}
