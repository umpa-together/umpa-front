import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import style from 'constants/styles';
import Songbackground from 'components/Search/SongBackground';
import TrackPlayerProvider from 'providers/trackPlayer';
import { Playlist, Daily, DJ } from 'components/Search/SelectedSection';
import TabView from 'components/TabView';

export default function SelectedSong({ song }) {
  const { state, getSelectedContents } = useContext(SearchContext);

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
              routesMap={[
                { key: 'playlist', title: '플레이리스트' },
                { key: 'daily', title: '데일리' },
                { key: 'dj', title: '대표곡' },
              ]}
              sceneMap={{
                playlist: Playlist,
                daily: Daily,
                dj: DJ,
              }}
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
  },
});
