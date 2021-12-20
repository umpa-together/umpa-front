import React from 'react';
import { View, Image } from 'react-native';

export default function ProfileImage({ img, imgStyle }) {
  return (
    <>
      {img !== undefined ? (
        <Image style={imgStyle} source={{ uri: img }} />
      ) : (
        <View style={imgStyle} />
      )}
    </>
  );
}
