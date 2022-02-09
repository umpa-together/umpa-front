import React from 'react';
import { View, StyleSheet } from 'react-native';
import style from 'constants/styles';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import Text from 'components/Text';

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
    left: -4 * SCALE_WIDTH,
  },
});
