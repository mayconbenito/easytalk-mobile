import { all, fork } from 'redux-saga/effects';

import chat from './chat';
import contact from './contact';
import login from './login';

export default function* rootSaga() {
  yield all([fork(login), fork(chat), fork(contact)]);
}
