import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_3 } from 'constants/colors';
import Text from 'components/Text';

export default function CreateInput() {
  const { onChangeValue, information } = usePlaylistCreate();
  const sectionLists = [
    { title: '플레이리스트 제목', key: 'title', placeholder: '제목을 입력하세요.' },
    { title: '소개글', key: 'content', placeholder: '내용을 입력하세요.' },
  ];

  return (
    <View style={styles.container}>
      {sectionLists.map((item) => {
        const { title, key, placeholder } = item;
        return (
          <View key={key}>
            <Text style={styles.inputTitle}>
              {title}
              <Text style={styles.required}>{key === 'title' && ` *`}</Text>
            </Text>
            <TextInput
              value={information[key]}
              style={styles.inputBox}
              placeholder={placeholder}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => onChangeValue(key, text)}
              placeholderTextColor="rgb(164,164,164)"
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32 * SCALE_HEIGHT,
  },
  inputBox: {
    padding: 0,
    borderRadius: 6 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: '#DBDBDB',
    minHeight: 32 * SCALE_HEIGHT,
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
