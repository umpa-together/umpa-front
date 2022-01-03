import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import style from 'constants/styles';
import Songbackground from 'components/Search/SongBackground';
import { TabView, SceneMap } from 'react-native-tab-view';
import TrackPlayerProvider from 'providers/trackPlayer';
import { Playlist, Daily, DJ } from 'components/Search/SelectedSection';

const renderScene = SceneMap({
  playlist: Playlist,
  daily: Daily,
  dj: DJ,
});

export default function SelectedSong({ song }) {
  const { state, getSelectedContents } = useContext(SearchContext);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'playlist', title: '플레이리스트' },
    { key: 'daily', title: '데일리' },
    { key: 'dj', title: '대표곡' },
  ]);

  useEffect(() => {
    getSelectedContents({ id: song.id });
  }, []);

  return (
    <View style={[style.background, styles.container]}>
      <ScrollView stickyHeaderIndices={[1]}>
        <TrackPlayerProvider>
          <Songbackground song={song} />
        </TrackPlayerProvider>
        <View style={styles.container}>
          {state.selected && (
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
            />
          )}
        </View>
      </ScrollView>
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
