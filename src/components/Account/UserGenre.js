import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import { COLOR_3 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function UserGenre({ genre }) {
  return (
    genre !== undefined && (
      <View style={[style.flexRow, styles.genreContainer]}>
        {genre.map((item) => {
          return (
            <Text key={item} style={styles.genreText}>
              {item}
            </Text>
          );
        })}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  genreContainer: {
    marginTop: 8 * SCALE_HEIGHT,
  },
  genreText: {
    color: COLOR_3,
    marginRight: 6 * SCALE_WIDTH,
    fontSize: FS(12),
  },
});
