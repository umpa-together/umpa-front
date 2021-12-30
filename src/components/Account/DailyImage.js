import React from 'react';
import { Image } from 'react-native';
import { SongImage } from 'widgets/SongImage';

export default function DailyImage({ image, artwork, imgStyle }) {
  return image.length > 0 ? (
    <Image source={{ uri: image[0] }} style={imgStyle} />
  ) : (
    <SongImage url={artwork.url} imgStyle={imgStyle} />
  );
}
