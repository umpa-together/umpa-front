import React, { useEffect, useContext, useCallback } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Context as NoticeContext } from 'context/NoticeContext';
import { Context as SearchContext } from 'context/SearchContext';
import { Context as WeeklyContext } from 'context/WeeklyContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { Context as FeedContext } from 'context/FeedContext';
import { Context as ChatContext } from 'context/ChatContext';

import SearchBox from 'components/Main/SearchBox';
import CurrentHashtag from 'components/Main/CurrentHashtag';
import RecentPlaylists from 'components/Main/RecentPlaylists';
import WeeklyPlaylists from 'components/Main/WeeklyPlaylists';
import MusicArchive from 'components/Main/MusicArchive';
import SimilarTasteUsers from 'components/Main/SimilarTasteUsers';
import Header from 'components/Main/Header';
import WeeklyDailies from 'components/Main/WeeklyDailies';
import { useRefresh } from 'providers/refresh';
import { useFocusEffect } from '@react-navigation/native';

const MainSearchScreen = () => {
  const { getMyScrab, getMyBookmark, getMyStory, getOtherStory, getMyInfo } =
    useContext(UserContext);
  const { getnotice, setnoticetoken } = useContext(NoticeContext);
  const { state, currentHashtag } = useContext(SearchContext);
  const {
    state: WeeklyState,
    postWeekly,
    getRecentPlaylists,
    getMusicArchive,
    getWeekly,
  } = useContext(WeeklyContext);
  const { state: djState, getMainRecommendDJ } = useContext(DJContext);
  const { getFeeds } = useContext(FeedContext);
  const { getMessagesNum } = useContext(ChatContext);
  const { refreshing, onRefresh, setRefresh } = useRefresh();

  const dataFetchinMain = async () => {
    getMessagesNum();
    getWeekly();
    getMusicArchive();
    getMainRecommendDJ();
    currentHashtag();
    getRecentPlaylists();
  };

  const loadingDataFetch = async () => {
    // await postWeekly()
    await Promise.all([
      getMyInfo(),
      getMessagesNum(),
      getWeekly(),
      getMusicArchive(),
      getMainRecommendDJ(),
      getFeeds(),
      currentHashtag(),
      getRecentPlaylists(),
      getMyStory(),
      getOtherStory(),
      getMyBookmark(),
      getMyScrab(),
      setnoticetoken(),
      getnotice(),
    ]);
  };

  useEffect(() => {
    loadingDataFetch();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setRefresh(dataFetchinMain);
    }, []),
  );

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={styles.container}
      stickyHeaderIndices={[0]}
    >
      <Header />
      {/*<MusicArchive archive={WeeklyState.musicArchive} />*/}
      <SearchBox />
      <CurrentHashtag hashtag={state.currentHashtag} />
      <RecentPlaylists playlists={WeeklyState.recentPlaylists} />
      <WeeklyPlaylists playlists={WeeklyState.mainPlaylist} />
      <SimilarTasteUsers users={djState.mainRecommendDJ} />
      <WeeklyDailies dailies={WeeklyState.mainDaily} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});
export default MainSearchScreen;
