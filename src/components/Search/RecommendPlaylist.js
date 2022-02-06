import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import PlaylistCard from 'components/Search/PlaylistCard';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';

export default function RecommendPlaylist() {
  const { state } = useContext(MainContentsContext);
  return (
    <>
      <Text style={styles.title}>추천 플레이리스트</Text>
      <FlatList
        data={state.mainPlaylist}
        keyExtractor={(playlist) => playlist.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }) => {
          return <PlaylistCard info={item} />;
        }}
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
