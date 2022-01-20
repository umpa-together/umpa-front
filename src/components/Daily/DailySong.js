import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import { COLOR_2 } from 'constants/colors';

export default function DailySong({ song, containerStyle, time, selected }) {
  const { isPlayingId, onClickSong } = useTrackPlayer();
  const { attributes, id } = song;
  const { contentRating, name, artistName } = attributes;
  useEffect(() => {
    if (selected && contentRating !== 'explicit') {
      onClickSong(song);
    }
  }, []);
  return (
    <View style={[containerStyle, style.flexRow, style.space_between]}>
      <TouchableOpacity
        onPress={() => onClickSong(song)}
        style={[style.flexRow, style.alignCenter]}
      >
        <MoveText
          isExplicit={contentRating === 'explicit'}
          text={`${name}-${artistName}`}
          isMove={id === isPlayingId}
          textStyle={styles.textStyle}
          container={styles.moveArea}
        />
        <Icon source={require('public/icons/daily-song-play.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: FS(11),
    color: COLOR_2,
  },
  icon: {
    width: 11 * SCALE_WIDTH,
    height: 13 * SCALE_HEIGHT,
    right: 16 * SCALE_WIDTH,
  },
  moveArea: {
    maxWidth: 280 * SCALE_WIDTH,
    paddingVertical: 4 * SCALE_HEIGHT,
    paddingLeft: 9 * SCALE_WIDTH,
    paddingRight: 20 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 43 * SCALE_HEIGHT,
    borderColor: 'rgba(27,77,255,0.3)',
  },
  timeText: {
    fontSize: FS(12),
    color: 'rgba(80,80,80,0.8)',
  },
});
