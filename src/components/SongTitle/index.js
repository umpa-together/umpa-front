import React from 'react';
import { View, StyleSheet } from 'react-native';
import style from 'constants/styles';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import Text from 'components/Text';

export default function SongTitle({ isExplicit, title, titleStyle }) {
  return (
    <View style={style.flexRow}>
      {isExplicit && <View style={styles.explicit} />}
      <Text style={titleStyle} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  explicit: {
    width: 12 * SCALE_WIDTH,
    height: 12 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    marginRight: 5 * SCALE_WIDTH,
  },
});
