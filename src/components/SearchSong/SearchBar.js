import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSearch } from 'providers/search';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import { COLOR_3 } from 'constants/colors';
import style from 'constants/styles';

export default function SearchBar() {
  const {
    onChangeText,
    onSearchKeyword,
    text,
    textInputRef,
    setText,
    setIsResultClick,
    searching,
    setSearching,
    onFocus,
  } = useSearch();
  const onPressCancle = () => {
    setText('');
    setIsResultClick(false);
    setSearching(false);
    textInputRef.current.blur();
  };
  return (
    <View style={[styles.container, style.flexRow, style.space_between]}>
      <View style={style.flexRow}>
        <Icon
          source={require('public/icons/search-modal-textinput.png')}
          style={styles.searchIcon}
        />
        <TextInput
          ref={textInputRef}
          value={text}
          style={styles.textInput}
          onFocus={onFocus}
          placeholder="노래 및 아티스트 입력"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(input) => onChangeText(input)}
          placeholderTextColor={COLOR_3}
          onSubmitEditing={() => onSearchKeyword(text)}
        />
      </View>
      {(searching || text.length > 0) && (
        <TouchableOpacity onPress={onPressCancle}>
          <Icon
            source={require('public/icons/search-modal-cancel.png')}
            style={styles.cancelIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16 * SCALE_WIDTH,
    width: 343 * SCALE_WIDTH,
    paddingVertical: 5 * SCALE_HEIGHT,
    minHeight: 40 * SCALE_HEIGHT,
    paddingLeft: 15 * SCALE_WIDTH,
    paddingRight: 15 * SCALE_WIDTH,
    backgroundColor: '#EEE',
    borderRadius: 7 * SCALE_HEIGHT,
  },
  textInput: {
    width: 250 * SCALE_WIDTH,
  },
  searchIcon: {
    width: 18 * SCALE_WIDTH,
    height: 18 * SCALE_WIDTH,
    marginRight: 10 * SCALE_WIDTH,
  },
  cancelIcon: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_HEIGHT,
  },
});
