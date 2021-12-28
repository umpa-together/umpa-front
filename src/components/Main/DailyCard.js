import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { SongImage } from 'widgets/SongImage';

export default function DailyCard({ data }) {
  const { textcontent, time, song } = data;
  const { attributes } = song;
  const { artwork, name } = attributes;
  return (
    <View style={style.flexRow}>
      {data.image.length > 0 ? (
        <Image source={{ url: data.image[0] }} style={styles.image} />
      ) : (
        <SongImage url={artwork.url} imgStyle={styles.image} />
      )}
      <View>
        <Text>{name}</Text>
        <Text>{textcontent}</Text>
        <Text>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80 * SCALE_WIDTH,
    height: 80 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
  flexRow: {
    flexDirection: 'row',
  },
});
