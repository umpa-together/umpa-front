import React, { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { View } from 'react-native';
import { useScroll } from 'providers/scroll';

export default function ScrollSong({ songs, children }) {
  const { positions, scrollViewRef, updatePosition, handleScroll, onLayoutScroll, SONG_HEIGHT } =
    useScroll();

  useEffect(() => {
    updatePosition(songs);
  }, [songs]);

  return (
    <>
      {songs.length <= Object.keys(positions.current.value).length && (
        <View>
          <Animated.ScrollView
            ref={scrollViewRef}
            onLayout={onLayoutScroll}
            onScroll={handleScroll}
            contentContainerStyle={{
              height: SONG_HEIGHT * songs.length,
            }}
          >
            {children}
          </Animated.ScrollView>
        </View>
      )}
    </>
  );
}
