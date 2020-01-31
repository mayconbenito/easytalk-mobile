import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { colors } from '~/config/styles';

export default function FloatingActionButton({ onPress }) {
  return (
    <FloatingAction
      color={colors.PRIMARY}
      onPressMain={onPress}
      overlayColor="rgba(0, 0, 0, 0)"
      floatingIcon={
        <MaterialIcons name="search" color={colors.WHITE} size={24} />
      }
    />
  );
}
