import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FS, { SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_5 } from 'constants/colors';

export default function EmptyData({ icon, action, textList, customContainer }) {
  return (
    <View style={[styles.container, customContainer]}>
      {icon}
      {textList.map((item) => {
        return (
          <Text key={item} style={styles.textStyle}>
            {item}
          </Text>
        );
      })}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    fontSize: FS(13),
    color: COLOR_5,
    marginBottom: 10 * SCALE_HEIGHT,
  },
});
