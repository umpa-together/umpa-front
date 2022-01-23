import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_5 } from 'constants/colors';
import style from 'constants/styles';

export default function SelectedInfo({ playlistinfo }) {
  const {
    image,
    title,
    textcontent,
    postUserId: { name },
    songs,
    time,
  } = playlistinfo;
  const convertedTime = time.slice(0, 10);
  return (
    <View style={[style.flexRow, styles.container]}>
      <View style={style.flexRow}>
        <PlaylistAlbumImage round image={image} songs={songs} size={140} />
        <View style={[styles.textContainer, style.space_between]}>
          <View>
            <Text style={styles.titleText}>{title}</Text>
            {textcontent.length > 0 && <Text style={styles.contextText}>{textcontent}</Text>}
            <Text style={styles.contextText}>{convertedTime}</Text>
          </View>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 17 * SCALE_HEIGHT,
    paddingLeft: 26 * SCALE_WIDTH,
    paddingRight: 18 * SCALE_WIDTH,
  },
  imageContainer: {
    width: 140 * SCALE_WIDTH,
    height: 140 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
  },
  imageText: {
    fontSize: FS(20),
    color: '#FFF',
    position: 'absolute',
    left: 52 * SCALE_WIDTH,
    top: 58 * SCALE_HEIGHT,
  },
  textContainer: {
    marginLeft: 15 * SCALE_WIDTH,
    width: 176 * SCALE_WIDTH,
    height: 140 * SCALE_HEIGHT,
  },
  titleText: {
    fontSize: FS(16),
    marginBottom: 16 * SCALE_HEIGHT,
    color: '#000',
  },
  contextText: {
    fontSize: FS(11),
    color: COLOR_5,
    marginBottom: 10 * SCALE_HEIGHT,
  },
  nameText: {
    fontSize: FS(11),
    color: '#85A0FF',
  },
});
