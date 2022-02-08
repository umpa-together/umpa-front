import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_2, COLOR_3 } from 'constants/colors';
import Icon from 'widgets/Icon';
import { useTrackPlayer } from 'providers/trackPlayer';
import Text from 'components/Text';

export default function PlaylistView({ playlist, actions = null, landings = null, play = true }) {
  const { image, songs, title, time } = playlist;
  const { name } = songs[0].attributes;
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const playingCheck = songs[0].id === isPlayingId;
  const widthCount = (play && 1) + (actions && 1) + (landings && 1);

  return (
    <View style={[style.flexRow, style.space_between, styles.container]}>
      <View style={style.flexRow}>
        {landings}
        <PlaylistAlbumImage image={image} songs={songs} size={85} />
        <View style={[styles.infoContainer, { maxWidth: (220 - 40 * widthCount) * SCALE_WIDTH }]}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text numberOfLines={1} style={[styles.margin, styles.content]}>
            {name} 외 {songs.length} 곡
          </Text>
          <Text style={styles.content} numberOfLines={1}>
            {time.substr(0, 10).replaceAll('-', '.')}
          </Text>
        </View>
      </View>
      <View style={[style.flexRow, styles.actions]}>
        {play && (
          <TouchableOpacity onPress={() => onClickSong(songs[0])} style={styles.icon}>
            <Icon
              source={
                playingCheck ? require('public/icons/stop.png') : require('public/icons/play.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        {actions}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22 * SCALE_HEIGHT,
  },
  infoContainer: {
    marginLeft: 17 * SCALE_WIDTH,
  },
  title: {
    fontSize: FS(14),
    color: COLOR_2,
  },
  content: {
    fontSize: FS(11),
    color: COLOR_3,
  },
  margin: {
    marginTop: 13 * SCALE_HEIGHT,
    marginBottom: 8 * SCALE_HEIGHT,
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    marginRight: 4 * SCALE_WIDTH,
  },
});
