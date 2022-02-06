import { StyleSheet, View } from 'react-native';
import React from 'react';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import Icon from 'widgets/Icon';
import Timer from 'components/Timer';
import style from 'constants/styles';
import Text from 'components/Text';

export default function GuideBox({ time }) {
  return (
    <View style={styles.container}>
      <View style={style.flexRow}>
        <Icon source={require('public/icons/main-relay-time.png')} style={styles.icon} />
        <Timer time={time} timeStyle={styles.time} />
      </View>
      <Text style={styles.text}>
        플레이리스트에 어울리는 <Text style={styles.bold}>곡</Text>을 투표해주세요!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: 335 * SCALE_WIDTH,
    height: 67 * SCALE_HEIGHT,
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 464 * SCALE_HEIGHT,
    left: 20 * SCALE_WIDTH,
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
    fontSize: FS(16),
    marginLeft: 19 * SCALE_WIDTH,
    marginTop: 3 * SCALE_HEIGHT,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: FS(17),
  },
  icon: {
    width: 24 * SCALE_WIDTH,
    height: 24 * SCALE_WIDTH,
    marginRight: 1 * SCALE_WIDTH,
    marginLeft: 16 * SCALE_WIDTH,
  },
  time: {
    fontSize: FS(15),
    fontWeight: 'bold',
    color: '#FF3975',
  },
});
