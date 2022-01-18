/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import TrackPlayerProvider from 'providers/trackPlayer';
import LoadingIndicator from 'components/LoadingIndicator';
import { Context as SearchContext } from 'context/Search';
import ResultSection from 'components/Search/ResultSection';
import TabView from 'components/TabView';
import SearchTabBar from 'components/TabView/SearchTabBar';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import MoreLists from './MoreLists';

export default function ResultLists() {
  const { state } = useContext(AppleMusicContext);
  const { state: searchState } = useContext(SearchContext);
  const resultLists = [
    {
      title: '곡',
      data: state.songData,
      key: 'song',
    },
    {
      title: '플레이리스트',
      data: searchState.result && searchState.result.playlist,
      key: 'playlist',
    },
    {
      title: '데일리',
      data: searchState.result && searchState.result.daily,
      key: 'daily',
    },
    {
      title: '계정',
      data: searchState.result && searchState.result.dj,
      key: 'account',
    },
    {
      title: '해시태그',
      data: searchState.result && searchState.result.hashtag,
      key: 'hashtag',
    },
  ];

  const All = (props) => {
    const { jumpTo } = props;
    return state.songData && searchState.result ? (
      <ScrollView>
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
  const Song = () => {
    return <MoreLists title={resultLists[0].title} data={resultLists[0].data} />;
  };
  const Playlist = () => {
    return (
      <ScrollView style={styles.playlistContainer}>
        <MoreLists title={resultLists[1].title} data={resultLists[1].data} />
      </ScrollView>
    );
  };
  const Daily = () => {
    return (
      <ScrollView>
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
      <ScrollView>
        <MoreLists title={resultLists[4].title} data={resultLists[4].data} />
      </ScrollView>
    );
  };

  return (
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
          song: memo(Song),
          playlist: memo(Playlist),
          daily: memo(Daily),
          account: memo(Account),
          hashtag: memo(Hashtag),
        }}
        renderTabBar={(props) => <SearchTabBar props={props} />}
      />
    </TrackPlayerProvider>
  );
}

const styles = StyleSheet.create({
  playlistContainer: {
    paddingTop: 20 * SCALE_HEIGHT,
  },
  accountContainer: {
    paddingTop: 16 * SCALE_HEIGHT,
  },
});
