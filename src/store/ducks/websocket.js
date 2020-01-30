import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    wsConnect: [],
  },
  {
    prefix: 'websocket/',
  }
);

const initialState = {};

const wsConnect = (state = initialState) => state;

export default createReducer(initialState, {
  [Types.WS_CONNECT]: wsConnect,
});
