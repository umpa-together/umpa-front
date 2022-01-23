import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import { COLOR_2 } from 'constants/colors';

export default function SortPosting({ count, title, onPressModal }) {
  return (
    <View style={[style.flexRow, style.space_between, styles.container]}>
      <Text style={styles.text}>{count !== 0 && `총 ${count}개`}</Text>
      <TouchableOpacity style={style.flexRow} onPress={onPressModal}>
        <Text style={styles.text}>{title}</Text>
        <Icon style={styles.iconStyle} source={require('public/icons/account-sort.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22 * SCALE_HEIGHT,
    paddingHorizontal: 15 * SCALE_WIDTH,
  },
  text: {
    fontSize: FS(12),
    color: COLOR_2,
  },
  iconStyle: {
    width: 8 * SCALE_WIDTH,
    height: 4 * SCALE_HEIGHT,
    marginLeft: 3 * SCALE_WIDTH,
  },
});
