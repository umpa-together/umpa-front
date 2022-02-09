import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import { MAIN_COLOR } from 'constants/colors';
import Text from 'components/Text';
import { useTrackPlayer } from 'providers/trackPlayer';

const FloatingButton = ({ show }) => {
  const { currentSong } = useTrackPlayer();
  const opacity = useSharedValue(1);
  const animation = useSharedValue(0);
  const [isopen, setIsopen] = useState(false);
  const writeList = [{ key: 'playlist' }, { key: 'daily' }];
  const showNum = show ? 0 : 1;
  const toggleMenu = () => {
    const toValue = isopen ? 0 : 1;
    animation.value = withSpring(toValue, {
      duration: 16,
    });
    setIsopen(!isopen);
  };
  useEffect(() => {
    opacity.value = withTiming(showNum, {
      duration: 200,
    });
  }, [show]);
  const opacityStyle = useAnimatedStyle(() => ({
    transform: [{ scale: opacity.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[currentSong ? styles.playingContainer : styles.container, opacityStyle]}>
      {writeList.map((item, index) => {
        const translateY = useDerivedValue(() =>
          interpolate(animation.value, [0, 1], [0, -80 * (index + 1)]),
        );
        const pinStyle = useAnimatedStyle(() => ({
          transform: [
            { scale: animation.value },
            {
              translateY: translateY.value,
            },
          ],
        }));
        return (
          <TouchableWithoutFeedback key={item.key}>
            <Animated.View style={[styles.button, pinStyle]}>
              <Text style={styles.store} numberOfLines={2}>
                {`버튼${index}`}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View>
          <Icon source={require('public/icons/create-floating.png')} style={styles.floating} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playingContainer: {
    position: 'absolute',
    bottom: 120 * SCALE_HEIGHT,
    right: 70 * SCALE_WIDTH,
  },
  container: {
    position: 'absolute',
    bottom: 70 * SCALE_HEIGHT,
    right: 70 * SCALE_WIDTH,
  },
  button: {
    width: 59 * SCALE_WIDTH,
    height: 59 * SCALE_WIDTH,
    borderRadius: 59 * SCALE_WIDTH,
    backgroundColor: MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  store: {
    fontSize: FS(12),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clear: {
    fontSize: FS(12),
    color: '#fff',
    marginVertical: 2 * SCALE_HEIGHT,
    fontWeight: 'bold',
  },
  floating: {
    width: 59 * SCALE_WIDTH,
    height: 59 * SCALE_WIDTH,
    position: 'absolute',
  },
});
export default FloatingButton;
