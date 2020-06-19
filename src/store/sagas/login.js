import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';
import navigation from '~/services/navigation';

import { Types as LoginTypes, Creators as LoginActions } from '../ducks/login';
import { Creators as SessionActions } from '../ducks/session';

export function* requestLogin({ data }) {
  try {
    const response = yield call(api.post, '/sessions', {
      email: data.email,
      password: data.password,
    });

    yield put(
      SessionActions.createSession({
        wsToken: response.data.wsToken,
        jwt: response.data.jwt,
        ...response.data.user,
      })
    );

    navigation.navigate('AppStack');
  } catch (err) {
    if (err.response.status === 400) {
      yield put(LoginActions.failureLogin('E-mail ou senha invalidos'));
    }

    if (err.response.status === 401) {
      yield put(LoginActions.failureLogin('E-mail ou senha incorretos'));
    }

    if (err.response.status === 500) {
      yield put(LoginActions.failureLogin('Erro interno no servidor'));
    }
  }
}

export default function* loginSaga() {
  yield all([takeLatest(LoginTypes.REQUEST_LOGIN, requestLogin)]);
}
