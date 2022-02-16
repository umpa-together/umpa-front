import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { COLOR_3 } from 'constants/colors';
import Text from 'components/Text';

export default function HashtagView() {
  const {
    state: {
      selectedRelay: {
        playlist: { hashtags },
      },
    },
  } = useContext(RelayContext);
  return (
    <View style={[style.flexRow, styles.container]}>
      {hashtags.map((hashtag) => {
        return (
          <View key={hashtag} style={styles.box}>
            <Text style={styles.text}>#{hashtag}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21 * SCALE_WIDTH,
    marginTop: 18 * SCALE_HEIGHT,
  },
  box: {
    paddingHorizontal: 10 * SCALE_WIDTH,
    paddingVertical: 6 * SCALE_HEIGHT,
    borderRadius: 43 * SCALE_HEIGHT,
    borderColor: COLOR_3,
    borderWidth: 1 * SCALE_HEIGHT,
    marginRight: 10 * SCALE_WIDTH,
  },
  text: {
    color: COLOR_3,
    fontSize: FS(12),
  },
});
