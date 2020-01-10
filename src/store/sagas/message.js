import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import {
  Types as MessageTypes,
  Creators as MessageActions,
} from '../ducks/message';

function* fetchMessages({ chatId, page }) {
  try {
    const response = yield call(api.get, `/chats/${chatId}/messages`, {
      params: { page, limit: 40 },
    });

    yield put(
      MessageActions.successFetchMessages(
        chatId,
        response.data.messages,
        response.data.meta.total
      )
    );
  } catch (err) {
    console.log(err);
  }
}

export default function* messageSaga() {
  yield all([takeLatest(MessageTypes.FETCH_MESSAGES, fetchMessages)]);
}
