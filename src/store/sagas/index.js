import { all, fork } from 'redux-saga/effects';

import chat from './chat';
import contact from './contact';
import login from './login';
import register from './register';

export default function* rootSaga() {
  yield all([fork(login), fork(register), fork(chat), fork(contact)]);
}
