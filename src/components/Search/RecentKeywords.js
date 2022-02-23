import React, { useCallback, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import { useSearch } from 'providers/search';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Divider from 'widgets/Divider';
import { COLOR_5, COLOR_3 } from 'constants/colors';
import Text from 'components/Text';

export default function RecentKeywords({ modal }) {
  const {
    state: { recentKeyword },
    getRecentKeywords,
    getAllContents,
  } = useContext(SearchContext);
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

  const keyExtractor = useCallback((_) => _._id, []);
  const renderItem = useCallback(({ item }) => {
    const { keyword } = item;
    return (
      <TouchableOpacity onPress={() => onClickKeyword(keyword)} key={keyword}>
        <Text style={styles.keyword}>{keyword}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>최근 검색어</Text>
      <Divider containerStyle={styles.dividerContainer} />
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={recentKeyword}
        style={styles.modalContainer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
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
    marginVertical: 8 * SCALE_HEIGHT,
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
    paddingTop: 13 * SCALE_HEIGHT,
    marginHorizontal: 0,
    marginLeft: 22 * SCALE_WIDTH,
  },
  scrollContainer: {
    paddingBottom: 20 * SCALE_HEIGHT,
  },
});
