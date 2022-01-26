import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import { onClickMultiple } from 'lib/utils/imageEditor';

export default function CreatePhoto({ edit }) {
  const { setImages } = useDailyCreate();

  const onPressAdd = () => {
    if (!edit) onClickMultiple(setImages);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressAdd} style={[style.flexRow, styles.touchContainer]}>
        <Icon style={styles.iconStyle} source={require('public/icons/daily-create-photo.png')} />
        <Text style={styles.addText}>사진 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: 17 * SCALE_HEIGHT,
    height: 86 * SCALE_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      height: -1 * SCALE_WIDTH,
      width: 0,
    },
    backgroundColor: '#fff',
    shadowRadius: 2 * SCALE_WIDTH,
    shadowOpacity: 0.1,
  },
  touchContainer: {
    marginLeft: 18 * SCALE_WIDTH,
  },
  iconStyle: {
    width: 24 * SCALE_WIDTH,
    height: 24 * SCALE_WIDTH,
  },
  addText: {
    color: MAIN_COLOR,
    fontSize: FS(14),
    marginLeft: 7 * SCALE_WIDTH,
  },
});
