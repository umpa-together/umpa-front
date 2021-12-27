/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { useSearch } from 'providers/search';
import SongHint from './SongHint';
import HashtagHint from './HashtagHint';
import DJHint from './DJHint';
import SongResult from './SongResult';
import SearchResult from './SearchResult';
import HashtagResult from './HashtagResult';

const SearchView = () => {
  const { searchOption, isHint, isResultClick } = useSearch();
  const { state } = useContext(SearchPlaylistContext);

  return (
    <View style={styles.container}>
      {searchOption === 'Song' ? (
        <>{isHint ? <SongHint /> : <>{isResultClick ? <SearchResult /> : <SongResult />}</>}</>
      ) : searchOption === 'Hashtag' ? (
        <>
          {isHint ? (
            <HashtagHint />
          ) : (
            <HashtagResult playlist={state.playList} daily={state.daily} />
          )}
        </>
      ) : (
        <DJHint />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchView;
