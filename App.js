import React from 'react';
import { Provider as UserProvider } from 'context/User';
import { Provider as AuthProvider } from 'context/Auth';
import TrackPlayerProvider from 'providers/trackPlayer';
import { Provider as AppleMusicProvider } from 'context/AppleMusic';
import MainNavigator from './src/navigation';
import ModalProvider from 'providers/modal';

export default () => {
  return (
    <ModalProvider>
      <AppleMusicProvider>
        <UserProvider>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </UserProvider>
      </AppleMusicProvider>
    </ModalProvider>
  );
};
