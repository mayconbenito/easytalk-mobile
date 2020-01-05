import axios from 'axios';

import { store } from '~/store';

const api = axios.create({
  baseURL: 'http://192.168.15.30:3000',
});

api.interceptors.request.use(function(config) {
  const { jwt } = store.getState().session;

  config.headers.Authorization = `Bearer ${jwt}`;

  return config;
});

export default api;
