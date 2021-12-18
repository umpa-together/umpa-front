import React from 'react';
import MainNavigator from './src/navigation';
import TrackPlayerProvider from './src/providers/trackPlayer';

export default () => {
  return (
    <TrackPlayerProvider>
      <MainNavigator />
    </TrackPlayerProvider>
  );
};
