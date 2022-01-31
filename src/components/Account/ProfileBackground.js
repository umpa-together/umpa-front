import React from 'react';
import FastImage from 'react-native-fast-image';

export default function ProfileBackground({ img, imgStyle }) {
  return (
    <>
      {img !== undefined ? (
        <FastImage style={imgStyle} source={{ uri: img }} />
      ) : (
        <FastImage source={require('public/icons/profile-background-init.png')} style={imgStyle} />
      )}
    </>
  );
}
