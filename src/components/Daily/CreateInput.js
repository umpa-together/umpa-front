import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';

export default function CreateInput() {
  const { onChangeValue } = useDailyCreate();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        placeholder="데일리를 기록해주세요"
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => onChangeValue(text)}
        placeholderTextColor="rgb(164,164,164)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12 * SCALE_HEIGHT,
  },
  inputBox: {
    width: '100%',
    height: 455 * SCALE_HEIGHT,
    paddingHorizontal: 18 * SCALE_WIDTH,
    marginBottom: 12 * SCALE_HEIGHT,
    fontSize: FS(14),
  },
});
