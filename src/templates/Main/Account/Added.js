import React, { useContext, useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import Header from 'components/Header';
import style from 'constants/styles';
import { TabView, SceneMap } from 'react-native-tab-view';
import { AddedSong, AddedPlaylist } from 'components/Account/AddedSection';

const renderScene = SceneMap({
  song: AddedSong,
  playlist: AddedPlaylist,
});

export default function Added({ type }) {
  const { state, getAddedSong, getAddedPlaylist } = useContext(AddedContext);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(type === 'Song' ? 0 : 1);
  const [routes] = useState([
    { key: 'song', title: '곡' },
    { key: 'playlist', title: '플레이리스트' },
  ]);

  useEffect(() => {
    if (index === 0 && !state.songLists) {
      getAddedSong();
    } else if (index === 1 && !state.playlists) {
      getAddedPlaylist();
    }
  }, [index]);

  return (
    <View style={[style.background, styles.container]}>
      <Header title="담은 목록" back />
      <View style={styles.container}>
        {(state.songLists || state.playlists) && (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    height: 800,
  },
});
