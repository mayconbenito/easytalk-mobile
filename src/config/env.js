const dev = {
  API_URL: 'https://easytalk-api.herokuapp.com',
  WS_URL: 'ws://easytalk-api.herokuapp.com',
  UPDATER_URL: 'http://android-app-update.easytalk.ml',
};

const prod = {
  API_URL: 'https://easytalk-api.herokuapp.com',
  WS_URL: 'ws://easytalk-api.herokuapp.com',
  UPDATER_URL: 'http://android-app-update.easytalk.ml',
};

export default __DEV__ ? dev : prod;
