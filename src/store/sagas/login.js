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
        jwt: response.data.jwt,
        ...response.data.user,
      })
    );

    navigation.navigate('AppStack');
  } catch (err) {
    if (err.response.status === 400) {
      yield put(
        LoginActions.failureLogin(
          'Formato de nome de usuário, e-mail ou senha invalido'
        )
      );
    }

    if (err.response.status === 401) {
      yield put(LoginActions.failureLogin('Email ou senha incorretos'));
    }

    if (err.response.status === 500) {
      yield put(LoginActions.failureLogin('Erro interno no servidor'));
    }
  }
}

export default function* loginSaga() {
  yield all([takeLatest(LoginTypes.REQUEST_LOGIN, requestLogin)]);
}
