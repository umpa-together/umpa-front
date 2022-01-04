/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import SongView from 'components/SongView';
import { usePlaylistCreate } from 'providers/playlistCreate';

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

export default function MovableSongView({
  id,
  song,
  positions,
  scrollY,
  topOffset,
  songsCount,
  setSongs,
}) {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.current.value[id] * SONG_HEIGHT);
  const { onClickDeleteSong } = usePlaylistCreate();
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
          setSongs,
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
        <View style={{ width: '70%' }}>
          <SongView key={id} song={song} />
        </View>
        <TouchableOpacity onPress={() => onClickDeleteSong(song)}>
          <Text>지우기</Text>
        </TouchableOpacity>
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
  },
});
