import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Swiper from 'react-native-swiper';

export default function Dailyimage({ image, upload }) {
  return (
    <Swiper height={375 * SCALE_WIDTH} loop={false}>
      {image.map((img) => {
        return (
          <Image
            source={{ uri: upload ? img.uri : img }}
            style={styles.img}
            key={upload ? img.uri : img}
          />
        );
      })}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  img: {
    marginTop: 8 * SCALE_HEIGHT,
    width: 375 * SCALE_WIDTH,
    height: 375 * SCALE_WIDTH,
  },
});
