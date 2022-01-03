import React, { useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSearch } from 'providers/search';
import style from 'constants/styles';
import { Context as SearchContext } from 'context/Search';

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
      <View style={styles.back} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 300,
  },
  back: {
    width: 40,
    height: 40,
    borderWidth: 1,
  },
  textInput: {
    width: '80%',
  },
});
