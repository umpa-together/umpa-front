import React, { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import style from 'constants/styles';
import TabTitle from 'components/TabTitle';
import { Context as MainContentsContext } from 'context/MainContents';
import RecentPlaylist from 'components/MainContents/RecentPlaylist';
import RecommendAcocunt from 'components/MainContents/RecommendAccount';
import SearchBarView from 'components/MainContents/SearchBarView';

export default function Search() {
  const { getRecentPlaylists, getMainRecommendDJ } = useContext(MainContentsContext);

  useEffect(() => {
    getRecentPlaylists();
    getMainRecommendDJ();
  }, []);

  return (
    <ScrollView style={style.background}>
      <TabTitle title="검색" />
      <SearchBarView />
      <RecentPlaylist />
      <RecommendAcocunt />
    </ScrollView>
  );
}
