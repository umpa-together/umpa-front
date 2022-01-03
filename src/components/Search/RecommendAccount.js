import React, { useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import UserCard from 'components/Search/UserCard';

export default function RecommendAcocunt() {
  const { state } = useContext(MainContentsContext);

  return (
    <View>
      <Text>계정</Text>
      <FlatList
        data={state.mainDJ}
        keyExtractor={(user) => user._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <UserCard user={item} />;
        }}
      />
    </View>
  );
}
