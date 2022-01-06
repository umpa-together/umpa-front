import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';

export default function SelectedText({ textcontent }) {
  const [more, setMore] = useState(false);
  const moreStyle = !more && styles.notMore;
  const buttonTitle = more ? '접기' : '더보기';
  const onPressMore = () => {
    setMore(!more);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.content, moreStyle]}>{textcontent}</Text>
      <Button title={buttonTitle} onPress={onPressMore} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5 * SCALE_WIDTH,
    justifyContent: 'flex-start',
  },
  content: {
    fontSize: FS(14),
    fontWeight: '500',
    lineHeight: 24 * SCALE_HEIGHT,
  },
  notMore: {
    maxHeight: 90,
    overflow: 'hidden',
  },
});
