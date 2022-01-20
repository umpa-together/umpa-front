/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback, memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TrackPlayerProvider from 'providers/trackPlayer';
import LoadingIndicator from 'components/LoadingIndicator';
import { Context as SearchContext } from 'context/Search';
import ResultSection from 'components/Search/ResultSection';
import TabView from 'components/TabView';
import SearchTabBar from 'components/TabView/SearchTabBar';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';
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

  const All = (props) => {
    const { jumpTo } = props;
    return state.result ? (
      <ScrollView contentContainerStyle={styles.container}>
        {resultLists.map((option) => {
          const { title, data, key } = option;
          return (
            <View key={title}>
              {data.length > 0 && (
                <>
                  <ResultSection title={title} data={data} jumpTo={jumpTo} routeKey={key} />
                </>
              )}
            </View>
          );
        })}
      </ScrollView>
    ) : (
      <LoadingIndicator />
    );
  };
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

  return (
    <>
      <TrackPlayerProvider>
        <TabView
          routesMap={[
            { key: 'all', title: '전체' },
            { key: 'song', title: '곡' },
            { key: 'playlist', title: '플레이리스트' },
            { key: 'daily', title: '데일리' },
            { key: 'account', title: '계정' },
            { key: 'hashtag', title: '해시태그' },
          ]}
          sceneMap={{
            all: memo(All),
            song: Song,
            playlist: memo(Playlist),
            daily: memo(Daily),
            account: memo(Account),
            hashtag: memo(Hashtag),
          }}
          renderTabBar={(props) => <SearchTabBar props={props} />}
        />
      </TrackPlayerProvider>
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
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
