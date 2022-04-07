import React, { useCallback, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import { useSearch } from 'providers/search';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Divider from 'widgets/Divider';
import { COLOR_5, COLOR_3 } from 'constants/colors';
import Text from 'components/Text';
import Icon from 'widgets/Icon';
import style from 'constants/styles';

export default function RecentKeywords({ modal }) {
  const {
    state: { recentKeyword },
    getRecentKeywords,
    getAllContents,
    deleteRecentKeyword,
    deleteRecentKeywordAll,
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
    const { keyword, _id } = item;
    return (
      <View style={[styles.keywordContainer, style.flexRow, style.space_between]}>
        <TouchableOpacity onPress={() => onClickKeyword(keyword)} key={keyword}>
          <Text style={styles.keyword}>{keyword}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteRecentKeyword({ id: _id })}>
          <Icon source={require('public/icons/keyword-delete.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>최근 검색어</Text>
      <TouchableOpacity onPress={deleteRecentKeywordAll} style={styles.deleteAllButton}>
        <Text style={styles.deleteAllText}>전체 삭제</Text>
      </TouchableOpacity>
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
  keywordContainer: {
    paddingRight: 12 * SCALE_WIDTH,
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
  icon: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
  },
  deleteAllButton: {
    position: 'absolute',
    right: 16 * SCALE_WIDTH,
    top: 25 * SCALE_HEIGHT,
  },
  deleteAllText: {
    fontSize: FS(12),
    color: COLOR_5,
  },
});
