import React from 'react';
import { Image } from 'react-native';

export default function UserImage({ source, style }) {
  return source ? (
    <Image source={{ uri: source }} style={style} />
  ) : (
    <Image
      source={require('~/assets/user-picture-fallback.jpg')}
      style={style}
    />
  );
}
