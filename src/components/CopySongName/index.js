import { TouchableOpacity, Vibration } from 'react-native';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { useModal } from 'providers/modal';

export default function CopySongName({ name, children }) {
  const { onClickAdded } = useModal();

  const onClickCopy = () => {
    onClickAdded({ opt: 'copy' });
    Vibration.vibrate();
    Clipboard.setString(name);
  };

  return <TouchableOpacity onLongPress={onClickCopy}>{children}</TouchableOpacity>;
}
