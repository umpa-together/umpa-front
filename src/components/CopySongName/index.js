import { TouchableOpacity } from 'react-native';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { useModal } from 'providers/modal';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { hapticOptions, hapticTriggerType } from 'constants/option';

export default function CopySongName({ name, children }) {
  const { onClickAdded } = useModal();

  const onClickCopy = () => {
    onClickAdded({ opt: 'copy' });
    ReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);
    Clipboard.setString(name);
  };

  return <TouchableOpacity onLongPress={onClickCopy}>{children}</TouchableOpacity>;
}
