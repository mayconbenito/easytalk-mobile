import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChatItem from '~/components/ChatItem';
import FloatingActionButton from '~/components/FloatingActionButton';
import Loading from '~/components/Loading';
import { Creators as ChatActions } from '~/store/ducks/chat';

import { Container, List, WarningMessage } from './styles';

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
          <List
            data={chats.data}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ChatItem
                data={item}
                onPress={() =>
                  navigation.navigate('Chat', { chat: item, user: item.user })
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
      <FloatingActionButton onPress={() => navigation.navigate('Search')} />
    </>
  );
}
