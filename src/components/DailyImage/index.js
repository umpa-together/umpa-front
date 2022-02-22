import React from 'react';
import { StyleSheet } from 'react-native';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import { MAIN_COLOR } from 'constants/colors';

export default function Dailyimage({ image, upload }) {
  const dotStyle = {
    width: 4 * SCALE_WIDTH,
    height: 4 * SCALE_WIDTH,
  };
  const activeDotStyle = {
    width: 6 * SCALE_WIDTH,
    height: 6 * SCALE_WIDTH,
  };
  return (
    <Swiper
      height={image.length === 1 ? 375 * SCALE_WIDTH : 410 * SCALE_WIDTH}
      loop={false}
      activeDotColor={MAIN_COLOR}
      dotColor="#999"
      dotStyle={dotStyle}
      activeDotStyle={activeDotStyle}
      paginationStyle={{ bottom: 0 }}
    >
      {image.map((img) => {
        return (
          <FastImage
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
