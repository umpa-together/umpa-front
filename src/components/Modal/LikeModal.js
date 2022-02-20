import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Text from 'components/Text';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function LikeModal({ like }) {
  const opacity = useSharedValue(0);
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  useEffect(() => {
    if (like === true) {
      opacity.value = 1;
      setTimeout(() => {
        opacity.value = withTiming(0, {
          duration: 800,
        });
      }, 600);
    }
  }, [like]);
  return (
    <Animated.View style={[styles.container, opacityStyle]}>
      <Text style={styles.text}>곡이 추천되었습니다.</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 231 * SCALE_WIDTH,
    height: 31 * SCALE_HEIGHT,
    backgroundColor: '#FF397540',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 5 * SCALE_HEIGHT,
    top: 690 * SCALE_HEIGHT,
    left: 72 * SCALE_WIDTH,
    zIndex: 2000,
    elevation: 100,
  },
  text: {
    fontSize: FS(13),
    color: '#fff',
  },
});
