import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import style from 'constants/styles';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, COLOR_5 } from 'constants/colors';
import SongTitle from 'components/SongTitle';

export default function ScrollSongView({ landings, song }) {
  const { artwork, artistName, name, contentRating } = song.attributes;

  return (
    <View style={[style.flexRow, styles.container]}>
      <View style={style.flexRow}>
        {landings}
        <SongImage url={artwork.url} imgStyle={styles.img} />
        <View style={styles.textArea}>
          <SongTitle
            isExplicit={contentRating === 'explicit'}
            title={name}
            titleStyle={styles.title}
          />
          <Text style={styles.artist} numberOfLines={1}>
            {artistName}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  img: {
    width: 50 * SCALE_WIDTH,
    height: 50 * SCALE_WIDTH,
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
  textArea: {
    maxWidth: 200 * SCALE_WIDTH,
  },
});
