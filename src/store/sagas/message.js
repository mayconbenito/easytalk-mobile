import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { Creators as ChatActions } from '../ducks/chat';
import {
  Types as MessageTypes,
  Creators as MessageActions,
} from '../ducks/message';

function* sendMessage({ chatId, message }) {
  try {
    const response = yield call(api.post, `/chats/${chatId}/messages`, {
      _id: message._id,
      message: message.data,
    });

    yield all([
      put(
        MessageActions.successSendMessage(
          response.data.chat,
          response.data.message
        )
      ),
      put(ChatActions.addChatItemToList(response.data.chat)),
      put(
        ChatActions.updateChatLastSentMessage(response.data.chat, message.data)
      ),
    ]);
  } catch (err) {
    yield put(MessageActions.removeMessageFromChat(chatId, message._id));
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
