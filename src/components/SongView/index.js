import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import style from 'constants/styles';
import { useTrackPlayer } from 'providers/trackPlayer';

export default function SongView({ song }) {
  const { attributes } = song;
  const { artwork, artistName, name } = attributes;
  const { onClickSong } = useTrackPlayer();

  return (
    <View style={style.flexRow}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onClickSong(song)}>
        <SongImage url={artwork.url} imgStyle={styles.img} />
      </TouchableOpacity>
      <View>
        <Text>{name}</Text>
        <Text>{artistName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
  },
});
