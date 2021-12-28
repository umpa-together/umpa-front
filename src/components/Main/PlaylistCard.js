import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function PlaylistCard({ data }) {
  const { songs } = data;
  return (
    <View style={style.flexRow}>
      {data.image ? (
        <Image source={{ uri: data.image }} style={styles.image} />
      ) : (
        <View style={styles.image} />
      )}
      <View>
        <Text>{data.title}</Text>
        <Text>{songs[0].attributes.name}</Text>
        <Text>{data.time}</Text>
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
});
