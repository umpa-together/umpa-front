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
import { useTrackPlayer } from 'providers/trackPlayer';

export default function PlayAnimation({
  container,
  outContainer,
  innerContainer,
  textContainer,
  textStyle,
  textHidden,
}) {
  const { position } = useTrackPlayer();
  const time = useSharedValue(position);

  const nowWidth = useDerivedValue(() => `${interpolate(time.value, [0, 30], [0, 100])}%`);

  const innerStyle = useAnimatedStyle(() => ({
    width: nowWidth.value,
  }));
  useEffect(() => {
    time.value = withTiming(position, {
      duration: 1000,
    });
  }, [position]);
  return (
    <View style={container}>
      <View style={outContainer}>
        <Animated.View style={[innerContainer, innerStyle]} />
      </View>
      {!textHidden && (
        <View style={[style.flexRow, style.space_between, textContainer]}>
          <Text style={textStyle}>
            00:{Math.floor(position) < 10 ? `0${Math.floor(position)}` : Math.floor(position)}
          </Text>
          <Text style={textStyle}>00:30</Text>
        </View>
      )}
    </View>
  );
}
