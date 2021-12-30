import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import style from 'constants/styles';
import { useTrackPlayer } from 'providers/trackPlayer';
import SongTitle from 'components/SongTitle.js';

export default function SongView({ song, actions }) {
  const { artwork, artistName, name, contentRating } = song.attributes;
  const { onClickSong } = useTrackPlayer();
  return (
    <View style={[style.flexRow, style.space_between]}>
      <View style={style.flexRow}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => onClickSong(song)}>
          <SongImage url={artwork.url} imgStyle={styles.img} />
        </TouchableOpacity>
        <View>
          <SongTitle title={name} isExplicit={contentRating === 'explicit'} />
          <Text>{artistName}</Text>
        </View>
      </View>
      {actions}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
  },
});
