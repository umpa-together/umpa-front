/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { View } from 'react-native';
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
import SongViewPlaylist from './SongViewPlaylist';

const SONG_HEIGHT = 60;
const SCROLL_HEIGHT_THRESHOLD = 10;

// give position in range song length
function clamp(value, lowerBound, upperBound) {
  'worklet';

  return Math.max(lowerBound, Math.min(value, upperBound));
}

// switch location
function objectMove(object, from, to) {
  'worklet';

  const newObject = { ...object };

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }
    if (object[id] === to) {
      newObject[id] = from;
    }
  }
  return newObject;
}

export default function MovableSongView({ id, song, positions, scrollY, topOffset, songsCount }) {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT);
  const DEVICE_HEIGHT = 400;
  // update location other song, not moving
  useAnimatedReaction(
    () => positions.value[id],
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
      if (newPostion !== positions.value[id]) {
        positions.value = objectMove(positions.value, positions.value[id], newPostion);
      }
    },
    onEnd: () => {
      top.value = positions.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);
  return (
    <Animated.View style={animatedStyle}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '80%' }}>
          <SongViewPlaylist key={id} song={song} />
        </View>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={{ width: '20%', backgroundColor: '#444' }} />
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
}
