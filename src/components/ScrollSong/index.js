import React, { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { View } from 'react-native';
import { useScroll } from 'providers/scroll';

export default function ScrollSong({ songs, songReady, children }) {
  const { positions, scrollViewRef, updatePosition, handleScroll, onLayoutScroll, TOTAL_HEIGHT } =
    useScroll();
  const [render, setRender] = useState(false);
  const [initRender, setInitRender] = useState(false);
  useEffect(() => {
    updatePosition(songs);
    setRender(!render);
  }, [songs]);

  useEffect(() => {
    setTimeout(() => {
      setInitRender(true);
    }, 1000);
  }, []);

  return (
    <>
      {songReady && songs.length <= Object.keys(positions.current.value).length && (
        <View>
          <Animated.ScrollView
            ref={scrollViewRef}
            onLayout={() => {
              onLayoutScroll({ initRender, song: true });
            }}
            onScroll={handleScroll}
            contentContainerStyle={{
              height: TOTAL_HEIGHT * songs.length,
            }}
          >
            {children}
          </Animated.ScrollView>
        </View>
      )}
    </>
  );
}
