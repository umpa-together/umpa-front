import React, { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';

const KeyboardContext = createContext(null);

export const useKeyboard = () => useContext(KeyboardContext);

export default function KeyboardProvider({ children }) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const keyboardShowOpt = Platform.select({
    ios: 'keyboardWillShow',
    android: 'keyboardDidShow',
  });
  const keyboardHideOpt = Platform.select({
    ios: 'keyboardWillHide',
    android: 'keyboardDidHide',
  });

  const onKeyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  const keyboardStyle = {
    marginBottom: keyboardHeight,
  };

  const value = {
    onKeyboardDidShow,
    onKeyboardDidHide,
    keyboardHideOpt,
    keyboardShowOpt,
    keyboardStyle,
  };

  return <KeyboardContext.Provider value={value}>{children}</KeyboardContext.Provider>;
}
