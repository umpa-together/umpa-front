/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import Header from 'components/Header';
import style from 'constants/styles';
import { Playlist, Daily } from 'components/Search/SelectedSection';
import TabView from 'components/TabView';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import HashtagView from 'components/Search/HashtagView';
import SelectedTabBar from 'components/TabView/SelectedTabBar';

export default function SelectedHashtag({ id, info }) {
  const { state, getAllContentsWithHashatg } = useContext(SearchContext);

  useEffect(() => {
    getAllContentsWithHashatg({ id });
  }, []);

  const PlaylistSection = () => {
    return (
      <ScrollView>
        <Playlist />
      </ScrollView>
    );
  };

  const DailySection = () => {
    return (
      <ScrollView>
        <Daily actions />
      </ScrollView>
    );
  };

  return (
    <View style={[style.background, styles.container]}>
      <Header
        headerStyle={styles.headerStyle}
        titleStyle={styles.headerText}
        title="해시태그"
        back
      />
      <HashtagView info={info} containerStyle={styles.hashtagContainer} />
      {state.selected && (
        <TabView
          routesMap={[
            { key: 'playlist', title: '플레이리스트' },
            { key: 'daily', title: '데일리' },
          ]}
          sceneMap={{
            playlist: memo(PlaylistSection),
            daily: memo(DailySection),
          }}
          renderTabBar={(props) => <SelectedTabBar props={props} />}
        />
      )}
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
