import { StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'widgets/Icon';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';

export default function LogoHeader() {
  return <Icon style={styles.icon} source={require('public/icons/relay-logo.png')} />;
}

const styles = StyleSheet.create({
  icon: {
    width: 110 * SCALE_WIDTH,
    height: 39 * SCALE_HEIGHT,
    position: 'absolute',
    zIndex: 3,
    top: 49 * SCALE_HEIGHT,
    left: 17 * SCALE_WIDTH,
  },
});
