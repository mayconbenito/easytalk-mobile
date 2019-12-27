import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    fetchContacts: ['page'],
    refreshContacts: ['page'],
    successContacts: ['data', 'total'],
    successRefresh: ['data', 'total'],
    clearState: [],
  },
  {
    prefix: 'contact/',
  }
);

const initialState = {
  loading: false,
  page: 1,
  total: 0,
  data: [],
};

const fetchContacts = (state = initialState) => {
  return {
    loading: true,
    ...state,
  };
};

const refreshContacts = (state = initialState) => {
  return {
    data: [],
    loading: true,
    total: 0,
    page: 1,
    ...state,
  };
};

const successContacts = (state = initialState, action) => {
  return {
    ...state,
    loading: false,
    page: state.page + 1,
    total: action.total,
    data: [...state.data, ...action.data],
  };
};

const successRefresh = (state = initialState, action) => {
  return {
    ...state,
    loading: false,
    page: state.page + 1,
    total: action.total,
    data: action.data,
  };
};

const clearState = () => {
  return initialState;
};

export default createReducer(initialState, {
  [Types.FETCH_CONTACTS]: fetchContacts,
  [Types.REFRESH_CONTACTS]: refreshContacts,
  [Types.SUCCESS_CONTACTS]: successContacts,
  [Types.SUCCESS_REFRESH]: successRefresh,
  [Types.CLEAR_STATE]: clearState,
});
