import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_2, MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import Icon from 'widgets/Icon';

export default function CreateHashtag({ addAction, hashtagCount, onPlayValidityModal }) {
  const [text, setText] = useState('');

  const onPressCancle = () => {
    setText('');
  };
  onPressAdd = () => {
    if (hashtagCount >= 3) {
      onPlayValidityModal();
      return;
    }
    if (text !== '') {
      addAction(text, setText);
    }
  };

  return (
    <View style={[style.flexRow, styles.textInputContainer]}>
      <TextInput
        value={text}
        style={styles.textInput}
        onChangeText={(txt) => setText(txt)}
        placeholder="해시태그를 입력해주세요. (최대 9글자)"
        placeholderTextColor="#c4c4c4"
        autoCapitalize="none"
        onSubmitEditing={onPressAdd}
        autoCorrect={false}
        maxLength={9}
      />
      <Text style={styles.hashtagText}>#</Text>
      {text.length > 0 && (
        <TouchableOpacity onPress={onPressCancle} style={styles.cancle}>
          <Icon
            source={require('public/icons/search-modal-cancel.png')}
            style={styles.cancleIcon}
          />
        </TouchableOpacity>
      )}
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
  cancle: {
    position: 'absolute',
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    bottom: 0 * SCALE_HEIGHT,
    right: 65 * SCALE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancleIcon: {
    width: 12 * SCALE_WIDTH,
    height: 14 * SCALE_HEIGHT,
  },
  addText: {
    fontSize: FS(14),
    color: MAIN_COLOR,
    marginLeft: 8 * SCALE_WIDTH,
  },
});
