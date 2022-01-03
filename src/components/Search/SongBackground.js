import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SongImage, SongImageBack } from 'widgets/SongImage';
import { useTrackPlayer } from 'providers/trackPlayer';

export default function Songbackground({ song }) {
  const { name, artistName, artwork } = song.attributes;
  const { onClickSong } = useTrackPlayer();

  return (
    <View style={styles.container}>
      <SongImageBack url={artwork.url} imgStyle={styles.background} border={0} />
      <View style={styles.songContaienr}>
        <Text>{name}</Text>
        <TouchableOpacity onPress={() => onClickSong(song)} activeOpacity={0.9}>
          <SongImage url={artwork.url} imgStyle={styles.img} />
        </TouchableOpacity>
        <Text>{artistName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 375,
  },
  background: {
    width: '100%',
    height: 375,
    opacity: 0.5,
    position: 'absolute',
  },
  songContaienr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 150,
    zIndex: 98,
  },
});
