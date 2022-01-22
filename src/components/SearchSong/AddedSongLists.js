import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import AddSongView from 'components/SongView/AddSongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Divider from 'widgets/Divider';
import { COLOR_5 } from 'constants/colors';

export default function AddedSongLists() {
  const { getAddedSong, state } = useContext(AddedContext);

  useEffect(() => {
    getAddedSong();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>저장한 곡</Text>
      <Divider containerStyle={styles.dividerContainer} />
      <TrackPlayerProvider>
        <FlatList
          style={styles.listContainter}
          data={state.songLists}
          keyExtractor={(_) => _._id}
          renderItem={({ item }) => {
            const { song } = item;
            return <AddSongView song={song} />;
          }}
        />
      </TrackPlayerProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 21 * SCALE_HEIGHT,
    height: 600 * SCALE_HEIGHT,
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
