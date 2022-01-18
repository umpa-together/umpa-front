import React, { useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import Header from 'components/Header';
import style from 'constants/styles';
import { Playlist, Daily } from 'components/Search/SelectedSection';
import TabView from 'components/TabView';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import HashtagView from 'components/Search/HashtagView';
import HashtagTabBar from 'components/TabView/HashtagTabBar';

export default function SelectedHashtag({ id, info }) {
  const { state, getAllContentsWithHashatg } = useContext(SearchContext);

  useEffect(() => {
    getAllContentsWithHashatg({ id });
  }, []);

  return (
    <View style={[style.background, styles.container]}>
      <ScrollView stickyHeaderIndices={[0]}>
        <Header
          headerStyle={styles.headerStyle}
          titleStyle={styles.headerText}
          title="해시테그"
          back
        />
        <HashtagView info={info} containerStyle={styles.hashtagContainer} />
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
              renderTabBar={(props) => <HashtagTabBar props={props} />}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: FS(18),
  },
  hashtagContainer: {
    paddingLeft: 105 * SCALE_WIDTH,
    paddingVertical: 15.5 * SCALE_HEIGHT,
    marginBottom: 0,
    borderBottomWidth: 1 * SCALE_WIDTH,
    borderColor: 'rgba(220,220,220,0.5)',
  },
  headerStyle: {
    borderBottomWidth: 1 * SCALE_WIDTH,
    borderColor: 'rgba(220,220,220,0.5)',
  },
});
