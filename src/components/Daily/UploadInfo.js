import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import DailyImage from 'components/DailyImage';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import DailySong from './DailySong';

export default function UploadInfo() {
  const {
    song,
    images,
    information: { content },
  } = useDailyCreate();
  return (
    <ScrollView style={{ flex: 1 }}>
      {song && <DailySong containerStyle={styles.songContainer} song={song} />}
      {images.length > 0 && <DailyImage upload image={images} />}
      <Text style={styles.textStyle}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  songContainer: {
    paddingLeft: 18 * SCALE_WIDTH,
    paddingTop: 18 * SCALE_HEIGHT,
    paddingBottom: 14 * SCALE_HEIGHT,
  },
  textStyle: {
    paddingLeft: 21 * SCALE_WIDTH,
    paddingRight: 15 * SCALE_WIDTH,
    paddingTop: 11 * SCALE_HEIGHT,
    lineHeight: 26 * SCALE_HEIGHT,
    fontSize: FS(14),
  },
});
