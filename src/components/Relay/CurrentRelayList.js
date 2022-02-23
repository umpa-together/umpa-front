import React, { memo } from 'react';
import Swiper from 'react-native-swiper';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import CurrentSection from './CurrentSection';

export default memo(function CurrentRelayList({ currentRelay }) {
  return (
    <Swiper
      autoplay
      height={595 * SCALE_HEIGHT}
      autoplayTimeout={4}
      activeDotColor="#aeaeae"
      removeClippedSubviews={false}
    >
      {currentRelay.map((relay) => (
        <CurrentSection relay={relay} key={relay._id} />
      ))}
    </Swiper>
  );
});
