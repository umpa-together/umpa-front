import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import UserCard from 'components/Search/UserCard';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';

export default function RecommendAcocunt() {
  const { state } = useContext(MainContentsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>추천 계정</Text>
      <FlatList
        data={state.mainDJ}
        keyExtractor={(user) => user._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }) => {
          return <UserCard user={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 34 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(16),
    color: COLOR_1,
    marginLeft: 16 * SCALE_WIDTH,
  },
  flatList: {
    paddingHorizontal: 11.5 * SCALE_WIDTH,
    paddingVertical: 12 * SCALE_HEIGHT,
  },
});
