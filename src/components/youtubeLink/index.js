import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';

export default function YoutubeLink({ func, relay = false }) {
  return (
    <TouchableOpacity style={[style.flexRow, styles.container]} onPress={func} activeOpacity={0.6}>
      <Icon source={require('public/icons/youtube.png')} style={styles.youtube} />
      <Text style={styles.text}>플리{!relay && ' 전체'} 듣기</Text>
      <Icon source={require('public/icons/youtube-right.png')} style={styles.right} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 4 * SCALE_WIDTH,
    paddingRight: 8 * SCALE_WIDTH,
    paddingVertical: 2 * SCALE_HEIGHT,
    backgroundColor: '#ededed',
    borderRadius: 4 * SCALE_HEIGHT,
  },
  youtube: {
    width: 18 * SCALE_WIDTH,
    height: 18 * SCALE_WIDTH,
  },
  right: {
    width: 4 * SCALE_WIDTH,
    height: 8 * SCALE_HEIGHT,
  },
  text: {
    color: COLOR_3,
    marginLeft: 5 * SCALE_WIDTH,
    marginRight: 4 * SCALE_WIDTH,
    fontSize: FS(11),
  },
});
