import React, { createContext, useContext, useState } from 'react';

const KeyboardContext = createContext(null);

export const useKeyboard = () => useContext(KeyboardContext);

export default function KeyboardProvider({ children }) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
    keyboardStyle,
  };

  return <KeyboardContext.Provider value={value}>{children}</KeyboardContext.Provider>;
}
