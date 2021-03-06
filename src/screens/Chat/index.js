import { useNetInfo } from '@react-native-community/netinfo';
import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '~/components/Loading';
import Message from '~/components/Message';
import NetworkWarning from '~/components/NetworkWarning';
import { colors } from '~/config/styles';
import isStringEmpty from '~/helpers/isStringEmpty';
import objectId from '~/helpers/objectId';
import api from '~/services/api';
import { Creators as MessageActions } from '~/store/ducks/message';

import {
  Container,
  Header,
  HeaderDetails,
  Image,
  Name,
  InputContainer,
  Input,
} from './styles';

function Chat({ navigation }) {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  const netInfo = useNetInfo();

  const [msgInput, setMsgInput] = useState('');
  const [chatId, setChatId] = useState(false);

  const messagesListRef = useRef();

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

  useEffect(() => {
    if (chatId && netInfo.isConnected) {
      dispatch(MessageActions.clearState());
      dispatch(MessageActions.fetchMessages(chatId, 1));
    }
  }, [netInfo.isConnected]);

  function handleSendMessage() {
    if (netInfo.isConnected) {
      if (!isStringEmpty(msgInput)) {
        const messageObj = {
          // Generate fake object id to indentify message on the client side
          _id: objectId(),
          data: msgInput,
          senderId: session._id,
          reciverId: navigationState.user._id,
          // Fake date to show on the client side
          createdAt: new Date().toISOString(),
        };

        setMsgInput('');
        dispatch(MessageActions.sendMessage(chatId, messageObj));
        if (messagesListRef && messagesListRef.current) {
          messagesListRef.current.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }
      }
    }
  }

  function endReached() {
    if (!message.loading && message.total > messagesList.messages.length) {
      if (netInfo.isConnected)
        dispatch(MessageActions.fetchMessages(chatId, message.page));
    }
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" color={colors.WHITE} size={30} />
        </TouchableOpacity>
        <HeaderDetails>
          <Image
            source={
              navigationState.user.picture
                ? navigationState.user.picture.url
                : navigationState.user.picture
            }
          />
          <Name>{navigationState.user.name}</Name>
        </HeaderDetails>
      </Header>

      {!netInfo.isConnected && <NetworkWarning />}

      {message.loading && message.page === 1 ? (
        <Loading loading={message.loading} />
      ) : (
        <FlatList
          style={{
            marginTop: !netInfo.isConnected ? 25 : 0,
          }}
          ref={messagesListRef}
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
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
          renderItem={({ item }) => {
            if (item._id === messagesList.messages[0]._id) {
              return (
                <Message
                  data={item}
                  last
                  mine={item.senderId === session._id}
                />
              );
            }

            return (
              <Message
                data={item}
                last={false}
                mine={item.senderId === session._id}
              />
            );
          }}
        />
      )}

      <InputContainer>
        <Input
          value={msgInput}
          onChangeText={txt => setMsgInput(txt)}
          placeholder="Enviar Mensagem"
          onSubmitEditing={handleSendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <MaterialIcons name="send" size={24} color={colors.SECONDARY} />
        </TouchableOpacity>
      </InputContainer>
    </Container>
  );
}

Chat.navigationOptions = () => ({
  header: null,
});

export default Chat;
