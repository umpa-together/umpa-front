import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_2 } from 'constants/colors';
import { useTrackPlayer } from 'providers/trackPlayer';
import Icon from 'widgets/Icon';
import style from 'constants/styles';

export default function UserRepresentSong({ song, action, account }) {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const { name: songName, artistName } = song.attributes;

  const maxWidthStyle = {
    maxWidth: account ? 148 * SCALE_WIDTH : 202 * SCALE_WIDTH,
  };

  const onPress = (el) => {
    if (action) {
      action();
    } else {
      onClickSong(el);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => onPress(song)}
      style={[style.flexRow, styles.representBox, maxWidthStyle]}
    >
      <Text numberOfLines={1} style={styles.representText}>{`${songName} - ${artistName}`}</Text>
      <Icon style={styles.playIcon} />
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
    paddingLeft: 9 * SCALE_WIDTH,
    paddingRight: 21 * SCALE_WIDTH,
    paddingTop: 5 * SCALE_HEIGHT,
    paddingBottom: 3 * SCALE_HEIGHT,
    color: COLOR_2,
    fontSize: FS(11),
  },
  playIcon: {
    width: 8 * SCALE_WIDTH,
    height: 11 * SCALE_HEIGHT,
    position: 'absolute',
    right: 4.2 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
