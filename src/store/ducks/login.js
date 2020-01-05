import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    requestLogin: ['data'],
    failureLogin: ['error'],
  },
  {
    prefix: 'login/',
  }
);

const initialState = {
  loading: false,
  error: '',
};

const requestLogin = (state = initialState) => ({
  ...state,
  loading: true,
  error: '',
});

const failureLogin = (state = initialState, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

export default createReducer(initialState, {
  [Types.REQUEST_LOGIN]: requestLogin,
  [Types.FAILURE_LOGIN]: failureLogin,
});
