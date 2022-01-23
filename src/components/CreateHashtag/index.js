import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_2, MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import Icon from 'widgets/Icon';

export default function CreateHashtag({ addAction, hashtagCount, onPlayValidityModal }) {
  const hashtagRef = useRef();

  const onPressCancle = () => {
    hashtagRef.current.clear();
  };
  onPressAdd = () => {
    if (hashtagCount >= 3) {
      onPlayValidityModal();
      return;
    }
    if (hashtagRef.current.value !== '') {
      addAction(hashtagRef);
    }
  };

  const onChangeHashtag = (text) => {
    hashtagRef.current.value = text;
  };

  return (
    <View style={[style.flexRow, styles.textInputContainer]}>
      <TextInput
        style={styles.textInput}
        onChangeText={(txt) => onChangeHashtag(txt)}
        placeholder="해시태그를 입력해주세요. (최대 9글자)"
        placeholderTextColor="#c4c4c4"
        autoCapitalize="none"
        onSubmitEditing={onPressAdd}
        autoCorrect={false}
        maxLength={9}
        ref={hashtagRef}
      />
      <Text style={styles.hashtagText}>#</Text>
      <TouchableOpacity onPress={onPressCancle}>
        <Icon source={require('public/icons/search-modal-cancel.png')} style={styles.cancelIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAdd}>
        <Text style={styles.addText}>+ 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    paddingLeft: 16 * SCALE_WIDTH,
    paddingRight: 13 * SCALE_WIDTH,
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
});
