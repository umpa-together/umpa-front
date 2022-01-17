import React, { useContext, useEffect, useRef } from 'react';
import { Text, FlatList, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import { useSearch } from 'providers/search';
import { Context as SearchContext } from 'context/Search';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';

export default function HintLists() {
  const { state } = useContext(AppleMusicContext);
  const { onSearchKeyword, textInputRef } = useSearch();
  const { getAllContents } = useContext(SearchContext);
  const opacity = useRef(new Animated.Value(0)).current;

  const onClickHint = (hint) => {
    onSearchKeyword(hint);
    getAllContents({ term: hint });
    textInputRef.current.blur();
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {state.hint && (
        <FlatList
          data={state.hint}
          keyExtractor={(hint) => hint}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => onClickHint(item)}>
                <Text style={styles.keyword}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8 * SCALE_HEIGHT,
    marginHorizontal: 22 * SCALE_WIDTH,
    flex: 1,
  },
  keyword: {
    marginVertical: 14 * SCALE_HEIGHT,
    fontSize: FS(16),
    color: COLOR_1,
  },
});
