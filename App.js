import React from 'react';
import MainNavigator from './src/navigation';
import TrackPlayerProvider from './src/providers/trackPlayer';
import { Provider as AuthProvider } from 'context/Auth';
export default () => {
  return (
    <TrackPlayerProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </TrackPlayerProvider>
  );
};
