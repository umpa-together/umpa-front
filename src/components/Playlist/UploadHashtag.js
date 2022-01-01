import React from 'react';
import { Text, FlatList } from 'react-native';

export default function UploadHashtag({ hashtags }) {
  return (
    <FlatList
      data={hashtags}
      keyExtractor={(el) => el}
      horizontal
      renderItem={({ item }) => <Text>{` ${item}`}</Text>}
    />
  );
}
