import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import style from 'constants/styles';
import { SCALE_WIDTH } from 'lib/utils/normalize';

export default function MoveText({ container, text, isMove, isExplicit, textStyle }) {
  return (
    <View style={container}>
      <View style={[style.flexRow, styles.center]}>
        {isExplicit && <View style={styles.explicit} />}
        {isMove ? (
          <TextTicker duration={7000} bounce={false} marqueeDelay={1000} style={textStyle}>
            {text}
          </TextTicker>
        ) : (
          <Text style={textStyle} numberOfLines={1}>
            {text}
          </Text>
        )}
      </View>
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
  center: {
    justifyContent: 'center',
  },
});
