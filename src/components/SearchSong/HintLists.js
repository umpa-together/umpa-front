import React, { useContext, useEffect, useRef } from 'react';
import { FlatList, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import { useSearch } from 'providers/search';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1, MAIN_COLOR } from 'constants/colors';
import Text from 'components/Text';

export default function HintLists() {
  const { state } = useContext(AppleMusicContext);
  const { onSearchContents, textInputRef, text } = useSearch();
  const opacity = useRef(new Animated.Value(0)).current;

  const onClickHint = (hint) => {
    onSearchContents(hint);
    textInputRef.current.blur();
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const findKeyword = (hint) => {
    return (
      <>
        {hint.indexOf(text) === -1 ? (
          <Text style={styles.keyword}>{hint}</Text>
        ) : (
          <>
            <Text style={styles.keyword}>
              {hint.indexOf(text) !== 0 && <Text>{hint.substr(0, hint.indexOf(text))}</Text>}
              <Text style={styles.active}>{hint.substr(hint.indexOf(text), text.length)}</Text>
              {hint.substr(hint.indexOf(text) + text.length)}
            </Text>
          </>
        )}
      </>
    );
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
                {findKeyword(item)}
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
  active: {
    color: MAIN_COLOR,
  },
});
