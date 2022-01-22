import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import style from 'constants/styles';
import { useTrackPlayer } from 'providers/trackPlayer';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, COLOR_5 } from 'constants/colors';
import MoveText from 'components/MoveText';
import Icon from 'widgets/Icon';
import { useSongActions } from 'providers/songActions';

export default function AddSongView({ song }) {
  const { artwork, artistName, name, contentRating } = song.attributes;
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const playingCheck = song.id === isPlayingId;
  const { containCheck, addSongActions } = useSongActions();
  const [isAdd, setIsAdd] = useState(containCheck({ song }));
  const onPressAdd = () => {
    setIsAdd(addSongActions({ song }));
  };

  return (
    <View style={[style.flexRow, style.space_between, styles.container]}>
      <View style={style.flexRow}>
        <SongImage url={artwork.url} imgStyle={styles.img} />
        <TouchableOpacity onPress={() => onClickSong(song)} style={styles.playContainer}>
          <Icon
            source={
              playingCheck
                ? require('public/icons/search-modal-stop.png')
                : require('public/icons/search-modal-play.png')
            }
            style={playingCheck ? styles.stopIcon : styles.playIcon}
          />
        </TouchableOpacity>
        <View style={styles.moveArea}>
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
        <TouchableOpacity onPress={onPressAdd} style={styles.iconContainer}>
          <Icon
            style={style.icons}
            source={
              isAdd
                ? require('public/icons/search-modal-added.png')
                : require('public/icons/search-modal-add.png')
            }
          />
        </TouchableOpacity>
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
    borderRadius: 4 * SCALE_HEIGHT,
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
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    marginRight: 4 * SCALE_WIDTH,
  },
  moveArea: {
    maxWidth: 240 * SCALE_WIDTH,
  },
  moveArea_actions: {
    maxWidth: 200 * SCALE_WIDTH,
  },
  playContainer: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10 * SCALE_WIDTH,
  },
  playIcon: {
    width: 18 * SCALE_WIDTH,
    height: 18 * SCALE_WIDTH,
  },
  stopIcon: {
    width: 18 * SCALE_WIDTH,
    height: 18 * SCALE_WIDTH,
  },
  iconContainer: {
    marginRight: 6 * SCALE_WIDTH,
  },
});