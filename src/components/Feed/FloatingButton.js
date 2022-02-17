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
import { SUB_COLOR } from 'constants/colors';
import Text from 'components/Text';
import { navigate } from 'lib/utils/navigation';
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
  const rotate = useDerivedValue(
    () => `${interpolate(animation.value, [-1, 0, 1, 2], [0, 0, 45, 45])}deg`,
  );

  const onPressCreate = (opt) => {
    if (animation.value === 1) {
      if (opt === 0) {
        navigate('DailyCreate');
        toggleMenu();
      } else {
        navigate('PlaylistCreate');
        toggleMenu();
      }
    }
  };
  const opacityStyle = useAnimatedStyle(() => ({
    transform: [{ scale: opacity.value }],
    opacity: opacity.value,
  }));

  const backgroundOpacity = useAnimatedStyle(() => ({
    transform: [{ scale: animation.value >= 0.9 ? 1 : 0 }],
    opacity: animation.value,
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    alignSelf: 'center',
    transform: [{ rotate: rotate.value }],
  }));
  const textList = ['데일리 생성', '플레이리스트 생성'];
  return (
    <Animated.View style={[currentSong ? styles.playingContainer : styles.container, opacityStyle]}>
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.backContainer, backgroundOpacity]} />
      </TouchableWithoutFeedback>
      {writeList.map((item, index) => {
        const translateY = useDerivedValue(() =>
          interpolate(animation.value, [0, 1], [0, -60 * (index + 1)]),
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
          <TouchableWithoutFeedback
            onPress={() => {
              onPressCreate(index);
            }}
            key={item.key}
          >
            <Animated.View style={[styles.button, pinStyle]}>
              <Icon
                style={styles.createIcon}
                source={
                  index === 0
                    ? require('public/icons/feed-daily-create.png')
                    : require('public/icons/feed-playlist-create.png')
                }
              />
              <Text style={styles.textStyle}>{textList[index]}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View>
          <Animated.Image
            source={require('public/icons/create-floating.png')}
            style={[styles.floating, rotateStyle]}
          />
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
    width: 49 * SCALE_WIDTH,
    height: 49 * SCALE_WIDTH,
    borderRadius: 49 * SCALE_WIDTH,
    backgroundColor: SUB_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 6 * SCALE_WIDTH,
  },
  createIcon: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
    borderRadius: 30 * SCALE_WIDTH,
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
    left: 0,
    width: 59 * SCALE_WIDTH,
    height: 59 * SCALE_WIDTH,
    position: 'absolute',
  },
  backContainer: {
    position: 'absolute',
    right: -70 * SCALE_WIDTH,
    bottom: -120 * SCALE_HEIGHT,
    width: 375 * SCALE_WIDTH,
    height: 812 * SCALE_HEIGHT,
    backgroundColor: '#00000050',
  },
  textStyle: {
    textAlign: 'right',
    width: 120 * SCALE_WIDTH,
    position: 'absolute',
    right: 61 * SCALE_WIDTH,
    fontSize: FS(14),
    fontWeight: 'bold',
    color: '#FFF',
  },
});
export default FloatingButton;
