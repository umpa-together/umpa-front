import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { SongImage } from 'widgets/SongImage';
import style from 'constants/styles';
import { COLOR_2, COLOR_3 } from 'constants/colors';
import Icon from 'widgets/Icon';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import { navigate, push } from 'lib/utils/navigation';
import { useModal } from 'providers/modal';
import TouchableNoDouble from 'components/TouchableNoDouble';
import FastImage from 'react-native-fast-image';
import Text from 'components/Text';

export default function DailyView({ info, actions, isSelected, titleCustom }) {
  const { image, song, textcontent, _id: id, postUserId } = info;
  const {
    name,
    artistName,
    contentRating,
    artwork: { url },
  } = song.attributes;
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const { postAddedSong } = useContext(AddedContext);
  const { onClickAdded } = useModal();

  const onClickAdd = () => {
    postAddedSong({ song: info.song });
    onClickAdded();
  };
  const onClickSongView = async () => {
    if (isSelected) {
      push('SelectedDaily', { post: false, id, postUserId });
    } else {
      navigate('SelectedSong', { song });
    }
  };

  return (
    <TouchableNoDouble style={styles.container} activeOpacity={0.8} onPress={onClickSongView}>
      <View style={[style.flexRow, style.space_between]}>
        <View style={style.flexRow}>
          {image.length === 0 ? (
            <SongImage url={url} imgStyle={styles.img} />
          ) : (
            <FastImage source={{ uri: image[0] }} style={styles.img} />
          )}
          <View style={[styles.area, titleCustom]}>
            <MoveText
              isExplicit={contentRating === 'explicit'}
              text={name}
              isMove={song.id === isPlayingId}
              textStyle={styles.name}
            />
            <MoveText
              text={artistName}
              isMove={song.id === isPlayingId}
              textStyle={styles.artist}
            />
          </View>
        </View>
        {actions && (
          <View style={[style.flexRow, styles.actions]}>
            <TouchableOpacity onPress={() => onClickSong(song)}>
              <Icon
                source={
                  song.id === isPlayingId
                    ? require('public/icons/stop.png')
                    : require('public/icons/play.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={onClickAdd}>
              <Icon source={require('public/icons/add-song.png')} style={styles.add} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text numberOfLines={2} style={styles.content}>
        {textcontent}
      </Text>
    </TouchableNoDouble>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  img: {
    width: 50 * SCALE_WIDTH,
    height: 50 * SCALE_WIDTH,
    borderRadius: 4 * SCALE_HEIGHT,
    marginRight: 16 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(14),
    color: COLOR_2,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: FS(13),
    color: COLOR_2,
    marginTop: 5 * SCALE_HEIGHT,
  },
  content: {
    fontSize: FS(13),
    color: COLOR_3,
    lineHeight: 18 * SCALE_HEIGHT,
    marginTop: 10 * SCALE_HEIGHT,
    marginBottom: 30 * SCALE_HEIGHT,
  },
  area: {
    width: 180 * SCALE_WIDTH,
  },
  add: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    marginRight: 5 * SCALE_WIDTH,
  },
});
