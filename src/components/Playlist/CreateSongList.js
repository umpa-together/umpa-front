import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  scrollTo,
} from 'react-native-reanimated';
import { useModal } from 'providers/modal';

import { usePlaylistCreate } from 'providers/playlistCreate';
import MovableSongView from './MovableSongView';

const SONG_HEIGHT = 60;
const listToObject = (list) => {
  const object = {};

  Object.values(list).forEach((song, index) => {
    object[song.id] = index;
  });

  return object;
};

export default function CreateSongList() {
  const { setIsSearchModal } = useModal();
  const { songs } = usePlaylistCreate();
  const onClickAdd = () => {
    setIsSearchModal(true);
  };
  const positions = useSharedValue(listToObject(songs));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();
  const [topOffset, setTopOffset] = useState(0);
  // update scroll view location by using shared value
  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false),
  );
  // set scrolly value accrroding scroll offset
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // change array accroding to position
  // const arrayCheck = () => {
  //  const result = new Object([]);
  //  for (const i in positions.value) {
  //    result[positions.value[i]] = songs[songs.findIndex((item) => item.id == i)];
  //  }
  // };

  return (
    <>
      <Button title="song add" onPress={onClickAdd} />
      {songs && (
        <View>
          <Animated.ScrollView
            ref={scrollViewRef}
            onLayout={() => {
              scrollViewRef.current.measure((x, y, width, height, pagex, pagey) => {
                setTopOffset(pagey);
              });
            }}
            onScroll={handleScroll}
            style={{ height: 400 }}
            contentContainerStyle={{
              height: SONG_HEIGHT * songs.length,
            }}
          >
            {songs.map((item) => {
              return (
                <>
                  {/* 
                <MovableSongView
                key={item.id}
                id={item.id}
                song={item}
                positions={positions}
                scrollY={scrollY}
                topOffset={topOffset}
                songsCount={songs.length}
              />
              */}
                </>
              );
            })}
          </Animated.ScrollView>
        </View>
      )}
    </>
  );
}
