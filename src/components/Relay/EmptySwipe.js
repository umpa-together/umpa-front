import { StyleSheet, View } from 'react-native';
import React from 'react';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import Text from 'components/Text';

export default function EmptySwipe() {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} source={require('public/icons/swipe-end.png')} />
      <Text style={styles.boldText}>평가완료</Text>
      <Text style={styles.text}>{'새로운 도전곡이 업로드되면\n평가가 가능합니다.'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 339 * SCALE_WIDTH,
    height: 400 * SCALE_WIDTH,
    marginLeft: 18 * SCALE_WIDTH,
    marginTop: 30 * SCALE_HEIGHT,
    alignItems: 'center',
  },
  icon: {
    marginTop: 81 * SCALE_WIDTH,
    width: 71 * SCALE_WIDTH,
    height: 71 * SCALE_WIDTH,
  },
  boldText: {
    fontSize: FS(18),
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: FS(16),
    color: '#fff',
    textAlign: 'center',
    marginTop: 46 * SCALE_WIDTH,
    lineHeight: 26 * SCALE_HEIGHT,
  },
});
