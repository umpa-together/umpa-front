import React from 'react';
import { View, Text } from 'react-native';

export default function UploadText({ title, content }) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{content}</Text>
    </View>
  );
}
