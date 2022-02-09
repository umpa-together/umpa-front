/* eslint-disable no-nested-ternary */
import { View } from 'react-native';
import React, { useEffect } from 'react';
import Text from 'components/Text';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import style from 'constants/styles';
import { useProgress } from 'providers/progress';
import { useTrackPlayer } from 'providers/trackPlayer';

export default function PlayAnimation({
  songId,
  container,
  outContainer,
  innerContainer,
  textContainer,
  textStyle,
  textHidden,
}) {
  const { isPlayingId } = useTrackPlayer();
  const { duration, position } = useProgress();
  const time = useSharedValue(position >= 0 ? position : 0);

  const nowWidth = useDerivedValue(() => `${interpolate(time.value, [-30, 0, 30], [0, 0, 100])}%`);

  const innerStyle = useAnimatedStyle(() => ({
    width: nowWidth.value,
  }));
  const setAnimationValue = () => {
    if (songId) {
      if (songId === isPlayingId)
        time.value = withTiming(position, {
          duration: 500,
        });
    } else {
      time.value = withTiming(position, {
        duration: 500,
      });
    }
  };
  const timeText =
    Math.floor(time.value) <= 0
      ? '00'
      : Math.floor(time.value) < 10
      ? `0${Math.floor(time.value)}`
      : Math.floor(time.value);

  useEffect(() => {
    setAnimationValue();
  }, [position, duration]); 
 
  return (
    <View style={container}>
      <View style={outContainer}>
        <Animated.View style={[innerContainer, innerStyle]} />
      </View>
      {!textHidden && (
        <View style={[style.flexRow, style.space_between, textContainer]}>
          <Text style={textStyle}>00:{timeText}</Text>
          <Text style={textStyle}>00:30</Text>
        </View>
      )}
    </View>
  );
}
