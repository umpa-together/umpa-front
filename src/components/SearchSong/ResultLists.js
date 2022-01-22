import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import { useSearch } from 'providers/search';
import AddSongView from 'components/SongView/AddSongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import LoadingIndicator from 'components/LoadingIndicator';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Divider from 'widgets/Divider';
import { COLOR_1, COLOR_2 } from 'constants/colors';

export default function ResultLists() {
  const { state } = useContext(AppleMusicContext);
  const { text, loading, onEndReached } = useSearch();

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>
        {`"${text}"`}
        <Text style={styles.text}>검색결과</Text>
      </Text>
      <Divider containerStyle={styles.dividerContainer} />
      <TrackPlayerProvider>
        {state.songData ? (
          <FlatList
            style={styles.listContainter}
            data={state.songData}
            keyExtractor={(_) => _.id}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.6}
            ListFooterComponent={loading && <ActivityIndicator />}
            renderItem={({ item }) => {
              return <AddSongView song={item} />;
            }}
          />
        ) : (
          <LoadingIndicator />
        )}
      </TrackPlayerProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 21 * SCALE_HEIGHT,
    height: 600 * SCALE_HEIGHT,
  },
  searchText: {
    fontSize: FS(14),
    color: COLOR_1,
    fontWeight: 'bold',
    marginLeft: 16 * SCALE_WIDTH,
  },
  text: {
    color: COLOR_2,
    fontSize: FS(14),
    fontWeight: 'normal',
  },
  dividerContainer: {
    marginTop: 15.5 * SCALE_HEIGHT,
    height: 1 * SCALE_HEIGHT,
    backgroundColor: '#DBDBDB',
  },
  listContainter: {
    paddingTop: 21.5 * SCALE_HEIGHT,
  },
});
