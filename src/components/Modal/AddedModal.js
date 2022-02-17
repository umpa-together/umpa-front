import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useModal } from 'providers/modal';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';

export default function AddedModal({ customContainer }) {
  const { opacity, addedModalText } = useModal();
  const opacityStyle = {
    opacity,
  };
  return (
    <Animated.View style={[styles.container, opacityStyle, customContainer]}>
      <Animated.Text style={[styles.text, opacityStyle]}>{addedModalText}</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 345 * SCALE_WIDTH,
    height: 48 * SCALE_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4 * SCALE_HEIGHT,
    position: 'absolute',
    bottom: 30 * SCALE_HEIGHT,
    left: 15 * SCALE_WIDTH,
    elevation: 100,
  },
  text: {
    fontSize: FS(13),
    color: '#fff',
  },
});
