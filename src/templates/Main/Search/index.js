import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import style from 'constants/styles';
import TabTitle from 'components/TabTitle';
import { Context as MainContentsContext } from 'context/MainContents';
import RecommendPlaylist from 'components/Search/RecommendPlaylist';
import RecommendAccount from 'components/Search/RecommendAccount';
import SearchBarView from 'components/Search/SearchBarView';
import RecentDailies from 'components/Search/RecentDailies';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function Search() {
  const { state, getMainRecommendPlaylist, getMainRecommendDJ, getRecentDailies } =
    useContext(MainContentsContext);

  const dataFetch = async () => {
    await Promise.all([getMainRecommendPlaylist(), getMainRecommendDJ(), getRecentDailies()]);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <View style={style.background}>
      <TabTitle title="검색" titleStyle={styles.title} />
      {state.mainPlaylist && state.mainDJ && state.recentDailies && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBarView />
          <RecommendPlaylist />
          <RecommendAccount />
          <RecentDailies />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(24),
    lineHeight: 35 * SCALE_HEIGHT,
    marginTop: 6 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
});
