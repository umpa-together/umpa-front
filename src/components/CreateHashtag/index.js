import React, { useRef, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_2, MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import Text from 'components/Text';

export default function CreateHashtag({ addAction, hashtagCount, onValidityModal }) {
  const hashtagRef = useRef();

  const onPressCancle = () => {
    hashtagRef.current.clear();
  };
  onPressAdd = () => {
    if (hashtagCount >= 3) {
      onValidityModal();
      return;
    }
    if (hashtagRef.current.value !== '' && hashtagRef.current.value !== undefined) {
      addAction(hashtagRef);
    }
  };
  const onChangeHashtag = (text) => {
    hashtagRef.current.value = text;
  };
  const onChangeText = useCallback((text) => onChangeHashtag(text), []);
  return (
    <View style={[style.flexRow, styles.textInputContainer]}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholder="해시태그를 입력해주세요. (최대 9글자)"
        placeholderTextColor="#c4c4c4"
        returnKeyType="done"
        autoCapitalize="none"
        onSubmitEditing={onPressAdd}
        autoCorrect={false}
        maxLength={9}
        ref={hashtagRef}
        allowFontScaling={false}
      />
      <Text style={styles.hashtagText}>#</Text>
      <TouchableOpacity onPress={onPressCancle}>
        <Icon source={require('public/icons/search-modal-cancel.png')} style={styles.cancelIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[style.flexRow, styles.createContainer]} onPress={onPressAdd}>
        <Icon source={require('public/icons/hashtag-create.png')} style={styles.createIcon} />
        <Text style={styles.addText}>추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    paddingLeft: 16 * SCALE_WIDTH,
    paddingRight: 13 * SCALE_WIDTH,
  },
  createContainer: {
    paddingLeft: 8 * SCALE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 294 * SCALE_WIDTH,
    height: 40 * SCALE_HEIGHT,
    paddingLeft: 43 * SCALE_WIDTH,
    paddingRight: 15 * SCALE_WIDTH,
    backgroundColor: '#EEE',
    borderRadius: 7 * SCALE_HEIGHT,
  },
  hashtagText: {
    color: COLOR_2,
    fontSize: FS(18),
    position: 'absolute',
    left: 33 * SCALE_WIDTH,
  },
  cancelIcon: {
    bottom: -14 * SCALE_HEIGHT,
    right: 2 * SCALE_WIDTH,
    position: 'absolute',
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_HEIGHT,
  },
  addText: {
    fontSize: FS(14),
    color: MAIN_COLOR,
    marginLeft: 8 * SCALE_WIDTH,
  },
  createIcon: {
    width: 11 * SCALE_WIDTH,
    height: 11 * SCALE_WIDTH,
  },
});
