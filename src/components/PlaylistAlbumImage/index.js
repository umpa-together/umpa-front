import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SongImage } from 'widgets/SongImage';

export default function PlaylistAlbumImage({ image, songs, size }) {
  const imgStyle = {
    width: size,
    height: size,
  };

  return (
    <View style={[styles.container, imgStyle]}>
      {image ? (
        <Image source={{ uri: image }} style={imgStyle} />
      ) : (
        songs.slice(0, 4).map((item) => {
          const { url } = item.attributes.artwork;
          return (
            <SongImage key={item.id} url={url} imgStyle={{ width: size / 2, height: size / 2 }} />
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    flexWrap: 'wrap',
  },
});
