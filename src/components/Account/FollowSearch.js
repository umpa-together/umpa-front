import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import { COLOR_3 } from 'constants/colors';

export default function FollowSearch({ text, setText, opt }) {
  const onChangeText = useCallback((txt) => setText(txt), []);
  const onPressCancle = () => {
    setText('');
  };
  return (
    <View style={styles.container}>
      <View style={[styles.textContainer, style.flexRow, style.space_between]}>
        <View style={style.flexRow}>
          <Icon
            source={require('public/icons/search-modal-textinput.png')}
            style={styles.searchIcon}
          />
          <TextInput
            value={text}
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={`${opt} 검색`}
            placeholderTextColor={COLOR_3}
            onChangeText={onChangeText}
            allowFontScaling={false}
          />
        </View>
        {text.length > 0 && (
          <TouchableOpacity onPress={onPressCancle}>
            <Icon
              source={require('public/icons/search-modal-cancel.png')}
              style={styles.cancelIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16 * SCALE_WIDTH,
    marginBottom: 8 * SCALE_HEIGHT,
  },
  searchIcon: {
    width: 18 * SCALE_WIDTH,
    height: 18 * SCALE_WIDTH,
    marginRight: 10 * SCALE_WIDTH,
  },
  textContainer: {
    width: 343 * SCALE_WIDTH,
    height: 40 * SCALE_HEIGHT,
    paddingLeft: 15 * SCALE_WIDTH,
    paddingRight: 15 * SCALE_WIDTH,
    backgroundColor: '#EEE',
    borderRadius: 7 * SCALE_HEIGHT,
  },
  textInput: {
    width: 250 * SCALE_WIDTH,
  },
  cancelIcon: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_HEIGHT,
  },
});
