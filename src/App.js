import React, { useEffect } from 'react';
import { YellowBox, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as UpdateAPK from 'rn-update-apk';

import Routes from './routes';
import NavigationService from './services/navigation';
import { store, persistor } from './store';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function() {
  const updaterURL = 'http://android-app-update.easytalk.ml';

  useEffect(() => {
    const updater = new UpdateAPK.UpdateAPK({
      apkVersionUrl: updaterURL,
      fileProviderAuthority: 'com.mayconbenito.easytalk.provider',
      needUpdateApp: needUpdate => {
        Alert.alert('Nova Atualização disponivel', '', [
          { text: 'Cancelar', onPress: () => {} },
          {
            text: 'Atualizar',
            onPress: () => needUpdate(true),
          },
        ]);
      },
      forceUpdateApp: async () => {
        Alert.alert('Download de atualização obrigátoria iniciado');
      },
      onError: err => {
        console.log(err);
        Alert.alert('Erro ao instalar a atualização');
      },
    });

    updater.checkUpdate();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </PersistGate>
    </Provider>
  );
}
