import { put, call, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';
import navigation from '~/services/navigation';

import {
  Types as RegisterTypes,
  Creators as RegisterActions,
} from '../ducks/register';
import { Creators as SessionActions } from '../ducks/session';

export function* requestRegister({ data }) {
  try {
    const response = yield call(api.post, '/register', {
      username: data.username,
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
      yield put(
        RegisterActions.failureRegister(
          'Nome de usuário, e-mail ou senha invalido'
        )
      );
    }

    if (
      err.response.status === 400 &&
      err.response.data.code === 'EMAIL_ALREADY_USED'
    ) {
      yield put(
        RegisterActions.failureRegister('E-mail já em uso por outro usuário')
      );
    }

    if (err.response.status === 500) {
      yield put(RegisterActions.failureRegister('Erro interno no servidor'));
    }
  }
}

export default function* registerSaga() {
  yield all([takeLatest(RegisterTypes.REQUEST_REGISTER, requestRegister)]);
}
