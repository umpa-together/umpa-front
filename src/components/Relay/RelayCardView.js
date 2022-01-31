import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import { push } from 'lib/utils/navigation';

export default function RelayCardView({ relay }) {
  const { _id: id, image, title, postUserId } = relay;

  const onClickRelayPlaylist = () => {
    push('SelectedRelay', { id });
  };

  return (
    <TouchableOpacity
      style={[stlyes.container, style.flexRow]}
      activeOpacity={0.9}
      onPress={onClickRelayPlaylist}
    >
      <Image source={{ uri: image }} style={stlyes.img} />
      <View>
        <Text>{title}</Text>
        <Text>도전자 {postUserId.length}명</Text>
      </View>
    </TouchableOpacity>
  );
}

const stlyes = StyleSheet.create({
  container: {
    width: 334,
    height: 131,
    borderWidth: 1,
  },
  img: {
    width: 92,
    height: 92,
  },
});
