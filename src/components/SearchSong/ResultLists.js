import React, { useContext } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import { useSearch } from 'providers/search';
import SongView from 'components/SongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import LoadingIndicator from 'components/LoadingIndicator';
import { useSongActions } from 'providers/songActions';

export default function ResultLists() {
  const { state } = useContext(AppleMusicContext);
  const { loading, onEndReached } = useSearch();
  const { getActionComponent } = useSongActions();
  return (
    <TrackPlayerProvider>
      {state.songData ? (
        <FlatList
          data={state.songData}
          keyExtractor={(_) => _.id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          ListFooterComponent={loading && <ActivityIndicator />}
          renderItem={({ item }) => {
            return <SongView song={item} actions={getActionComponent({ data: item })} />;
          }}
        />
      ) : (
        <LoadingIndicator />
      )}
    </TrackPlayerProvider>
  );
}
