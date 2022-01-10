import React, { useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import Header from 'components/Header';
import style from 'constants/styles';
import { Playlist, Daily } from 'components/Search/SelectedSection';
import TabView from 'components/TabView';

export default function SelectedHashtag({ id, hashtag }) {
  const { state, getAllContentsWithHashatg } = useContext(SearchContext);

  useEffect(() => {
    getAllContentsWithHashatg({ id });
  }, []);

  return (
    <View style={[style.background, styles.container]}>
      <ScrollView stickyHeaderIndices={[0]}>
        <Header title={`#${hashtag}`} back />
        <View style={styles.container}>
          {state.selected && (
            <TabView
              routesMap={[
                { key: 'playlist', title: '플레이리스트' },
                { key: 'daily', title: '데일리' },
              ]}
              sceneMap={{
                playlist: Playlist,
                daily: Daily,
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
