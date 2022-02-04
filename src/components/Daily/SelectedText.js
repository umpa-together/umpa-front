import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { Context as DailyContext } from 'context/Daily';
import { COLOR_1 } from 'constants/colors';
import Hyperlink from 'react-native-hyperlink';
import openURL from 'lib/utils/openUrl';

export default function SelectedText() {
  const {
    state: {
      currentDaily: { textcontent },
    },
  } = useContext(DailyContext);
  return (
    <View style={styles.container}>
      <Hyperlink linkStyle={styles.link} onPress={(url) => openURL(url)}>
        <Text style={styles.content}>{textcontent}</Text>
      </Hyperlink>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18 * SCALE_WIDTH,
    paddingRight: 14 * SCALE_WIDTH,
    paddingTop: 11 * SCALE_HEIGHT,
    paddingBottom: 10 * SCALE_HEIGHT,
  },
  content: {
    fontSize: FS(14),
    color: COLOR_1,
    lineHeight: 24 * SCALE_HEIGHT,
  },
  link: {
    fontSize: FS(14),
    lineHeight: 24 * SCALE_HEIGHT,
    color: '#2980b9',
  },
});
