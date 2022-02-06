/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text as RNText } from 'react-native';

export default function Text({ children, ...props }) {
  return (
    <RNText allowFontScaling={false} {...props}>
      {children}
    </RNText>
  );
}
