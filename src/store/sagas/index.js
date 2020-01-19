import { all, fork } from 'redux-saga/effects';

import chat from './chat';
import contact from './contact';
import login from './login';
import message from './message';
import register from './register';
import session from './session';

export default function* rootSaga() {
  yield all([
    fork(session),
    fork(login),
    fork(register),
    fork(chat),
    fork(contact),
    fork(message),
  ]);
}
