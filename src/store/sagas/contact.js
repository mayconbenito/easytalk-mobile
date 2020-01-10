import { put, call, all, takeLatest, select } from 'redux-saga/effects';

import api from '~/services/api';

import {
  Types as ContactTypes,
  Creators as ContactActions,
} from '../ducks/contact';

function* fetchContacts() {
  try {
    const contact = yield select(state => state.contact);

    const response = yield call(api.get, `/me/contacts/`, {
      params: { page: contact.page },
    });

    yield put(
      ContactActions.successContacts(
        response.data.contacts,
        response.data.meta.total
      )
    );
  } catch (err) {
    console.log(err);
  }
}

function* refreshContacts({ page = 1 }) {
  try {
    const session = yield select(state => state.session);

    if (session.jwt)
      api.defaults.headers.Authorization = `Bearer ${session.jwt}`;

    const response = yield call(api.get, `/me/contacts/`, {
      params: { page },
    });

    yield put(
      ContactActions.successRefresh(
        response.data.contacts,
        response.data.meta.total
      )
    );
  } catch (err) {
    console.log(err);
  }
}

export default function* contactSaga() {
  yield all([
    takeLatest(ContactTypes.FETCH_CONTACTS, fetchContacts),
    takeLatest(ContactTypes.REFRESH_CONTACTS, refreshContacts),
  ]);
}
