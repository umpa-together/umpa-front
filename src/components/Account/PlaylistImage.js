import React from 'react';
import { View, Image } from 'react-native';

export default function PlaylistImage({ url, imgStyle }) {
  return url ? <Image source={{ uri: url }} style={imgStyle} /> : <View style={imgStyle} />;
}
