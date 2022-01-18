import React, { useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import { SongImage } from 'widgets/SongImage';
import style from 'constants/styles';
import { useTrackPlayer } from 'providers/trackPlayer';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_2, COLOR_4, MAIN_COLOR } from 'constants/colors';
import MoveText from 'components/MoveText';
import Icon from 'widgets/Icon';
import { navigate } from 'lib/utils/navigation';

export default function SearchSongView({ info }) {
  const { id } = info.song;
  const { artwork, artistName, name, contentRating } = info.song.attributes;
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const { dailyCount, playlistCount } = info;
  const { postAddedSong } = useContext(AddedContext);

  const onClickAdd = () => {
    postAddedSong({ song: info.song });
  };

  const onClickSongView = () => {
    navigate('SelectedSong', { song: info.song });
  };

  return (
    <TouchableOpacity
      style={[style.flexRow, style.space_between, styles.container]}
      onPress={onClickSongView}
      activeOpacity={0.8}
    >
      <View style={style.flexRow}>
        <SongImage url={artwork.url} imgStyle={styles.img} />
        <View style={styles.area}>
          <MoveText
            isExplicit={contentRating === 'explicit'}
            text={name}
            isMove={id === isPlayingId}
            textStyle={styles.title}
          />
          <MoveText text={artistName} isMove={id === isPlayingId} textStyle={styles.artist} />
          <View style={style.flexRow}>
            <Text style={[styles.count, styles.margin]}>
              플리 <Text style={styles.active}>{playlistCount}</Text>
            </Text>
            <Text style={styles.count}>
              데일리 <Text style={styles.active}>{dailyCount}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={[style.flexRow, styles.actions]}>
        <TouchableOpacity onPress={() => onClickSong(info.song)} style={styles.icon}>
          <Text>{isPlayingId !== id ? '재생' : '정지'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={onClickAdd}>
          <Icon source={require('public/icons/add-song.png')} style={styles.add} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16 * SCALE_WIDTH,
    marginBottom: 21 * SCALE_HEIGHT,
    width: '100%',
  },
  img: {
    width: 56 * SCALE_WIDTH,
    height: 56 * SCALE_WIDTH,
    marginRight: 10 * SCALE_WIDTH,
    borderRadius: 4 * SCALE_HEIGHT,
  },
  area: {
    width: 180 * SCALE_WIDTH,
  },
  title: {
    fontSize: FS(14),
    color: COLOR_2,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: FS(13),
    color: COLOR_2,
    marginTop: 4 * SCALE_HEIGHT,
  },
  count: {
    fontSize: FS(11),
    color: COLOR_4,
    marginTop: 7 * SCALE_HEIGHT,
  },
  active: {
    color: MAIN_COLOR,
  },
  margin: {
    marginRight: 8 * SCALE_WIDTH,
  },
  add: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
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
