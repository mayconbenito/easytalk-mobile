import { all, takeLatest } from 'redux-saga/effects';

import navigation from '~/services/navigation';

import { Types as SessionTypes } from '../ducks/session';

export function deleteSession() {
  navigation.navigate('AuthStack');
}

export default function* sessionSaga() {
  yield all([takeLatest(SessionTypes.DELETE_SESSION, deleteSession)]);
}
