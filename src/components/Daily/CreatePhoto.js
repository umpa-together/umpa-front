import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_3 } from 'constants/colors';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import { onClickMultiple } from 'lib/utils/imageEditor';
import { useModal } from 'providers/modal';

export default function CreatePhoto({ edit, setValidityMsg }) {
  const { images, setImages } = useDailyCreate();
  const imageCheck = images.length > 0;
  const { onValidityModal } = useModal();
  const onPressAdd = () => {
    if (!edit && !imageCheck) onClickMultiple(setImages);
    if (imageCheck) {
      setValidityMsg('※ 현재 사진 전체 삭제 후, 사진 추가가 가능합니다.');
      onValidityModal();
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressAdd} style={[style.flexRow, styles.touchContainer]}>
        <Icon
          style={styles.iconStyle}
          source={
            imageCheck
              ? require('public/icons/daily-create-photo-disabled.png')
              : require('public/icons/daily-create-photo.png')
          }
        />
        <Text style={[styles.addText, imageCheck && styles.notAddText]}>사진 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 17 * SCALE_HEIGHT,
    height: 105 * SCALE_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      height: -1 * SCALE_WIDTH,
      width: 0,
    },
    backgroundColor: '#fff',
    shadowRadius: 2 * SCALE_WIDTH,
    shadowOpacity: 0.1,
    elevation: 10,
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
  notAddText: {
    color: COLOR_3,
  },
});
