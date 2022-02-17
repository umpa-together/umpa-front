import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useModal } from 'providers/modal';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { SUB_COLOR } from 'constants/colors';
import Text from 'components/Text';

export default function ValidityModal({ title }) {
  const { opacity } = useModal();
  const opacityStyle = {
    opacity,
  };
  return (
    <Animated.View style={[styles.container, opacityStyle]}>
      <Text style={styles.text}>{title}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60 * SCALE_HEIGHT,
    bottom: 0,
    backgroundColor: SUB_COLOR,
    position: 'absolute',
    elevation: 12,
  },
  text: {
    fontSize: FS(13),
    color: '#fff',
    marginLeft: 16 * SCALE_WIDTH,
    marginTop: 16 * SCALE_HEIGHT,
  },
});
