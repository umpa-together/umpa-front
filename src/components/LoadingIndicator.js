import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator />
  </View>
);

export default LoadingIndicator;
