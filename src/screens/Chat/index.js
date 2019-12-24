import React from 'react';
import { TouchableOpacity, FlatList, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import { Creators as ChatActions } from '~/store/ducks/chat';

import { Container, Header, HeaderDetails, Image, Name, Input } from './styles';

function Message({ mine }) {
  return (
    <View
      style={{
        alignSelf: mine ? 'flex-end' : 'flex-start',
        backgroundColor: '#ccc',
        borderRadius: 3,
        marginBottom: 5,
        padding: 5,
      }}
    >
      <Text>Message</Text>
    </View>
  );
}

function Chat({ navigation }) {
  const dispatch = useDispatch();
  // const scroll = useRef();

  const data = [
    { mine: true },
    { mine: false },
    { mine: true },
    { mine: true },
    { mine: true },
    { mine: false },
    { mine: false },
    { mine: false },
    { mine: false },
    { mine: false },
    { mine: true },
    { mine: true },
    { mine: true },
    { mine: false },
    { mine: false },
    { mine: false },
    { mine: true },
    { mine: true },
    { mine: true },
    { mine: false },
    { mine: false },
    { mine: false },
  ];

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" color="#fff" size={24} />
        </TouchableOpacity>
        <HeaderDetails>
          <Image />
          <Name>User Name</Name>
        </HeaderDetails>
      </Header>
      <FlatList
        // ref={scroll}
        // onContentSizeChange={() =>
        //   scroll.current.scrollToEnd({ animated: true })
        // }
        contentContainerStyle={{ padding: 10 }}
        data={data}
        inverted
        keyExtractor={() => `${Math.random()}`}
        renderItem={({ item }) => <Message mine={item.mine} />}
      />
      <Input
        placeholder="Enviar Mensagem"
        onSubmitEditing={() => dispatch(ChatActions.sendMessage('Hello World'))}
      />
    </Container>
  );
}

Chat.navigationOptions = () => ({
  header: null,
});

export default Chat;
