import React, { useCallback } from 'react';
import { View, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_3 } from 'constants/colors';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import { onClickMultiple } from 'lib/utils/imageEditor';
import { useModal } from 'providers/modal';
import Text from 'components/Text';
import { useKeyboard } from 'providers/keyboard';
import { useFocusEffect } from '@react-navigation/native';

export default function CreatePhoto({ edit, setValidityMsg }) {
  const { images, setImages } = useDailyCreate();
  const imageCheck = images.length > 0;
  const { onValidityModal } = useModal();
  const onPressAdd = () => {
    if (!edit && !imageCheck) onClickMultiple(setImages);
    if (edit) {
      setValidityMsg('※ 데일리 편집은 사진 수정이 불가능합니다.');
      onValidityModal();
    } else if (imageCheck) {
      setValidityMsg('※ 현재 사진 전체 삭제 후, 사진 추가가 가능합니다.');
      onValidityModal();
    }
    Keyboard.dismiss();
  };
  const { keyboardHeight, onKeyboardDidShow, onKeyboardDidHide, keyboardShowOpt, keyboardHideOpt } =
    useKeyboard();

  const keyboardStyle = {
    bottom: keyboardHeight,
  };

  useFocusEffect(
    useCallback(() => {
      const showSubscription = Keyboard.addListener(keyboardShowOpt, onKeyboardDidShow);
      const hideSubscription = Keyboard.addListener(keyboardHideOpt, onKeyboardDidHide);

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []),
  );

  const onPressDown = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={[styles.container, keyboardStyle]}>
      <View style={[style.flexRow, styles.touchContainer]}>
        <TouchableOpacity onPress={onPressAdd} style={style.flexRow}>
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
        {keyboardHeight !== 0 && (
          <TouchableOpacity onPress={onPressDown}>
            <Text style={styles.keyboardText}>내리기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 17 * SCALE_HEIGHT,
    height: 85 * SCALE_HEIGHT,
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
    paddingHorizontal: 18 * SCALE_WIDTH,
    justifyContent: 'space-between',
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
  keyboardText: {
    fontSize: FS(14),
    color: MAIN_COLOR,
    paddingVertical: 5 * SCALE_HEIGHT,
    paddingHorizontal: 10 * SCALE_WIDTH,
  },
});
