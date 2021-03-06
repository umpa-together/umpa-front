import React, { useCallback, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import AddSongView from 'components/SongView/AddSongView';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Divider from 'widgets/Divider';
import { COLOR_5 } from 'constants/colors';
import EmptyData from 'components/EmptyData';
import Text from 'components/Text';

export default function AddedSongLists() {
  const {
    getAddedSong,
    state: { songLists },
  } = useContext(AddedContext);
  const textList = ['아직 저장한 곡이 없습니다'];

  useEffect(() => {
    getAddedSong();
  }, []);

  const keyExtractor = useCallback((_) => _._id, []);
  const renderItem = useCallback(({ item }) => {
    const { song } = item;
    return <AddSongView song={song} />;
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>저장한 곡</Text>
      <Divider containerStyle={styles.dividerContainer} />
      {songLists && songLists.length > 0 ? (
        <FlatList
          style={styles.listContainter}
          data={songLists}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      ) : (
        <EmptyData textList={textList} icon />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 21 * SCALE_HEIGHT,
    flex: 1,
  },
  text: {
    color: COLOR_5,
    fontSize: FS(14),
    marginLeft: 16 * SCALE_WIDTH,
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
