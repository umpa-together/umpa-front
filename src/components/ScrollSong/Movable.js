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
import style from 'constants/styles';
import FastImage from 'react-native-fast-image';

export default function Movable({ id, songsCount, children }) {
  const {
    positions,
    scrollY,
    topOffset,
    clamp,
    objectMove,
    INIT_MARGIN_TOP,
    TOTAL_HEIGHT,
    CORRECTION,
    scrollOutsideY,
  } = useScroll();
  const [moving, setMoving] = useState(false);

  const initTop = INIT_MARGIN_TOP + TOTAL_HEIGHT * positions.current.value[id];
  const top = useSharedValue(initTop);
  // update location other song, not moving
  useAnimatedReaction(
    () => positions.current.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * TOTAL_HEIGHT + INIT_MARGIN_TOP);
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
      const positionY =
        event.absoluteY -
        topOffset +
        scrollY.value +
        scrollOutsideY.value +
        INIT_MARGIN_TOP +
        CORRECTION;
      // set top value moving song
      top.value = withTiming(positionY - TOTAL_HEIGHT, {
        duration: 16,
      });
      // get new position
      const newPostion = clamp(
        Math.floor((top.value + positionY - CORRECTION) / 2 / TOTAL_HEIGHT),
        0,
        songsCount - 1,
      );
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
      top.value = INIT_MARGIN_TOP + TOTAL_HEIGHT * positions.current.value[id];
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
      <View style={styles.rowContainer}>
        {children}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View>
            <FastImage style={style.icons} source={require('public/icons/drag-drop.png')} />
          </Animated.View>
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
    justifyContent: 'center',
    shadowRadius: 2,
    width: '100%',
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
