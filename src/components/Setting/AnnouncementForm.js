import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import FS, { SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1, COLOR_5 } from 'constants/colors';

export default function AnnouncementForm({ title, time }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1 * SCALE_HEIGHT,
    borderBottomColor: '#dbdbdb',
    paddingBottom: 15 * SCALE_HEIGHT,
    marginBottom: 23 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(14),
    color: COLOR_1,
    marginBottom: 12 * SCALE_HEIGHT,
  },
  time: {
    fontSize: FS(13),
    color: COLOR_5,
  },
});
