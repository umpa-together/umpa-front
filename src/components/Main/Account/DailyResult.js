/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import CreateButton from './MyPage/CreateButton';
import DailyCard from '../DailyCard';

export default function DailyResult({ data }) {
  return (
    <View>
      <CreateButton opt="daily" buttonStyle={styles.buttonbox} />
      {data.map((item) => {
        return <DailyCard key={item._id} data={item} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonbox: {
    width: 60 * SCALE_WIDTH,
    height: 60 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
