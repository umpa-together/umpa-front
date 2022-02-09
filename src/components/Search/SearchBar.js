import React, { useCallback, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSearch } from 'providers/search';
import style from 'constants/styles';
import { Context as SearchContext } from 'context/Search';
import Icon from 'widgets/Icon';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { goBack } from 'lib/utils/navigation';

export default function SearchBar() {
  const { onChangeText, onSearchContents, text, onFocus, textInputRef, onClickDelete } =
    useSearch();
  const { getAllContents } = useContext(SearchContext);

  const onSubmitEditing = useCallback(() => {
    onSearchContents(text);
    getAllContents({ term: text });
  }, [text]);

  const onChangeInput = useCallback((input) => onChangeText(input), []);

  return (
    <View style={[style.flexRow, styles.container]}>
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
            onChangeText={onChangeInput}
            placeholderTextColor="rgb(164,164,164)"
            onSubmitEditing={onSubmitEditing}
            autoFocus
            onFocus={onFocus}
            ref={textInputRef}
          />
        </View>
        <TouchableOpacity onPress={onClickDelete}>
          <Icon source={require('public/icons/search-modal-cancel.png')} style={styles.cancel} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6 * SCALE_HEIGHT,
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
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
  },
  textInput: {
    width: 220 * SCALE_WIDTH,
  },
});
