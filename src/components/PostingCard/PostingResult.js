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
          const keyId = item._id || item.playlist._id;
          return opt === 'daily' ? (
            <DailyView key={keyId} titleCustom={styles.wideTitle} isSelected info={item} />
          ) : (
            <PostingCard key={keyId} item={item} opt={opt} />
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
