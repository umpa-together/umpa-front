import React, { useState, useEffect } from 'react';
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

export default function CreateSongList({ positions }) {
  const { setIsSearchModal } = useModal();
  const { songs } = usePlaylistCreate();
  const onClickAdd = () => {
    setIsSearchModal(true);
  };

  const [position, setPosition] = useState(listToObject(songs));
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
  useEffect(() => {
    positions.current.value = listToObject(songs);
    setPosition(listToObject(songs));
  }, [songs]);

  return (
    <>
      <Button title="song add" onPress={onClickAdd} />
      {songs.length === Object.keys(position).length && (
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
                <MovableSongView
                  key={item.id}
                  id={item.id}
                  song={item}
                  positions={positions}
                  scrollY={scrollY}
                  topOffset={topOffset}
                  songsCount={songs.length}
                />
              );
            })}
          </Animated.ScrollView>
        </View>
      )}
    </>
  );
}
