import React, { useCallback, useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import PlaylistCard from 'components/Search/PlaylistCard';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';

export default function RecommendPlaylist() {
  const { state } = useContext(MainContentsContext);
  const keyExtractor = useCallback((_) => _.title, []);
  const renderItem = useCallback(({ item }) => <PlaylistCard info={item} />, []);
  return (
    <>
      <Text style={styles.title}>추천 플레이리스트</Text>
      <FlatList
        data={state.mainPlaylist}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        renderItem={renderItem}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(16),
    color: COLOR_1,
    marginBottom: 12 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
  flatList: {
    paddingHorizontal: 11.5 * SCALE_WIDTH,
  },
});
