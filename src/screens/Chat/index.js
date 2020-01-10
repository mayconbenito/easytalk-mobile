import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '~/components/Loading';
import Message from '~/components/Message';
import { Creators as MessageActions } from '~/store/ducks/message';

import { Container, Header, HeaderDetails, Image, Name, Input } from './styles';

function Chat({ navigation }) {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);
  const message = useSelector(state => state.message);

  const [messages, setMessages] = useState([]);

  const scroll = useRef();
  const navigationState = navigation.state.params.data;

  useEffect(() => {
    dispatch(MessageActions.fetchMessages(navigationState._id, 1));

    return () => {
      dispatch(MessageActions.clearState());
    };
  }, []);

  useEffect(() => {
    if (message.chats && message.chats.length > 0) {
      const chat = message.chats.find(
        chats => chats._id === navigationState._id
      );
      setMessages(chat.messages);
    }
  }, [message.chats]);

  function endReached() {
    if (!message.loading && message.total > messages.length)
      dispatch(MessageActions.fetchMessages(navigationState._id, message.page));
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" color="#fff" size={24} />
        </TouchableOpacity>
        <HeaderDetails>
          <Image />
          <Name>{navigationState.sender.name}</Name>
        </HeaderDetails>
      </Header>

      {message.loading && message.page === 1 ? (
        <Loading loading={message.loading} />
      ) : (
        <FlatList
          style={{ padding: 10 }}
          ref={scroll}
          inverted
          data={messages}
          onEndReached={endReached}
          keyExtractor={item => item._id}
          ListFooterComponent={
            <Loading
              style={{ marginTop: 13 }}
              size={24}
              loading={message.loading}
            />
          }
          renderItem={({ item }) => (
            <Message message={item.data} mine={item.senderId === session._id} />
          )}
        />
      )}
      <Input placeholder="Enviar Mensagem" />
    </Container>
  );
}

Chat.navigationOptions = () => ({
  header: null,
});

export default Chat;
