import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import ChatItem from '~/components/ChatItem';
import Loading from '~/components/Loading';
import { Creators as ChatActions } from '~/store/ducks/chat';

import { Container, WarningMessage } from './styles';

export default function Chats({ navigation }) {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chat);

  useEffect(() => {
    dispatch(ChatActions.fetchChats());
  }, []);

  function refresh() {
    dispatch(ChatActions.fetchChats());
  }

  return (
    <>
      <Container>
        {chats.loading && <Loading loading={chats.loading} />}

        {!chats.loading && chats.data.length > 0 && (
          <FlatList
            data={chats.data}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ChatItem
                data={item}
                onPress={() =>
                  navigation.navigate('Chat', { chat: item, user: item.sender })
                }
              />
            )}
            refreshing={chats.loading}
            onRefresh={refresh}
          />
        )}

        {!chats.loading && !chats.data.length > 0 && (
          <WarningMessage>Você não possui nenhuma conversa.</WarningMessage>
        )}
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
