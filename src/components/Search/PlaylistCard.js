import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as PlaylistContext } from 'context/Playlist';
import style from 'constants/styles';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import { navigate } from 'lib/utils/navigation';

export default function PlaylistCard({ info }) {
  const {
    image,
    title,
    playlist: { _id: id, postUserId },
  } = info;
  const { getSelectedPlaylist } = useContext(PlaylistContext);

  const onClickPlaylist = async () => {
    await getSelectedPlaylist({ id, postUserId });
    navigate('SelectedPlaylist', { post: false });
  };

  return (
    <TouchableOpacity
      style={[styles.container, style.flexRow]}
      activeOpacity={1}
      onPress={onClickPlaylist}
    >
      <View style={styles.img} />
      <View style={styles.titleArea}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 176 * SCALE_WIDTH,
    height: 80 * SCALE_HEIGHT,
    backgroundColor: COLOR_1,
    marginRight: 10 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
  },
  img: {
    width: 50 * SCALE_WIDTH,
    height: 50 * SCALE_WIDTH,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 13 * SCALE_WIDTH,
  },
  title: {
    color: '#fff',
    fontSize: FS(12),
    lineHeight: 14 * SCALE_HEIGHT,
  },
  titleArea: {
    width: 95 * SCALE_WIDTH,
  },
});
