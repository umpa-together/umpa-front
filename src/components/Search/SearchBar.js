import React, { useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSearch } from 'providers/search';
import style from 'constants/styles';
import { Context as SearchContext } from 'context/Search';
import Icon from 'widgets/Icon';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { goBack } from 'lib/utils/navigation';

export default function SearchBar() {
  const { onChangeText, onSearchKeyword, text, onFocus, textInputRef } = useSearch();
  const { getAllContents } = useContext(SearchContext);

  const onSubmitEditing = () => {
    onSearchKeyword(text);
    getAllContents({ term: text });
  };

  const onChangeInput = (input) => {
    onChangeText(input);
  };

  return (
    <View style={style.flexRow}>
      <TouchableOpacity onPress={goBack} activeOpacity={0.9}>
        <Icon source={require('public/icons/search-back.png')} style={styles.back} />
      </TouchableOpacity>
      <View style={[style.flexRow, styles.searchBar, style.space_between]}>
        <View style={style.flexRow}>
          <Icon source={require('public/icons/search-glass.png')} style={styles.glass} />
          <TextInput
            value={text}
            style={styles.textInput}
            placeholder="검색어를 입력하세요."
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(input) => onChangeInput(input)}
            placeholderTextColor="rgb(164,164,164)"
            onSubmitEditing={onSubmitEditing}
            autoFocus
            onFocus={onFocus}
            ref={textInputRef}
          />
        </View>
        <TouchableOpacity>
          <Icon source={require('public/icons/search-cancel.png')} style={styles.cancel} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 300,
  },
  back: {
    width: 34 * SCALE_WIDTH,
    height: 34 * SCALE_WIDTH,
    marginHorizontal: 4 * SCALE_WIDTH,
  },
  searchBar: {
    width: 317 * SCALE_WIDTH,
    height: 40 * SCALE_HEIGHT,
    backgroundColor: 'rgba(99,99,99,0.09)',
    borderRadius: 10 * SCALE_HEIGHT,
  },
  glass: {
    width: 16 * SCALE_WIDTH,
    height: 16 * SCALE_WIDTH,
    marginLeft: 16 * SCALE_WIDTH,
    marginRight: 12 * SCALE_WIDTH,
  },
  cancel: {
    width: 12 * SCALE_WIDTH,
    height: 12 * SCALE_WIDTH,
    marginRight: 12 * SCALE_WIDTH,
  },
  textInput: {
    width: 220 * SCALE_WIDTH,
  },
});
