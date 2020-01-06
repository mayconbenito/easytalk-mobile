import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    requestRegister: ['data'],
    failureRegister: ['error'],
  },
  {
    prefix: 'register/',
  }
);

const initialState = {
  loading: false,
  error: '',
};

const requestRegister = (state = initialState) => ({
  ...state,
  loading: true,
  error: '',
});

const failureRegister = (state = initialState, action) => ({
  ...state,
  loading: false,
  error: action.error,
});

export default createReducer(initialState, {
  [Types.REQUEST_REGISTER]: requestRegister,
  [Types.FAILURE_REGISTER]: failureRegister,
});
