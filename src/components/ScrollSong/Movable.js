import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedStyle,
  withSpring,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useScroll } from 'providers/scroll';

export default function Movable({ id, songsCount, children }) {
  const { positions, scrollY, topOffset, clamp, objectMove, SONG_HEIGHT, SCROLL_HEIGHT_THRESHOLD } =
    useScroll();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.current.value[id] * SONG_HEIGHT);
  const DEVICE_HEIGHT = 400;

  // update location other song, not moving
  useAnimatedReaction(
    () => positions.current.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT);
        }
      }
    },
    [moving],
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      runOnJS(setMoving)(true);
    },
    onActive: (event) => {
      const positionY = event.absoluteY + scrollY.value - topOffset;
      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // scroll up if item get up limit
        scrollY.value = withTiming(scrollY.value - 10, { duration: 20 });
      } else if (
        positionY >= scrollY.value + DEVICE_HEIGHT - SCROLL_HEIGHT_THRESHOLD &&
        positionY <= songsCount * SONG_HEIGHT
      ) {
        // scroll down if item get down limit
        scrollY.value = withTiming(scrollY.value + 10, { duration: 20 });
      } else {
        cancelAnimation(scrollY);
      }
      // set top value moving song
      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });
      // get new position
      const newPostion = clamp(Math.floor(positionY / SONG_HEIGHT), 0, songsCount - 1);
      // update position if moving song move to other position
      if (newPostion !== positions.current.value[id]) {
        positions.current.value = objectMove(
          positions.current.value,
          positions.current.value[id],
          newPostion,
        );
      }
    },
    onEnd: () => {
      top.value = positions.current.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyled = useAnimatedStyle(() => {
    return {
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowOpacity: withSpring(moving ? 0.2 : 0),
    };
  }, [moving]);

  return (
    <Animated.View style={[styles.container, animatedStyled]}>
      <View style={{ flexDirection: 'row' }}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={{ width: '15%', backgroundColor: '#444' }} />
        </PanGestureHandler>
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 10,
    width: '100%',
  },
});
