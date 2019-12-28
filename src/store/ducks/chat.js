import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchChats: [],
    successFetchChats: ['data'],
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

export default createReducer(initialState, {
  [Types.FETCH_CHATS]: fetchChats,
  [Types.SUCCESS_FETCH_CHATS]: successFetchChats,
});
