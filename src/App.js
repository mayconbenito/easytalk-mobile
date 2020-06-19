import React, { useEffect } from 'react';
import { YellowBox, Alert, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as UpdateAPK from 'rn-update-apk';

import { Creators as WSActions } from '~/store/ducks/websocket';

import { colors } from './config/styles';
import Routes from './routes';
import NavigationService from './services/navigation';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function() {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  const updaterURL = 'http://android-app-update.easytalk.ml';

  useEffect(() => {
    if (session) {
      dispatch(WSActions.wsConnect());
    }

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
    <>
      <StatusBar backgroundColor={colors.PRIMARY} barStyle="light-content" />
      <Routes
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </>
  );
}
