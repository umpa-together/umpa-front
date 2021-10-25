import React from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';

const DailyImage = ({ image }) => (
  <FlatList
    data={image}
    keyExtractor={(img) => img}
    horizontal
    showsHorizontalScrollIndicator={false}
    bounces={false}
    snapToInterval={375 * tmpWidth}
    decelerationRate={0}
    scrollEventThrottle={16}
    renderItem={({ item }) => <Image source={{ uri: item }} style={styles.img} />}
  />
);

const styles = StyleSheet.create({
  img: {
    marginTop: 10 * tmpWidth,
    width: 375 * tmpWidth,
    height: 375 * tmpWidth,
  },
});

export default DailyImage;
