import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import style from 'constants/styles';
import Timer from 'components/Timer';

export default function Information({ information }) {
  const { createdTime, postUserId, title, image } = information;

  return (
    <View style={[styles.container, style.flexRow]}>
      <Image source={{ uri: image }} style={styles.img} />
      <View>
        <Text>{title}</Text>
        <Text>참여자 {postUserId.length}명</Text>
        <Timer time={createdTime} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  img: {
    width: 150,
    height: 150,
  },
});
