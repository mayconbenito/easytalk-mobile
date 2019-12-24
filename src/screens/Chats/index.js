import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ChatItem from '~/components/ChatItem';

import { Container } from './styles';

export default function Chats({ navigation }) {
  return (
    <>
      <Container>
        <ChatItem onPress={() => navigation.navigate('Chat')} />
        <ChatItem onPress={() => navigation.navigate('Chat')} />
        <ChatItem onPress={() => navigation.navigate('Chat')} />
        <ChatItem onPress={() => navigation.navigate('Chat')} />
        <ChatItem onPress={() => navigation.navigate('Chat')} />
        <ChatItem onPress={() => navigation.navigate('Chat')} />
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
