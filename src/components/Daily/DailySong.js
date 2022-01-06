import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';

export default function DailySong({ song }) {
  const { isPlayingId, onClickSong } = useTrackPlayer();
  const { attributes, id } = song;
  const { contentRating, name, artistName } = attributes;
  return (
    <TouchableOpacity
      style={[styles.container, style.flexRow]}
      onPress={() => onClickSong(song)}
      activeOpacity={0.9}
    >
      <View style={styles.icon} />
      <MoveText
        isExplicit={contentRating === 'explicit'}
        container={contentRating === 'explicit' ? styles.explicitName : styles.nameBox}
        text={name}
        isMove={id === isPlayingId}
        textStyle={styles.name}
      />
      <MoveText
        container={styles.artistBox}
        text={artistName}
        isMove={id === isPlayingId}
        textStyle={styles.artist}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30 * SCALE_HEIGHT,
    alignItems: 'center',
  },
  nameBox: {
    width: 177 * SCALE_WIDTH,
  },
  explicitName: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 155 * SCALE_WIDTH,
  },
  artistBox: {
    width: 110 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(14),
    lineHeight: 16 * SCALE_HEIGHT,
  },
  artist: {
    fontSize: FS(13),
    color: '#838383',
  },
  icon: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
