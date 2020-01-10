import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchMessages: ['chatId', 'page'],
    successFetchMessages: ['chatId', 'data', 'total'],
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
  if (state.chats.find(chats => chats.id === action.chatId)) {
    return {
      ...state,
      loading: false,
      page: state.page + 1,
      total: action.total,
      chats: state.chats.map(chats =>
        chats === action.chatId
          ? { messages: [...chats.messages, ...action.data] }
          : chats
      ),
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

const clearState = () => {
  return initialState;
};

export default createReducer(initialState, {
  [Types.FETCH_MESSAGES]: fetchMessages,
  [Types.SUCCESS_FETCH_MESSAGES]: successFetchMessages,
  [Types.CLEAR_STATE]: clearState,
});
