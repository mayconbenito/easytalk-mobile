import { all, takeLatest, put } from 'redux-saga/effects';

import navigation from '~/services/navigation';

import { Creators as ChatActions } from '../ducks/chat';
import { Creators as ContactActions } from '../ducks/contact';
import { Creators as MessageActions } from '../ducks/message';
import { Types as SessionTypes } from '../ducks/session';

export function* deleteSession() {
  yield all([
    put(ChatActions.clearState()),
    put(ContactActions.clearState()),
    put(MessageActions.clearState()),
  ]);

  navigation.navigate('AuthStack');
}

export default function* sessionSaga() {
  yield all([takeLatest(SessionTypes.DELETE_SESSION, deleteSession)]);
}
