import React from 'react';
import { View, StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_5 } from 'constants/colors';
import Icon from 'widgets/Icon';
import Text from 'components/Text';

export default function EmptyData({ icon, action, textList, customContainer }) {
  return (
    <View style={[styles.container, customContainer]}>
      {icon && <Icon style={styles.icon} source={require('public/icons/account-empty-data.png')} />}
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
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    marginBottom: 21.5 * SCALE_HEIGHT,
  },
});
