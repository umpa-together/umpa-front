import React from 'react';
import { Provider as UserProvider } from 'context/User';
import { Provider as AuthProvider } from 'context/Auth';
import TrackPlayerProvider from 'providers/trackPlayer';
import { Provider as AppleMusicProvider } from 'context/AppleMusic';
import MainNavigator from './src/navigation';

export default () => {
  return (
    <TrackPlayerProvider>
      <AppleMusicProvider>
        <UserProvider>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </UserProvider>
      </AppleMusicProvider>
    </TrackPlayerProvider>
  );
};
