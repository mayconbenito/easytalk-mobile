import { put, call, all, takeLatest, select } from 'redux-saga/effects';

import api from '~/services/api';

import {
  Types as ContactTypes,
  Creators as ContactAction,
} from '../ducks/contact';

const { successContacts, successRefresh } = ContactAction;

function* fetchContacts() {
  try {
    const state = yield select();

    const response = yield call(api.get, `/me/contacts/`, {
      params: { page: state.contact.page },
    });

    yield put(
      successContacts(response.data.contacts, response.data.metadata.totalItems)
    );
  } catch (err) {
    console.log(err);
  }
}

function* refreshContacts({ page = 1 }) {
  try {
    const response = yield call(api.get, `/me/contacts/`, {
      params: { page },
    });

    yield put(
      successRefresh(response.data.contacts, response.data.metadata.totalItems)
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
