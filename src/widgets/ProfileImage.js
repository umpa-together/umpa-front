import React from 'react';
import { Image } from 'react-native';

export default function ProfileImage({ img, imgStyle }) {
  return (
    <>
      {img !== undefined ? (
        <Image style={imgStyle} source={{ uri: img }} />
      ) : (
        <Image source={require('public/icons/profile-init.png')} style={imgStyle} />
      )}
    </>
  );
}
