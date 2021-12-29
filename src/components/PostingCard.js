import React from 'react';
import { View, Text } from 'react-native';
import style from 'constants/styles';

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
