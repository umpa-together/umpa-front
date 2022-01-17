import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'widgets/Icon';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';
import { MAIN_COLOR, COLOR_3 } from 'constants/colors';

export default function SongCard({ song }) {
  const { name, contentRating } = song.attributes;

  return (
    <View style={[styles.container, style.flexRow]}>
      {contentRating === 'explicit' && <View style={styles.explicit} />}
      <View style={[styles.infoArea, style.flexRow]}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
      </View>
      <Icon source={require('public/icons/play-indicator.png')} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: MAIN_COLOR,
    borderRadius: 44 * SCALE_HEIGHT,
    paddingHorizontal: 8 * SCALE_WIDTH,
    paddingVertical: 4 * SCALE_HEIGHT,
    marginRight: 6 * SCALE_WIDTH,
    marginTop: 10 * SCALE_HEIGHT,
    maxWidth: 200 * SCALE_WIDTH,
  },
  infoArea: {
    maxWidth: 160 * SCALE_WIDTH,
  },
  icon: {
    width: 15 * SCALE_WIDTH,
    height: 15 * SCALE_WIDTH,
    marginLeft: 3 * SCALE_WIDTH,
  },
  title: {
    fontSize: FS(12),
    color: COLOR_3,
  },
  explicit: {
    width: 12 * SCALE_WIDTH,
    height: 12 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    marginRight: 5 * SCALE_WIDTH,
  },
});