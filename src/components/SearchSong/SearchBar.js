import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSearch } from 'providers/search';

export default function SearchBar() {
  const { onChangeText, onSearchKeyword, text } = useSearch();

  return (
    <View style={styles.container}>
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
  textInput: {
    width: '80%',
  },
});
