import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.30:3000',
});

api.interceptors.request.use(async config => {
  const jwt = await AsyncStorage.getItem('@EasyTalk:Token');

  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  return config;
});

export default api;
