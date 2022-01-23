import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SongView from 'components/SongView';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';
import { usePlaylistCreate } from 'providers/playlistCreate';

export default function UploadSongs() {
  const { songs } = usePlaylistCreate();
  return (
    <View style={styles.contianer}>
      <Text style={styles.titleText}>총 {songs.length}곡</Text>
      {songs.map((song) => {
        return <SongView key={song.id} song={song} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: FS(12),
    color: COLOR_3,
    marginBottom: 28 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
});
