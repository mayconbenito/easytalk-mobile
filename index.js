import 'expo-asset';

import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { name as appName } from './app.json';
import App from './src/App';
import { store, persistor } from './src/store';

function Main() {
  useEffect(() => {
    async function fetchUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (!__DEV__) {
      fetchUpdate();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
