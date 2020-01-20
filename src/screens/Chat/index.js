import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '~/components/Loading';
import Message from '~/components/Message';
import api from '~/services/api';
import { Creators as MessageActions } from '~/store/ducks/message';

import { Container, Header, HeaderDetails, Image, Name, Input } from './styles';

function Chat({ navigation }) {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  const [msgInput, setMsgInput] = useState('');
  const [chatId, setChatId] = useState(false);

  const navigationState = navigation.state.params;

  const message = useSelector(state => state.message);

  useEffect(() => {
    async function checkChatId() {
      if (!navigationState.chat) {
        try {
          const createChat = await api.post('/chats', {
            participants: [navigationState.user._id],
          });

          setChatId(createChat.data.chat._id);
        } catch (err) {
          console.log(err.response.data);
        }
      } else {
        setChatId(navigationState.chat._id);
      }
    }

    checkChatId();
  }, []);

  const [messagesList = []] = useSelector(
    state => state.message.chats,
    chats => chats.find(chat => chat._id === chatId)
  );

  useEffect(() => {
    if (chatId) dispatch(MessageActions.fetchMessages(chatId, 1));

    return () => {
      dispatch(MessageActions.clearState());
    };
  }, [chatId]);

  function handleSendMessage() {
    dispatch(MessageActions.sendMessage(chatId, msgInput));
    setMsgInput('');
  }

  function endReached() {
    if (!message.loading && message.total > messagesList.messages.length) {
      dispatch(MessageActions.fetchMessages(chatId, message.page));
    }
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" color="#fff" size={24} />
        </TouchableOpacity>
        <HeaderDetails>
          <Image />
          <Name>{navigationState.user.name}</Name>
        </HeaderDetails>
      </Header>

      {message.loading && message.page === 1 ? (
        <Loading loading={message.loading} />
      ) : (
        <FlatList
          style={{ padding: 10 }}
          inverted
          data={messagesList.messages}
          onEndReached={endReached}
          onEndReachedThreshold={0.4}
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

      <Input
        value={msgInput}
        onChangeText={txt => setMsgInput(txt)}
        placeholder="Enviar Mensagem"
        onSubmitEditing={handleSendMessage}
        returnKeyType="send"
      />
    </Container>
  );
}

Chat.navigationOptions = () => ({
  header: null,
});

export default Chat;
