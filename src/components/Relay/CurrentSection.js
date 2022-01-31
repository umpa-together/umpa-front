import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { navigate } from 'lib/utils/navigation';
import FastImage from 'react-native-fast-image';

export default function CurrentSection({ relay }) {
  const { title, image, representSong, _id } = relay;
  const { name } = representSong.attributes;
  const onClickRelay = (id) => {
    navigate('SelectedRelay', { id });
  };

  return (
    <TouchableOpacity onPress={() => onClickRelay(_id)} style={styles.container}>
      <FastImage source={{ uri: image }} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={style.flexRow}>
          <Text style={[styles.nameText, styles.boldText]}>첫 곡</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    paddingLeft: 14 * SCALE_WIDTH,
  },
  img: {
    width: '100%',
    height: 443 * SCALE_HEIGHT,
    position: 'absolute',
    zIndex: -1,
  },
  titleText: {
    fontSize: FS(26),
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 14 * SCALE_HEIGHT,
  },
  nameText: {
    fontSize: FS(14),
    color: '#FFF',
    marginRight: 4 * SCALE_WIDTH,
    marginBottom: 42 * SCALE_HEIGHT,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
