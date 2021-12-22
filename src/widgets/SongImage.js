import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

const SongImage = ({ size, border, url, opac = 1.0 }) => {
  url = url.replace('{w}', '300');
  url = url.replace('{h}', '300');
  return (
    <Image
      style={{
        height: size * SCALE_HEIGHT,
        width: size * SCALE_WIDTH,
        borderRadius: border * SCALE_HEIGHT,
        opacity: opac,
      }}
      source={{ url }}
    />
  );
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
      source={{ url }}
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
      source={{ url }}
      imageStyle={{ borderRadius: border * SCALE_HEIGHT }}
    />
  );
};

export { SongImage, SongImageBack, SongImageBackStory };
