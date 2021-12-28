/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import CreateButton from './MyPage/CreateButton';
import PlaylistCard from '../PlaylistCard';

export default function PlaylistResult({ data }) {
  return (
    <View>
      <CreateButton opt="playlist" buttonStyle={styles.buttonbox} />
      {data.map((item) => {
        return <PlaylistCard key={item._id} data={item} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonbox: {
    width: 85 * SCALE_WIDTH,
    height: 85 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
