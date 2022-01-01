import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSearch } from 'providers/search';
import style from 'constants/styles';

export default function SearchBar() {
  const { onChangeText, onSearchKeyword, text } = useSearch();

  return (
    <View style={style.flexRow}>
      <View style={styles.back} />
      <TextInput
        style={styles.textInput}
        placeholder="검색어를 입력하세요."
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(input) => onChangeText(input)}
        placeholderTextColor="rgb(164,164,164)"
        onSubmitEditing={() => onSearchKeyword(text)}
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
