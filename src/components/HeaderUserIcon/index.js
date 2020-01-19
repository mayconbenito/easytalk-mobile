import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function HeaderUserIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
      <MaterialIcons name="account-circle" size={32} color="#fff" />
    </TouchableOpacity>
  );
}
