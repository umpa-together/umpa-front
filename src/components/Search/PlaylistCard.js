import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as PlaylistContext } from 'context/Playlist';
import TouchableNoDouble from 'components/TouchableNoDouble';
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
    <TouchableNoDouble
      style={[styles.container, style.flexRow]}
      activeOpacity={1}
      onPress={onClickPlaylist}
    >
      <View style={styles.img} />
      <View style={styles.titleArea}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableNoDouble>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_1,
    marginRight: 10 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
  },
  img: {
    width: 50 * SCALE_WIDTH,
    height: 50 * SCALE_WIDTH,
    marginTop: 21 * SCALE_HEIGHT,
    marginBottom: 10 * SCALE_HEIGHT,
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
    marginRight: 16 * SCALE_WIDTH,
  },
});
