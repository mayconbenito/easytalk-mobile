import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { Types as ChatTypes, Creators as ChatActions } from '../ducks/chat';

const { successSendMessage } = ChatActions;

function* sendMessage() {
  try {
    const reciverId = '';
    yield call(api.post, `/messages/${reciverId}`);

    yield put(successSendMessage());
  } catch (err) {
    console.log(err);
  }
}

export default function* chatSaga() {
  yield all([takeLatest(ChatTypes.SEND_MESSAGE, sendMessage)]);
}
