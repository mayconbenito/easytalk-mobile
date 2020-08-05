import { eventChannel } from 'redux-saga';
import {
  takeLatest,
  call,
  race,
  all,
  put,
  take,
  select,
} from 'redux-saga/effects';
import io from 'socket.io-client';

import env from '~/config/env';
import { Types as WSTypes } from '~/store/ducks/websocket';

import { Creators as ChatActions } from '../ducks/chat';
import { Creators as MessageActions } from '../ducks/message';
import { Types as SessionTypes } from '../ducks/session';

function getWsChannel(websocket) {
  return eventChannel(emitter => {
    websocket.on('message', data => {
      emitter({ eventName: 'message', data });
    });

    return () => {
      websocket.close();
    };
  });
}

export function* watchEvents(channel) {
  while (true) {
    const event = yield take(channel);

    if (event.eventName === 'message') {
      yield all([
        put(
          MessageActions.addMessageToChat(event.data.chat, event.data.message)
        ),
        put(ChatActions.addChatItemToList(event.data.chat)),
        put(
          ChatActions.updateChatLastSentMessage(
            event.data.chat,
            event.data.message.data
          )
        ),
      ]);
    }
  }
}

export function* handelWsConnection() {
  try {
    const session = yield select(state => state.session);
    const websocket = io(env.WS_URL, {
      query: {
        token: session.wsToken,
      },
      transports: ['websocket'],
    });

    const channel = yield call(getWsChannel, websocket);

    const { cancel } = yield race({
      task: call(watchEvents, channel),
      cancel: take(SessionTypes.DELETE_SESSION),
    });

    if (cancel) {
      channel.close();
    }
  } catch (err) {
    console.log(err);
  }
}

export default function*() {
  yield takeLatest(WSTypes.WS_CONNECT, handelWsConnection);
}
