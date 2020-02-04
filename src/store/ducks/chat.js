import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchChats: [],
    successFetchChats: ['data'],
    updateChatLastSentMessage: ['chat', 'message'],
    addChatItemToList: ['chat'],
    clearState: [],
  },
  {
    prefix: 'chat/',
  }
);

const initialState = {
  data: [],
  loading: true,
};

const fetchChats = (state = initialState) => {
  return { ...state, loading: true };
};

const successFetchChats = (state = initialState, action) => {
  return { ...state, data: action.data, loading: false };
};

const updateChatLastSentMessage = (state = initialState, action) => {
  return {
    ...state,
    data: state.data.map(chat => {
      if (chat._id === action.chat._id) {
        return {
          ...chat,
          lastSentMessage: action.message,
        };
      }

      return chat;
    }),
  };
};

const addChatItemToList = (state = initialState, action) => {
  return {
    ...state,
    data: !state.data.find(chat => chat._id === action.chat._id)
      ? [...state.data, action.chat]
      : state.data,
  };
};

const clearState = () => initialState;

export default createReducer(initialState, {
  [Types.FETCH_CHATS]: fetchChats,
  [Types.SUCCESS_FETCH_CHATS]: successFetchChats,
  [Types.UPDATE_CHAT_LAST_SENT_MESSAGE]: updateChatLastSentMessage,
  [Types.ADD_CHAT_ITEM_TO_LIST]: addChatItemToList,
  [Types.CLEAR_STATE]: clearState,
});
