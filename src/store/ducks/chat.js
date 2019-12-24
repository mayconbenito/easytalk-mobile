import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    sendMessage: ['message', 'reciverId'],
    successSendMessage: ['chatId'],
  },
  {
    prefix: 'chat/',
  }
);

const initialState = {
  chats: [
    {
      id: 'adasda',
      lastSentMessage: '',
      reciver: { id: 2, image: '' },
      sender: { id: 1, image: '' },
      messages: [
        {
          data: '',
          sender: { id: 1, image: '' },
          reciver: { id: 2, image: '' },
          sendedAt: '',
        },
      ],
    },
  ],
};

const sendMessage = (state = initialState) => {
  return {
    ...state,
  };
};

const successSendMessage = (state = initialState) => {
  return state;
};

export default createReducer(initialState, {
  [Types.SEND_MESSAGE]: sendMessage,
  [Types.SUCCESS_SEND_MESSAGE]: successSendMessage,
});
