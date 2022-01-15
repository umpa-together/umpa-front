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
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useScroll } from 'providers/scroll';

export default function Movable({ id, songsCount, children }) {
  const { positions, scrollY, topOffset, clamp, objectMove, SONG_HEIGHT, scrollOutsideY } =
    useScroll();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.current.value[id] * SONG_HEIGHT);

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
      const positionY = event.absoluteY + scrollY.value - topOffset + scrollOutsideY.value;

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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {children}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={{ width: 40, height: 40, borderWidth: 1 }} />
        </PanGestureHandler>
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
