import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    createSession: ['data'],
  },
  {
    prefix: 'session/',
  }
);

const initialState = {};

const createSession = (state = initialState, action) => ({
  ...state,
  ...action.data,
});

export default createReducer(initialState, {
  [Types.CREATE_SESSION]: createSession,
});
