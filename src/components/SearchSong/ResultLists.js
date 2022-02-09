/* eslint-disable no-nested-ternary */
import React, { useCallback, useContext } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import { useSearch } from 'providers/search';
import AddSongView from 'components/SongView/AddSongView';
import LoadingIndicator from 'components/LoadingIndicator';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Divider from 'widgets/Divider';
import { COLOR_1, COLOR_2 } from 'constants/colors';
import EmptyData from 'components/EmptyData';
import Text from 'components/Text';

export default function ResultLists() {
  const { state } = useContext(AppleMusicContext);
  const { text, searching, loading, onEndReached } = useSearch();
  const textList = ['검색결과가 없습니다', '다른 검색어를 입력해보세요'];
  const keyExtractor = useCallback((_) => _.id, []);
  const ListFooterComponent = useCallback(() => loading && <ActivityIndicator />, [loading]);
  const renderItem = useCallback(({ item }) => <AddSongView song={item} />, []);
  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>
        {`"${text}"`}
        <Text style={styles.text}>검색결과</Text>
      </Text>
      <Divider containerStyle={styles.dividerContainer} />
      <>
        {state.songData ? (
          searching ? (
            <LoadingIndicator />
          ) : state.songData.length > 0 ? (
            <FlatList
              style={styles.listContainter}
              data={state.songData}
              keyExtractor={keyExtractor}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.6}
              ListFooterComponent={ListFooterComponent}
              renderItem={renderItem}
              maxToRenderPerBatch={5}
              windowSize={5}
            />
          ) : (
            <EmptyData textList={textList} icon />
          )
        ) : (
          <LoadingIndicator />
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 21 * SCALE_HEIGHT,
    flex: 1,
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
    flex: 1,
  },
});
