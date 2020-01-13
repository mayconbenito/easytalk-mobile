import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { Creators as ChatActions } from '../ducks/chat';
import {
  Types as MessageTypes,
  Creators as MessageActions,
} from '../ducks/message';

function* sendMessage({ reciverId, message }) {
  try {
    const response = yield call(api.post, `/messages/${reciverId}`, {
      message,
    });

    yield all([
      put(
        MessageActions.successSendMessage(
          reciverId,
          response.data.chat,
          response.data.message
        )
      ),
      put(ChatActions.updateChatLastSentMessage(response.data.chat, message)),
    ]);
  } catch (err) {
    console.log(err);
  }
}

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
  yield all([
    takeLatest(MessageTypes.SEND_MESSAGE, sendMessage),
    takeLatest(MessageTypes.FETCH_MESSAGES, fetchMessages),
  ]);
}
