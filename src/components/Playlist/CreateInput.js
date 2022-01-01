import React from 'react';
import { View, TextInput } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';

export default function CreateInput() {
  const { onChangeValue } = usePlaylistCreate();

  return (
    <View>
      <TextInput
        placeholder="제목을 입력하세요."
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => onChangeValue('title', text)}
        placeholderTextColor="rgb(164,164,164)"
      />
      <TextInput
        placeholder="내용을 입력하세요."
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => onChangeValue('content', text)}
        placeholderTextColor="rgb(164,164,164)"
      />
    </View>
  );
}
