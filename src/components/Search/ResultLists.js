import React, { useContext } from 'react';
import { View } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import TrackPlayerProvider from 'providers/trackPlayer';
import LoadingIndicator from 'components/LoadingIndicator';
import { Context as SearchContext } from 'context/Search';
import ResultSection from 'components/Search/ResultSection';

export default function ResultLists() {
  const { state } = useContext(AppleMusicContext);
  const { state: searchState } = useContext(SearchContext);
  const resultLists = [
    {
      title: '곡',
      data: state.songData,
    },
    {
      title: '플레이리스트',
      data: searchState.result && searchState.result.playlist,
    },
    {
      title: '데일리',
      data: searchState.result && searchState.result.daily,
    },
    {
      title: '계정',
      data: searchState.result && searchState.result.dj,
    },
    {
      title: '해시태그',
      data: searchState.result && searchState.result.hashtag,
    },
  ];

  return (
    <TrackPlayerProvider>
      {state.songData && searchState.result ? (
        <>
          {resultLists.map((option) => {
            const { title, data } = option;
            return (
              <View key={title}>
                {data.length > 0 && (
                  <>
                    <ResultSection title={title} data={data} />
                  </>
                )}
              </View>
            );
          })}
        </>
      ) : (
        <LoadingIndicator />
      )}
    </TrackPlayerProvider>
  );
}
