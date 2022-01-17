import React, { useContext } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import PlaylistCard from 'components/Search/PlaylistCard';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';

export default function RecommendPlaylist() {
  const { state } = useContext(MainContentsContext);
  return (
    <>
      <Text style={styles.title}>추천 플레이리스트</Text>
      <FlatList
        data={state.recentPlaylists}
        keyExtractor={(playlist) => playlist._id}
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