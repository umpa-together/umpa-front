import React from 'react';
import { Image } from 'react-native';

export default function ProfileBackground({ img, imgStyle }) {
  return (
    <>
      {img !== undefined ? (
        <Image style={imgStyle} source={{ uri: img }} />
      ) : (
        <Image source={require('public/icons/profile-background-init.png')} style={imgStyle} />
      )}
    </>
  );
}
