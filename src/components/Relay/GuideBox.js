import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';

export default function GuideBox() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        플레이리스트에 어울리는 <Text style={styles.bold}>다음 곡</Text>을 투표해주세요!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    height: 44 * SCALE_HEIGHT,
    width: 343 * SCALE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 421 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
    borderRadius: 9 * SCALE_HEIGHT,
    shadowOffset: {
      height: 5 * SCALE_WIDTH,
      width: 0,
    },
    shadowRadius: 2 * SCALE_WIDTH,
    shadowOpacity: 0.1,
    elevation: 10,
  },
  text: {
    color: COLOR_1,
    fontSize: FS(14),
  },
  bold: {
    fontWeight: 'bold',
  },
});
