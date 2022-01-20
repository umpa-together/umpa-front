import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import SongView from 'components/SongView';
import { useSongActions } from 'providers/songActions';

export default function AddedSongLists() {
  const { getAddedSong, state } = useContext(AddedContext);
  const { getActionComponent } = useSongActions();

  useEffect(() => {
    getAddedSong();
  }, []);

  return (
    <View style={styles.container}>
      <Text>담은 곡</Text>
      <FlatList
        data={state.songLists}
        keyExtractor={(_) => _._id}
        renderItem={({ item }) => {
          const { song } = item;
          return <SongView song={song} actions={getActionComponent({ data: song })} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
