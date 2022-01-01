import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';

export default function CreateHashtag() {
  const { hashtags, onClickAddHashtag, onClickDeleteHashtag } = usePlaylistCreate();
  const [text, setText] = useState('');

  return (
    <View>
      <Text>createhastag</Text>
      <TextInput
        value={text}
        onChangeText={(txt) => setText(txt)}
        placeholder="해시태그를 입력해주세요. (최대 9글자)"
        placeholderTextColor="#c4c4c4"
        autoCapitalize="none"
        onSubmitEditing={() => onClickAddHashtag(text, setText)}
        autoCorrect={false}
        maxLength={9}
      />
      <FlatList
        data={hashtags}
        keyExtractor={(el) => el}
        horizontal
        renderItem={({ item }) => (
          <View>
            <Text>{` ${item}`}</Text>
            <TouchableOpacity onPress={() => onClickDeleteHashtag(item)}>
              <Text>지우기</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
