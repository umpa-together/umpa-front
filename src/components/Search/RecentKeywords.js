import React, { useContext, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSearch } from 'providers/search';

export default function RecentKeywords() {
  const { state, getRecentKeywords, getAllContents } = useContext(SearchContext);
  const { onSearchKeyword, textInputRef } = useSearch();

  useEffect(() => {
    getRecentKeywords();
  }, []);

  const onClickKeyword = (keyword) => {
    onSearchKeyword(keyword);
    getAllContents({ term: keyword });
    textInputRef.current.blur();
  };

  return (
    <>
      <Text>최근 검색어</Text>
      <FlatList
        data={state.recentKeyword}
        keyExtractor={(_) => _._id}
        renderItem={({ item }) => {
          const { keyword } = item;
          return (
            <TouchableOpacity onPress={() => onClickKeyword(keyword)}>
              <Text>{keyword}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
