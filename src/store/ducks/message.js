import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchMessages: ['chatId', 'page'],
    successFetchMessages: ['chatId', 'data', 'total'],
    sendMessage: ['chatId', 'message'],
    successSendMessage: ['chat', 'message'],
    addMessageToChat: ['chat', 'message'],
    clearState: [],
  },
  {
    prefix: 'message/',
  }
);

const initialState = {
  chats: [],
  page: 1,
  total: 0,
  loading: false,
};

const fetchMessages = (state = initialState) => {
  return {
    ...state,
    loading: true,
  };
};

const successFetchMessages = (state = initialState, action) => {
  if (state.chats.find(chats => chats._id === action.chatId)) {
    return {
      ...state,
      loading: false,
      page: state.page + 1,
      total: action.total,
      chats: state.chats.map(chat => {
        if (chat._id === action.chatId) {
          return { ...chat, messages: [...chat.messages, ...action.data] };
        }

        return chat;
      }),
    };
  }

  return {
    ...state,
    loading: false,
    page: state.page + 1,
    total: action.total,
    chats: [...state.chats, { _id: action.chatId, messages: action.data }],
  };
};

const sendMessage = (state = initialState) => state;

const successSendMessage = (state = initialState, action) => {
  if (state.chats.find(chat => chat._id === action.chat._id)) {
    return {
      ...state,
      total: state.total + 1,
      chats: state.chats.map(chat => {
        if (chat._id === action.chat._id) {
          return { ...chat, messages: [action.message, ...chat.messages] };
        }

        return chat;
      }),
    };
  }
};

const addMessageToChat = (state = initialState, action) => {
  if (state.chats.find(chats => chats._id === action.chat._id)) {
    return {
      ...state,
      loading: false,
      page: state.page + 1,
      total: action.total,
      chats: state.chats.map(chat => {
        if (chat._id === action.chat._id) {
          return { ...chat, messages: [action.message, ...chat.messages] };
        }

        return chat;
      }),
    };
  }

  return {
    ...state,
    loading: false,
    page: state.page + 1,
    total: action.total,
    chats: [
      ...state.chats,
      { _id: action.chat._id, messages: [action.message] },
    ],
  };
};

const clearState = () => initialState;

export default createReducer(initialState, {
  [Types.FETCH_MESSAGES]: fetchMessages,
  [Types.SUCCESS_FETCH_MESSAGES]: successFetchMessages,
  [Types.SEND_MESSAGE]: sendMessage,
  [Types.SUCCESS_SEND_MESSAGE]: successSendMessage,
  [Types.ADD_MESSAGE_TO_CHAT]: addMessageToChat,
  [Types.CLEAR_STATE]: clearState,
});
