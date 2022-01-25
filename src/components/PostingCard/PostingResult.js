import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import PostingCard from 'components/PostingCard';
import DailyView from 'components/DailyView';
import { Provider as AddedProvider } from 'context/Added';

export default function PostingResult({ data, opt }) {
  return (
    <View style={styles.container}>
      {data.map((item) => {
        return opt === 'daily' ? (
          <AddedProvider key={item._id}>
            <DailyView isSelected info={item} />
          </AddedProvider>
        ) : (
          <PostingCard key={item._id} item={item} opt={opt} />
        );
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
