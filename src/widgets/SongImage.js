import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { SCALE_HEIGHT } from 'lib/utils/normalize';

const SongImage = ({ url, imgStyle }) => {
  url = url.replace('{w}', '300');
  url = url.replace('{h}', '300');
  return <Image style={imgStyle} source={{ uri: url }} />;
};

const SongImageBack = ({ url, imgStyle, border }) => {
  url = url.replace('{w}', '300');
  url = url.replace('{h}', '300');
  return (
    <ImageBackground
      style={imgStyle}
      resizeMode="stretch"
      source={{ uri: url }}
      imageStyle={{ borderRadius: border * SCALE_HEIGHT }}
    />
  );
};

const SongImageBackStory = ({ url, imgStyle, border }) => {
  url = url.replace('{w}', '300');
  url = url.replace('{h}', '300');
  return (
    <ImageBackground
      style={imgStyle}
      resizeMode="stretch"
      source={{ uri: url }}
      imageStyle={{ borderRadius: border * SCALE_HEIGHT }}
      blurRadius={10}
    />
  );
};

export { SongImage, SongImageBack, SongImageBackStory };
