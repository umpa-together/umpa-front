import React, { useEffect, memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import { COLOR_2, MAIN_COLOR } from 'constants/colors';
import HarmfulModal from 'components/Modal/HarmfulModal';
import Text from 'components/Text';

export default memo(function DailySong({ song, containerStyle, time, selected }) {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const {
    id,
    attributes: { contentRating, name, artistName },
  } = song;

  const onClickPlay = () => {
    onClickSong(song);
  };

  useEffect(() => {
    if (selected && contentRating !== 'explicit') {
      onClickSong(song);
    }
  }, []);
  return (
    <View style={[containerStyle, style.flexRow, style.space_between]}>
      <TouchableOpacity onPress={onClickPlay} style={[style.flexRow, style.alignCenter]}>
        <MoveText
          isExplicit={contentRating === 'explicit'}
          text={`${name}-${artistName}`}
          isMove={isPlayingId === id}
          textStyle={styles.textStyle}
          container={styles.moveArea}
        />
        <Icon source={require('public/icons/daily-song-play.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.timeText}>{time}</Text>
      <HarmfulModal />
    </View>
  );
});

const styles = StyleSheet.create({
  textStyle: {
    fontSize: FS(11),
    color: COLOR_2,
  },
  icon: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_HEIGHT,
    right: 25 * SCALE_WIDTH,
  },
  moveArea: {
    maxWidth: 280 * SCALE_WIDTH,
    paddingVertical: 4 * SCALE_HEIGHT,
    paddingLeft: 9 * SCALE_WIDTH,
    paddingRight: 24 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 43 * SCALE_HEIGHT,
    borderColor: MAIN_COLOR,
  },
  timeText: {
    fontSize: FS(12),
    color: 'rgba(80,80,80,0.8)',
  },
});
