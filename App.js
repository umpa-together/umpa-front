import React from 'react';
import { Provider as UserProvider } from 'context/User';
import { Provider as AuthProvider } from 'context/Auth';
import TrackPlayerProvider from 'providers/trackPlayer';
import { Provider as AppleMusicProvider } from 'context/AppleMusic';
import MainNavigator from './src/navigation';
import { Provider as RelayProvider } from './src/context/Relay';

export default () => {
  return (
    <TrackPlayerProvider>
      <AppleMusicProvider>
        <UserProvider>
          <AuthProvider>
            <RelayProvider>
              <MainNavigator />
            </RelayProvider>
          </AuthProvider>
        </UserProvider>
      </AppleMusicProvider>
    </TrackPlayerProvider>
  );
};
