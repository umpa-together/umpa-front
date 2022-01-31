import React, { useContext, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSearch } from 'providers/search';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Divider from 'widgets/Divider';
import { COLOR_5, COLOR_3 } from 'constants/colors';

export default function RecentKeywords({ modal }) {
  const { state, getRecentKeywords, getAllContents } = useContext(SearchContext);
  const { onSearchContents, onSearchKeyword, textInputRef } = useSearch();

  useEffect(() => {
    getRecentKeywords();
  }, []);
  const onClickKeyword = (keyword) => {
    if (modal) {
      onSearchKeyword(keyword);
    } else {
      onSearchContents(keyword);
      getAllContents({ term: keyword });
    }

    textInputRef.current.blur();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>최근 검색어</Text>
      <Divider containerStyle={styles.dividerContainer} />
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.modalContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 21 * SCALE_HEIGHT,
    flex: 1,
  },
  text: {
    color: COLOR_5,
    fontSize: FS(14),
    marginLeft: 16 * SCALE_WIDTH,
  },
  keyword: {
    marginBottom: 16 * SCALE_HEIGHT,
    fontSize: FS(16),
    color: COLOR_3,
  },
  dividerContainer: {
    marginTop: 15.5 * SCALE_HEIGHT,
    height: 1 * SCALE_HEIGHT,
    backgroundColor: '#DBDBDB',
  },
  modalContainer: {
    flex: 1,
    paddingTop: 21 * SCALE_HEIGHT,
    marginHorizontal: 0,
    marginLeft: 22 * SCALE_WIDTH,
  },
  scrollContainer: {
    paddingBottom: 20 * SCALE_HEIGHT,
  },
});
