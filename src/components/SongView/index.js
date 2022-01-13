import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import style from 'constants/styles';
import { useTrackPlayer } from 'providers/trackPlayer';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, COLOR_5 } from 'constants/colors';
import MoveText from 'components/MoveText';

export default function SongView({ song, actions }) {
  const { artwork, artistName, name, contentRating } = song.attributes;
  const { onClickSong, isPlayingId } = useTrackPlayer();

  return (
    <View style={[style.flexRow, style.space_between, styles.container]}>
      <View style={style.flexRow}>
        <SongImage url={artwork.url} imgStyle={styles.img} />
        <View style={actions === undefined ? styles.moveArea : styles.moveArea_actions}>
          <MoveText
            isExplicit={contentRating === 'explicit'}
            text={name}
            isMove={song.id === isPlayingId}
            textStyle={styles.title}
          />
          <MoveText text={artistName} isMove={song.id === isPlayingId} textStyle={styles.artist} />
        </View>
      </View>
      <View style={[style.flexRow, styles.actions]}>
        <TouchableOpacity onPress={() => onClickSong(song)} style={styles.icon}>
          <Text>{isPlayingId !== song.id ? '재생' : '정지'}</Text>
        </TouchableOpacity>
        {actions}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16 * SCALE_WIDTH,
    marginBottom: 19 * SCALE_HEIGHT,
    width: '100%',
  },
  img: {
    width: 60 * SCALE_WIDTH,
    height: 60 * SCALE_WIDTH,
    marginRight: 10 * SCALE_WIDTH,
  },
  title: {
    fontSize: FS(13),
    color: COLOR_3,
  },
  artist: {
    fontSize: FS(12),
    color: COLOR_5,
    marginTop: 10 * SCALE_HEIGHT,
  },
  actions: {
    marginRight: 4 * SCALE_WIDTH,
  },
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    borderWidth: 1,
  },
  moveArea: {
    maxWidth: 240 * SCALE_WIDTH,
  },
  moveArea_actions: {
    maxWidth: 200 * SCALE_WIDTH,
  },
});
