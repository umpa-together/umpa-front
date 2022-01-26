/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_2, COLOR_3 } from 'constants/colors';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';
import { SongImage } from 'widgets/SongImage';
import { Context as PlaylistContext } from 'context/Playlist';
import { push } from 'lib/utils/navigation';
import TouchableNoDouble from 'components/TouchableNoDouble';

const playlistConverter = (el, round) => {
  const { image, songs, title, time, _id, postUserId } = el;
  const convertTime = time.slice(0, 10).replaceAll('-', '.');
  const { getSelectedPlaylist } = useContext(PlaylistContext);
  const onClickPlaylist = async () => {
    await getSelectedPlaylist({ id: _id, postUserId });
    push('SelectedPlaylist', { post: false });
  };

  return {
    _id,
    image: <PlaylistAlbumImage image={image} songs={songs} size={85} round={round} />,
    title,
    content: `${songs[0].attributes.name}외 ${songs.length} 곡`,
    time: convertTime,
    onClick: onClickPlaylist,
  };
};

const relayConverter = (el) => {
  const { playlist, song } = el;
  const { _id, title, createdTime } = playlist;
  const { artwork, name } = song.attributes;
  const convertTime = createdTime.slice(0, 10).replaceAll('-', '.');

  return {
    _id,
    image: <SongImage url={artwork.url} imgStyle={styles.imagePlaylist} />,
    title,
    content: name,
    time: convertTime,
  };
};

export default function PostingCard({ item, opt, action, round }) {
  const transformedData =
    opt === 'playlist' ? playlistConverter(item, round) : relayConverter(item);
  const { title, content, time, image, onClick } = transformedData;
  return (
    <TouchableNoDouble onPress={onClick} style={[styles.container, style.flexRow]}>
      {image}
      <View style={action ? styles.textContainer : styles.textContainerNoActon}>
        <Text numberOfLines={1} style={styles.titleText}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.contentText}>
          {content}
        </Text>
        <Text numberOfLines={1} style={styles.contentText}>
          {time}
        </Text>
      </View>
      {action}
    </TouchableNoDouble>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 23 * SCALE_HEIGHT,
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  textContainer: {
    width: 202 * SCALE_WIDTH,
    marginLeft: 15 * SCALE_WIDTH,
    justifyContent: 'center',
  },
  textContainerNoActon: {
    width: 242 * SCALE_WIDTH,
    marginLeft: 15 * SCALE_WIDTH,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: FS(14),
    fontWeight: 'bold',
    marginBottom: 13 * SCALE_HEIGHT,
    color: COLOR_2,
  },
  contentText: {
    fontSize: FS(11),
    marginBottom: 8 * SCALE_HEIGHT,
    color: COLOR_3,
  },
  imagePlaylist: {
    width: 80 * SCALE_WIDTH,
    height: 80 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
  imageDaily: {
    width: 60 * SCALE_WIDTH,
    height: 60 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
