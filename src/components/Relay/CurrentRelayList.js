import React from 'react';
import Swiper from 'react-native-swiper';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import CurrentSection from './CurrentSection';

export default function CurrentRelayList({ currentRelay }) {
  return (
    <Swiper
      autoplay
      height={595 * SCALE_HEIGHT}
      autoplayTimeout={2}
      activeDotColor="#aeaeae"
      loop={false}
    >
      {currentRelay.map((relay) => (
        <CurrentSection relay={relay} key={relay._id} />
      ))}
    </Swiper>
  );
}
