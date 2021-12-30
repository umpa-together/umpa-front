import React from 'react';
import { View, Text } from 'react-native';
import style from 'constants/styles';

export default function Header({ title, exit }) {
  return (
    <View style={style.flexRow}>
      <Text>{title}</Text>
      {exit}
    </View>
  );
}
