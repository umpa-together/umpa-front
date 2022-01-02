import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SongImage } from 'widgets/SongImage';

export default function PlaylistAlbumImage({ songs, size }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {songs.slice(0, 4).map((item) => {
        const { url } = item.attributes.artwork;
        return <SongImage url={url} imgStyle={{ width: size / 2, height: size / 2 }} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    flexWrap: 'wrap',
  },
});
