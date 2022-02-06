import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import style from 'constants/styles';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';

export default function SongTitle({ isExplicit, title, titleStyle }) {
  return (
    <View style={style.flexRow}>
      {isExplicit && (
        <Icon source={require('public/icons/19-notice.png')} style={styles.explicit} />
      )}
      <Text style={titleStyle} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  explicit: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    marginRight: 2 * SCALE_WIDTH,
  },
});
