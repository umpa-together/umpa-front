import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { navigate } from 'lib/utils/navigation';
import style from 'constants/styles';
import Timer from 'components/Timer';

export default function CurrentSection({ relay }) {
  const { createdTime, postUserId, title, _id, image, representSong } = relay;
  const { attributes } = representSong;
  const { artistName, name } = attributes;

  const onClickRelay = (id) => {
    navigate('SelectedRelay', { id });
  };

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={[style.flexRow, style.space_between]}>
        <View style={style.flexRow}>
          <Text>첫 곡</Text>
          <Text>
            {name}({artistName})
          </Text>
        </View>
        <Timer time={createdTime} />
      </View>
      <Image source={{ uri: image }} style={styles.img} />
      <TouchableOpacity activeOpacity={0.5} onPress={() => onClickRelay(_id)}>
        <Text>{title}</Text>
        <Text>플레이리스트에 어울리는 다음 곡은?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  img: {
    height: 250,
    borderWidth: 1,
  },
});
