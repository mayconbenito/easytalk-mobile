import { all, fork } from 'redux-saga/effects';

import chat from './chat';
import contact from './contact';

export default function* rootSaga() {
  yield all([fork(chat), fork(contact)]);
}
