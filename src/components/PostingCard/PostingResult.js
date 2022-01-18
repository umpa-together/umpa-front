import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import PostingCard from 'components/PostingCard';

export default function PostingResult({ data, opt }) {
  return (
    <View style={styles.container}>
      {data.map((item) => {
        return <PostingCard key={data._id} item={item} opt={opt} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 23 * SCALE_HEIGHT,
  },
});
