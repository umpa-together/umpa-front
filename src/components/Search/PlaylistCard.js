import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import style from 'constants/styles';

export default function PlaylistCard({ info }) {
  const { _id: id, image, title, songs } = info;
  const { name, artistName } = songs[0].attributes;

  return (
    <TouchableOpacity style={[styles.container, style.flexRow]}>
      <Image source={{ uri: image }} style={styles.img} />
      <View>
        <Text>{title}</Text>
        <Text>
          대표곡 {name}-{artistName} 외 {songs.length}곡
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  img: {
    width: 50,
    height: 50,
  },
});
