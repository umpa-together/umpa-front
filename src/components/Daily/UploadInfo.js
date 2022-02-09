import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import DailyImage from 'components/DailyImage';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';
import DailySong from './DailySong';

export default function UploadInfo() {
  const {
    song,
    images,
    information: { content },
  } = useDailyCreate();
  return (
    <ScrollView style={styles.container}>
      {song && <DailySong containerStyle={styles.songContainer} song={song} />}
      {images.length > 0 && <DailyImage upload image={images} />}
      <Text style={styles.textStyle}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    color: COLOR_1,
    fontSize: FS(14),
  },
});
