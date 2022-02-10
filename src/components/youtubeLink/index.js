import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';
import Text from 'components/Text';

export default function YoutubeLink({ func, relay = false }) {
  const widthStyle = {
    width: relay ? 96 * SCALE_WIDTH : 123 * SCALE_WIDTH,
  };
  const paddingStyle = {
    right: relay ? -10 * SCALE_WIDTH : 10 * SCALE_WIDTH,
  };
  return (
    <TouchableOpacity
      style={[styles.touchArea, widthStyle, paddingStyle]}
      onPress={func}
      activeOpacity={0.6}
    >
      <View style={[style.flexRow, styles.container]}>
        <Icon source={require('public/icons/youtube.png')} style={styles.youtube} />
        <Text style={styles.text}>플리{!relay && ' 전체'} 듣기</Text>
        <Icon source={require('public/icons/youtube-right.png')} style={styles.right} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchArea: {
    padding: 5 * SCALE_WIDTH,
  },
  container: {
    paddingLeft: 6 * SCALE_WIDTH,
    paddingRight: 4 * SCALE_WIDTH,
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
