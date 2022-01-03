import React, { useContext, useEffect, useRef } from 'react';
import { Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import { useSearch } from 'providers/search';
import { Context as SearchContext } from 'context/Search';

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
    <Animated.View style={{ opacity, backgroundColor: '#777' }}>
      {state.hint && (
        <FlatList
          data={state.hint}
          keyExtractor={(hint) => hint}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => onClickHint(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Animated.View>
  );
}
