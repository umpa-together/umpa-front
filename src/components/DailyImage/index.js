import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Swiper from 'react-native-swiper';

export default function Dailyimage({ image }) {
  return (
    <Swiper height={375 * SCALE_WIDTH} loop={false}>
      {image.map((img) => {
        return <Image source={{ uri: img }} style={styles.img} key={img} />;
      })}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  img: {
    marginTop: 10 * SCALE_HEIGHT,
    width: 375 * SCALE_WIDTH,
    height: 375 * SCALE_WIDTH,
  },
});
