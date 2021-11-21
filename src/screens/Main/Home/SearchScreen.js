import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from 'components/Main/SearchBar';
import SearchProvider from 'providers/search';
import SearchOptions from 'components/Main/SearchOptions';
import SearchView from 'components/Main/SearchView';

const SearchScreen = () => (
  <SearchProvider>
    <View style={styles.container}>
      <SearchBar />
      <SearchOptions />
      <SearchView />
    </View>
  </SearchProvider>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
export default SearchScreen;
