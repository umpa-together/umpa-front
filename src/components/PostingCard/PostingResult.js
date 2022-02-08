import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import PostingCard from 'components/PostingCard';
import DailyView from 'components/DailyView';
import EmptyPosting from './EmptyPosting';

export default function PostingResult({ data, opt, my }) {
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        data.map((item) => {
          return opt === 'daily' ? (
            <DailyView key={item._id} titleCustom={styles.wideTitle} isSelected info={item} />
          ) : (
            <PostingCard key={item._id} item={item} opt={opt} />
          );
        })
      ) : (
        <EmptyPosting my={my} opt={opt} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 23 * SCALE_HEIGHT,
  },
  wideTitle: {
    width: 270 * SCALE_WIDTH,
  },
});
