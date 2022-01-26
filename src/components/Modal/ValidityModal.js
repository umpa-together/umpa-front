import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useModal } from 'providers/modal';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { SUB_COLOR } from 'constants/colors';

export default function ValidityModal({ title }) {
  const { opacity } = useModal();
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Text style={[styles.text, { opacity }]}>{title}</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60 * SCALE_HEIGHT,
    backgroundColor: SUB_COLOR,
    position: 'absolute',
    bottom: 0,
  },
  text: {
    fontSize: FS(13),
    color: '#fff',
    marginLeft: 16 * SCALE_WIDTH,
    marginTop: 16 * SCALE_HEIGHT,
  },
});
