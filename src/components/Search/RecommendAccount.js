import React, { useCallback, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import UserCard from 'components/Search/UserCard';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';

export default function RecommendAcocunt() {
  const { state } = useContext(MainContentsContext);
  const keyExtractor = useCallback((_) => _._id, []);
  const renderItem = useCallback(({ item }) => <UserCard user={item} />);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>추천 계정</Text>
      <FlatList
        data={state.mainDJ}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        renderItem={renderItem}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 41 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(14),
    color: COLOR_1,
    marginLeft: 16 * SCALE_WIDTH,
  },
  flatList: {
    paddingHorizontal: 16 * SCALE_WIDTH,
    paddingVertical: 15 * SCALE_HEIGHT,
  },
});
