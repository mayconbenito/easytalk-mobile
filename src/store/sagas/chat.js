import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { Types as ChatTypes, Creators as ChatActions } from '../ducks/chat';

function* fetchChats() {
  try {
    const response = yield call(api.get, '/me/chats');

    yield put(ChatActions.successFetchChats(response.data.chats));
  } catch (err) {
    console.log(err);
  }
}

export default function* chatSaga() {
  yield all([takeLatest(ChatTypes.FETCH_CHATS, fetchChats)]);
}
