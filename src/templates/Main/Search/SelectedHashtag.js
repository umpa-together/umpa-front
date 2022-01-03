import React, { useContext, useEffect, useState } from 'react';
import { View, useWindowDimensions, ScrollView, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import Header from 'components/Header';
import style from 'constants/styles';
import { Playlist, Daily } from 'components/Search/SelectedSection';
import { TabView, SceneMap } from 'react-native-tab-view';

const renderScene = SceneMap({
  playlist: Playlist,
  daily: Daily,
});

export default function SelectedHashtag({ id, hashtag }) {
  const { state, getAllContentsWithHashatg } = useContext(SearchContext);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'playlist', title: '플레이리스트' },
    { key: 'daily', title: '데일리' },
  ]);

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
