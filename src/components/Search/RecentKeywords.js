import React, { useContext, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSearch } from 'providers/search';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';

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
    <ScrollView style={styles.container}>
      <Text>최근 검색어</Text>
      {state.recentKeyword &&
        state.recentKeyword.map((item) => {
          const { keyword } = item;
          return (
            <TouchableOpacity onPress={() => onClickKeyword(keyword)} key={keyword}>
              <Text style={styles.keyword}>{keyword}</Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22 * SCALE_WIDTH,
  },
  keyword: {
    marginVertical: 14 * SCALE_HEIGHT,
  },
});
