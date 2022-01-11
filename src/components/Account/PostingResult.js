/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import PostingCard from './PostingCard';

export default function PostingResult({ data }) {
  return (
    <View style={styles.container}>
      {data.map((item) => {
        const { _id, image, content, title, time } = item;
        return <PostingCard key={_id} image={image} title={title} content={content} time={time} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16 * SCALE_WIDTH,
    marginTop: 23 * SCALE_HEIGHT,
  },
});
