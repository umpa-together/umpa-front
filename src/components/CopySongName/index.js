import { TouchableOpacity } from 'react-native';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { useModal } from 'providers/modal';
import HapticFeedback from 'lib/utils/haptic';

export default function CopySongName({ name, children, initAction }) {
  const { onClickAdded } = useModal();

  const onClickCopy = () => {
    onClickAdded({ opt: 'copy' });
    HapticFeedback();
    Clipboard.setString(name);
  };

  return (
    <TouchableOpacity onPress={initAction && initAction} onLongPress={onClickCopy}>
      {children}
    </TouchableOpacity>
  );
}
