import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

const SongImage = ({ url, imgStyle }) => {
  url = url.replace('{w}', '300');
  url = url.replace('{h}', '300');
  return <Image style={imgStyle} source={{ uri: url }} />;
};

const SongImageBack = ({ url, opac, width, height, border, imgStyle }) => {
  url = url.replace('{w}', '300');
  url = url.replace('{h}', '300');
  return (
    <ImageBackground
      style={[
        { opacity: opac, height: height * SCALE_HEIGHT, width: width * SCALE_WIDTH },
        imgStyle,
      ]}
      resizeMode="stretch"
      source={{ uri: url }}
      imageStyle={{ borderRadius: border * SCALE_HEIGHT }}
    />
  );
};

const SongImageBackStory = ({ url, opac, width, height, border, imgStyle }) => {
  url = url.replace('{w}', '300');
  url = url.replace('{h}', '300');
  return (
    <ImageBackground
      style={[
        { opacity: opac, height: height * SCALE_HEIGHT, width: width * SCALE_WIDTH },
        imgStyle,
      ]}
      resizeMode="contain"
      source={{ uri: url }}
      imageStyle={{ borderRadius: border * SCALE_HEIGHT }}
    />
  );
};

export { SongImage, SongImageBack, SongImageBackStory };
