import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function Movable({ id, imagesCount, children }) {
  const {
    positions,
    scrollX,
    leftOffset,
    clamp,
    objectMove,
    INIT_MARGIN_LEFT,
    TOTAL_WIDTH,
    CORRECTION_WIDTH,
    scrollOutsideY,
  } = useScroll();
  const [moving, setMoving] = useState(false);

  const initLeft = INIT_MARGIN_LEFT + TOTAL_WIDTH * positions.current.value[id];
  const left = useSharedValue(initLeft);
  // update location other song, not moving
  useAnimatedReaction(
    () => positions.current.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          left.value = withSpring(currentPosition * TOTAL_WIDTH + INIT_MARGIN_LEFT);
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
        event.absoluteX -
        leftOffset +
        scrollX.value +
        scrollOutsideY.value +
        INIT_MARGIN_LEFT +
        CORRECTION_WIDTH;
      // set top value moving song
      left.value = withTiming(positionY - TOTAL_WIDTH, {
        duration: 16,
      });
      // get new position
      const newPostion = clamp(
        Math.floor((left.value + positionY - CORRECTION_WIDTH) / 2 / TOTAL_WIDTH),
        0,
        imagesCount - 1,
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
      left.value = INIT_MARGIN_LEFT + TOTAL_WIDTH * positions.current.value[id];
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyled = useAnimatedStyle(() => {
    return {
      left: left.value,
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
            <Image style={styles.iconStyle} source={require('public/icons/drag-drop.png')} />
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
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
    position: 'absolute',
    right: 12 * SCALE_WIDTH,
    top: 10 * SCALE_HEIGHT,
  },
});
