import React, { useEffect } from 'react';
import { YellowBox, Alert, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as UpdateAPK from 'rn-update-apk';

import env from '~/config/env';
import { Creators as WSActions } from '~/store/ducks/websocket';

import { colors } from './config/styles';
import Routes from './routes';
import NavigationService from './services/navigation';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function() {
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  useEffect(() => {
    if (session) {
      dispatch(WSActions.wsConnect());
    }
  }, [session]);

  useEffect(() => {
    const updater = new UpdateAPK.UpdateAPK({
      apkVersionUrl: env.UPDATER_URL,
      fileProviderAuthority: 'com.mayconbenito.easytalk.provider',
      needUpdateApp: needUpdate => {
        Alert.alert('Nova Atualização disponível', '', [
          { text: 'Cancelar', onPress: () => {} },
          {
            text: 'Atualizar',
            onPress: () => needUpdate(true),
          },
        ]);
      },
      forceUpdateApp: async () => {
        Alert.alert('Download de atualização obrigatória iniciado');
      },
      onError: err => {
        console.log(err);
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
