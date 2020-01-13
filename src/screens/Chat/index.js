import React, { useEffect, useState } from 'react';
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

  const [msgInput, setMsgInput] = useState('');

  const navigationState = navigation.state.params.data;

  const message = useSelector(state => state.message);

  const [messagesList = []] = useSelector(
    state => state.message.chats,
    chats => chats.find(chat => chat._id === navigationState._id)
  );

  useEffect(() => {
    dispatch(MessageActions.fetchMessages(navigationState._id, 1));

    return () => {
      dispatch(MessageActions.clearState());
    };
  }, []);

  function handleSendMessage() {
    dispatch(MessageActions.sendMessage(navigationState.sender._id, msgInput));
    setMsgInput('');
  }

  function endReached() {
    if (!message.loading && message.total > messagesList.messages.length) {
      dispatch(MessageActions.fetchMessages(navigationState._id, message.page));
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
          <Name>{navigationState.sender.name}</Name>
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
