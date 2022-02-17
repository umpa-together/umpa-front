/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback, memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import LoadingIndicator from 'components/LoadingIndicator';
import { Context as SearchContext } from 'context/Search';
import ResultSection from 'components/Search/ResultSection';
import TabView from 'components/TabView';
import SearchTabBar from 'components/TabView/SearchTabBar';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';
import EmptyData from 'components/EmptyData';
import { useSearch } from 'providers/search';
import MoreLists from './MoreLists';

export default function ResultLists() {
  const { state } = useContext(SearchContext);
  const { addedModal } = useModal();
  const resultLists = [
    {
      title: '곡',
      data: state.result && state.result.song,
      key: 'song',
    },
    {
      title: '플레이리스트',
      data: state.result && state.result.playlist,
      key: 'playlist',
    },
    {
      title: '데일리',
      data: state.result && state.result.daily,
      key: 'daily',
    },
    {
      title: '계정',
      data: state.result && state.result.dj,
      key: 'account',
    },
    {
      title: '해시태그',
      data: state.result && state.result.hashtag,
      key: 'hashtag',
    },
  ];

  const All = useCallback(
    (props) => {
      const { jumpTo } = props;
      const { daily, dj, hashtag, playlist, song } = state.result != null && state.result;
      const checkData =
        state.result != null &&
        (daily.length || dj.length || hashtag.length || playlist.length || song.length);
      const textList = ['검색결과가 없습니다', '다른 검색어를 입력해보세요'];
      const { searching } = useSearch();

      return state.result ? (
        !checkData ? (
          <EmptyData textList={textList} icon />
        ) : !searching ? (
          <ScrollView contentContainerStyle={styles.container}>
            {resultLists.map((option) => {
              const { title, data, key } = option;
              return (
                <View key={title}>
                  {data.length > 0 && (
                    <ResultSection title={title} data={data} jumpTo={jumpTo} routeKey={key} />
                  )}
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <LoadingIndicator />
        )
      ) : (
        <LoadingIndicator />
      );
    },
    [state.result && state.result.playlist],
  );
  const Song = useCallback(() => {
    return <MoreLists title={resultLists[0].title} data={resultLists[0].data} />;
  }, [state.result && state.result.playlist]);
  const Playlist = () => {
    return (
      <ScrollView style={styles.playlistContainer}>
        <MoreLists title={resultLists[1].title} data={resultLists[1].data} />
      </ScrollView>
    );
  };
  const Daily = () => {
    return (
      <ScrollView style={styles.dailyContainer}>
        <MoreLists title={resultLists[2].title} data={resultLists[2].data} />
      </ScrollView>
    );
  };
  const Account = () => {
    return (
      <ScrollView style={styles.accountContainer}>
        <MoreLists title={resultLists[3].title} data={resultLists[3].data} />
      </ScrollView>
    );
  };
  const Hashtag = () => {
    return (
      <ScrollView style={styles.hashtagContainer}>
        <MoreLists title={resultLists[4].title} data={resultLists[4].data} />
      </ScrollView>
    );
  };

  const routesMap = [
    { key: 'all', title: '전체' },
    { key: 'song', title: '곡' },
    { key: 'playlist', title: '플레이리스트' },
    { key: 'daily', title: '데일리' },
    { key: 'account', title: '계정' },
    { key: 'hashtag', title: '해시태그' },
  ];

  const sceneMap = {
    all: All,
    song: Song,
    playlist: memo(Playlist),
    daily: memo(Daily),
    account: memo(Account),
    hashtag: memo(Hashtag),
  };

  return (
    <>
      <TabView
        routesMap={routesMap}
        sceneMap={sceneMap}
        renderTabBar={(props) => <SearchTabBar props={props} />}
      />
      {addedModal && <AddedModal />}
    </>
  );
}

const styles = StyleSheet.create({
  playlistContainer: {
    paddingTop: 20 * SCALE_HEIGHT,
  },
  accountContainer: {
    paddingTop: 16 * SCALE_HEIGHT,
  },
  hashtagContainer: {
    paddingTop: 18 * SCALE_HEIGHT,
  },
  container: {
    marginTop: 13 * SCALE_HEIGHT,
    paddingBottom: 15 * SCALE_HEIGHT,
  },
  dailyContainer: {
    paddingTop: 20 * SCALE_HEIGHT,
  },
});
