import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_2, COLOR_3 } from 'constants/colors';

export default function PostingCard({ image, title, content, time }) {
  return (
    <View style={[styles.container, style.flexRow]}>
      {image}
      <View style={styles.textContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 23 * SCALE_HEIGHT,
  },
  textContainer: {
    width: 202 * SCALE_WIDTH,
    marginLeft: 15 * SCALE_WIDTH,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: FS(14),
    marginBottom: 13 * SCALE_HEIGHT,
    color: COLOR_2,
  },
  contentText: {
    fontSize: FS(11),
    marginBottom: 8 * SCALE_HEIGHT,
    color: COLOR_3,
  },
});
