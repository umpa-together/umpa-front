import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import style from 'constants/styles';
import { useTrackPlayer } from 'providers/trackPlayer';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, COLOR_5 } from 'constants/colors';
import MoveText from 'components/MoveText';
import Icon from 'widgets/Icon';
import CopySongName from 'components/CopySongName';

export default function SongView({ song, actions = null, landings = null, play = true, playlist }) {
  const { artwork, artistName, name, contentRating } = song.attributes;
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const playingCheck = song.id === isPlayingId && !playlist;
  const widthCount = (play && 1) + (actions && 1) + (landings && 1);
  const defaultArea = contentRating !== 'explicit' ? 280 : 260;
  const areaStyles = { maxWidth: (defaultArea - 40 * widthCount) * SCALE_WIDTH };

  const onClickView = () => {
    onClickSong(song);
  };
  return (
    <TouchableOpacity
      onPress={onClickView}
      style={[style.flexRow, style.space_between, styles.container]}
    >
      <View style={style.flexRow}>
        {landings}
        <SongImage url={artwork.url} imgStyle={styles.img} />
        <CopySongName initAction={onClickView} name={name}>
          <View style={areaStyles}>
            <MoveText
              isExplicit={contentRating === 'explicit'}
              text={name}
              isMove={playingCheck}
              textStyle={styles.title}
            />
            <MoveText text={artistName} isMove={playingCheck} textStyle={styles.artist} />
          </View>
        </CopySongName>
      </View>
      <View style={[style.flexRow, styles.actions]}>
        {play && (
          <TouchableOpacity style={styles.icon} onPress={onClickView}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16 * SCALE_WIDTH,
    width: '100%',
    marginVertical: 10 * SCALE_HEIGHT,
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
    marginRight: 10 * SCALE_WIDTH,
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    marginRight: 5 * SCALE_WIDTH,
  },
});
