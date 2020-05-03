import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

export default function UserImage({ source, style }) {
  const [image, setImage] = useState();

  useEffect(() => {
    setImage({ uri: source });
  }, [source]);

  function loadFallback() {
    setImage(require('~/assets/user-picture-fallback.jpg'));
  }

  return source ? (
    <Image source={image} style={style} onError={loadFallback} />
  ) : (
    <Image
      source={require('~/assets/user-picture-fallback.jpg')}
      style={style}
    />
  );
}
