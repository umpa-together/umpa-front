import React, { memo, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';
import Text from 'components/Text';

export default memo(function SelectedHashtag({ hashtag, customContainer }) {
  const keyExtractor = useCallback((_) => _, []);
  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.hashtagBox}>
        <Text style={styles.hashtagsStyle}>{`# ${item}`}</Text>
      </View>
    ),
    [],
  );
  return (
    <FlatList
      data={hashtag}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={[styles.container, customContainer]}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 18 * SCALE_HEIGHT,
    paddingBottom: 16 * SCALE_HEIGHT,
    paddingHorizontal: 26 * SCALE_WIDTH,
  },
  hashtagBox: {
    borderRadius: 43 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: COLOR_3,
    marginRight: 10 * SCALE_WIDTH,
    alignSelf: 'flex-start',
  },
  hashtagsStyle: {
    paddingLeft: 8 * SCALE_WIDTH,
    paddingRight: 9 * SCALE_WIDTH,
    paddingVertical: 6 * SCALE_HEIGHT,
    fontSize: FS(12),
    color: COLOR_3,
  },
});
