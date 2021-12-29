import React from 'react';
import Modal from 'react-native-modal';

export default function ({ children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal animationIn="fadeIn" animationOut="fadeOut" backdropOpacity={0.4} {...props}>
      {children}
    </Modal>
  );
}
