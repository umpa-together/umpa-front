import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_3 } from 'constants/colors';

export default function CreateInput() {
  const { onChangeValue } = usePlaylistCreate();

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>
        플레이리스트 제목<Text style={styles.required}>{` *`}</Text>
      </Text>
      <TextInput
        style={styles.inputBox}
        placeholder="제목을 입력하세요."
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => onChangeValue('title', text)}
        placeholderTextColor="rgb(164,164,164)"
      />
      <Text style={styles.inputTitle}>소개글</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="내용을 입력하세요."
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => onChangeValue('content', text)}
        placeholderTextColor="rgb(164,164,164)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32 * SCALE_HEIGHT,
  },
  inputBox: {
    width: 343 * SCALE_WIDTH,
    height: 38 * SCALE_HEIGHT,
    borderRadius: 6 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: '#DBDBDB',
    paddingHorizontal: 12 * SCALE_WIDTH,
    marginBottom: 28 * SCALE_HEIGHT,
    fontSize: FS(14),
  },
  inputTitle: {
    fontSize: FS(12),
    color: COLOR_3,
    marginBottom: 14 * SCALE_HEIGHT,
  },
  required: {
    color: MAIN_COLOR,
  },
});
