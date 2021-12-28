import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function PostingInfo({ posting, follower, follwing }) {
  return (
    <View style={[style.flexRow, style.spaceEven]}>
      <View style={styles.elementcontainer}>
        <Text>{posting}</Text>
        <Text>총 게시글</Text>
      </View>
      <View style={styles.elementcontainer}>
        <Text>{follower.length}</Text>
        <Text>팔로워</Text>
      </View>
      <View style={styles.elementcontainer}>
        <Text>{follwing.length}</Text>
        <Text>팔로잉</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  elementcontainer: {
    width: 80 * SCALE_WIDTH,
    height: 80 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    alignItems: 'center',
  },
});
