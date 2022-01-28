/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Modal from 'react-native-modal';

export default function ({ children, ...props }) {
  return (
    <Modal
      useNativeDriver // Faster animation
      hideModalContentWhileAnimating // Better performance, try with/without
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.4}
      statusBarTranslucent
      {...props}
    >
      {children}
    </Modal>
  );
}
