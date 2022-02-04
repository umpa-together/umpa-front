import React from 'react';
import { SongImage } from 'widgets/SongImage';
import FastImage from 'react-native-fast-image';

export default function DailyImage({ image, artwork, imgStyle }) {
  return image.length > 0 ? (
    <FastImage source={{ uri: image[0] }} style={imgStyle} />
  ) : (
    <SongImage url={artwork.url} imgStyle={imgStyle} />
  );
}
