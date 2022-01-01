import React from 'react';
import { View } from 'react-native';
import SearchBar from 'components/MainContents/SearchBar';
import style from 'constants/styles';
import SearchProvider from 'providers/search';

export default function SearchDetail() {
  return (
    <View style={style.background}>
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    </View>
  );
}
