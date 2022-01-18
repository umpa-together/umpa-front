import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_2 } from 'constants/colors';
import { useTrackPlayer } from 'providers/trackPlayer';

export default function UserRepresentSong({ song, action }) {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const { name: songName, artistName } = song.attributes;
  const onPress = (el) => {
    if (action) {
      action();
    } else {
      onClickSong(el);
    }
  };
  return (
    <TouchableOpacity onPress={() => onPress(song)} style={styles.representBox}>
      <Text numberOfLines={1} style={styles.representText}>{`${songName} - ${artistName}`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  representBox: {
    borderRadius: 100 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: MAIN_COLOR,
    alignSelf: 'flex-start',
  },
  representText: {
    paddingHorizontal: 10 * SCALE_WIDTH,
    paddingTop: 5 * SCALE_HEIGHT,
    paddingBottom: 3 * SCALE_HEIGHT,
    color: COLOR_2,
    fontSize: FS(11),
  },
});
