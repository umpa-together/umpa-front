import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SongImage } from 'widgets/SongImage';

export default function PlaylistAlbumImage({ songs, size }) {
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      backgroundColor: '#222',
      flexWrap: 'wrap',
    },
    img: {
      width: size / 2,
      height: size / 2,
    },
  });

  return (
    <View style={styles.container}>
      {songs.map((item, index) => {
        const { url } = item.attributes.artwork;
        return index < 4 && <SongImage url={url} imgStyle={styles.img} />;
      })}
    </View>
  );
}
