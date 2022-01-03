import React from 'react';
import { View } from 'react-native';
import SearchBar from 'components/Search/SearchBar';
import style from 'constants/styles';
import SearchProvider from 'providers/search';
import { Provider } from 'context/Search';
import SearchLists from 'components/Search/SearchLists';

export default function SearchDetail() {
  return (
    <View style={style.background}>
      <Provider>
        <SearchProvider>
          <SearchBar />
          <SearchLists />
        </SearchProvider>
      </Provider>
    </View>
  );
}
