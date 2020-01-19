import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    createSession: ['data'],
    deleteSession: [],
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

const deleteSession = () => ({});

export default createReducer(initialState, {
  [Types.CREATE_SESSION]: createSession,
  [Types.DELETE_SESSION]: deleteSession,
});
