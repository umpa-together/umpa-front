/* eslint-disable react/jsx-props-no-spreading */
import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function TouchableNoDouble({ onPress, children, ...props }) {
  const [disabled, setDisabled] = useState(false);

  const onClick = async () => {
    setDisabled(true);
    onPress();
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={onClick} {...props}>
      {children}
    </TouchableOpacity>
  );
}
