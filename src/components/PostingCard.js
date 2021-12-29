import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function PostingCard({ image, title, content, time }) {
  return (
    <View style={style.flexRow}>
      {image}
      <View>
        <Text>{title}</Text>
        <Text>{content}</Text>
        <Text>{time}</Text>
      </View>
    </View>
  );
}
