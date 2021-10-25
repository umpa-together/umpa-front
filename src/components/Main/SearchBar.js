import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, Keyboard, TouchableOpacity, Image } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import StatusBarHeight from 'components/StatusBarHeight';
import { useSearch } from 'providers/search';
import { tmpWidth } from 'components/FontNormalize';
import { goBack } from 'navigationRef';
import SvgUri from 'react-native-svg-uri';

const SearchBar = () => {
  const { searchsong, initHint } = useContext(SearchContext);
  const { initPlaylist } = useContext(SearchPlaylistContext);
  const { textRef, setIsHint, searchOption, setText, setIsResultClick } = useSearch();

  const onChangeText = (text) => {
    textRef.current.value = text;
    setText(text);
  };

  const onClickCancel = () => {
    initHint();
    initPlaylist();
    setIsResultClick(false);
    setIsHint(true);
    textRef.current.clear();
    Keyboard.dismiss();
  };

  const onFocus = () => {
    setIsHint(true);
  };

  const onChange = () => {
    setIsHint(true);
  };

  const onSubmitEditing = () => {
    if (searchOption === 'Song') {
      searchsong({ songname: textRef.current.value });
      setIsHint(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backIcon}>
        <SvgUri source={require('assets/icons/back.svg')} />
      </TouchableOpacity>
      <View style={styles.inputbox}>
        <Image source={require('assets/icons/mainSearch.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.textInput}
          ref={textRef}
          onChangeText={(text) => onChangeText(text)}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          onFocus={onFocus}
          onChange={onChange}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor="#000"
        />
        <TouchableOpacity onPress={onClickCancel} style={styles.cancelIcon}>
          <SvgUri width={20} height={20} source={require('assets/icons/searchExit.svg')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: (44 + StatusBarHeight) * tmpWidth,
    paddingTop: StatusBarHeight * tmpWidth,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 10 * tmpWidth,
  },
  backIcon: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    marginLeft: 3 * tmpWidth,
  },
  inputbox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 313 * tmpWidth,
    height: 44 * tmpWidth,
    borderRadius: 10 * tmpWidth,
    borderWidth: 1.5 * tmpWidth,
    borderColor: '#8bc0ff',
    backgroundColor: '#fff',
  },
  searchIcon: {
    width: 30 * tmpWidth,
    height: 30 * tmpWidth,
    marginLeft: 5 * tmpWidth,
    marginRight: 5 * tmpWidth,
  },
  textInput: {
    fontSize: 14 * tmpWidth,
    width: 230 * tmpWidth,
  },
  cancelIcon: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;
