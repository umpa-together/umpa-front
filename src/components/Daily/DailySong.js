import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';

export default function DailySong({ song, containerStyle }) {
  const { isPlayingId, onClickSong } = useTrackPlayer();
  const { attributes, id } = song;
  const { contentRating, name, artistName } = attributes;
  return (
    <View style={[containerStyle, style.flexRow, style.alignCenter]}>
      <TouchableOpacity onPress={() => onClickSong(song)} activeOpacity={0.9}>
        <View style={styles.icon} />
      </TouchableOpacity>
      <MoveText
        isExplicit={contentRating === 'explicit'}
        text={`${name}-${artistName}`}
        isMove={id === isPlayingId}
        textStyle={styles.textStyle}
        container={styles.moveArea}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: FS(13),
  },
  icon: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    marginRight: 10 * SCALE_WIDTH,
  },
  moveArea: {
    width: 280 * SCALE_WIDTH,
  },
});
