import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { colors } from '~/config/styles';

export default function Loading({ style, loading, size = 40 }) {
  if (loading) {
    return (
      <View style={{ ...style, flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator
          size={size}
          color={colors.DARK_CYAN}
          animating={loading}
        />
      </View>
    );
  }

  return <View />;
}
