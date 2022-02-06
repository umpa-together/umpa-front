import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSearch } from 'providers/search';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import { COLOR_3 } from 'constants/colors';
import style from 'constants/styles';
import FS from 'lib/utils/navigation';

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
    <View style={[styles.container, style.flexRow]}>
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
      <Icon source={require('public/icons/search-modal-textinput.png')} style={styles.searchIcon} />
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
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  textInput: {
    width: 343 * SCALE_WIDTH,
    paddingVertical: 10 * SCALE_HEIGHT,
    paddingLeft: 43 * SCALE_WIDTH,
    paddingRight: 15 * SCALE_WIDTH,
    backgroundColor: '#EEE',
    borderRadius: 7 * SCALE_HEIGHT,
    fontSize: FS(10),
  },
  searchIcon: {
    width: 18 * SCALE_WIDTH,
    height: 18 * SCALE_WIDTH,
    position: 'absolute',
    bottom: 10 * SCALE_HEIGHT,
    left: 33 * SCALE_WIDTH,
  },
  cancelIcon: {
    bottom: 5 * SCALE_HEIGHT,
    right: 2 * SCALE_WIDTH,
    position: 'absolute',
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_HEIGHT,
  },
});
