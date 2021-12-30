import React from 'react';
import { Provider as UserProvider } from 'context/User';
import { Provider as AuthProvider } from 'context/Auth';
import { Provider as AppleMusicProvider } from 'context/AppleMusic';
import { Provider as RelayProvider } from 'context/Relay';
import { Provider as PlaylistProvider } from 'context/Playlist';
import { Provider as DailyProvider } from 'context/Daily';
import ModalProvider from 'providers/modal';
import MainNavigator from './src/navigation';
import ModalProvider from 'providers/modal';

export default () => {
  return (
    <ModalProvider>
      <AppleMusicProvider>
        <UserProvider>
          <AuthProvider>
            <DailyProvider>
              <PlaylistProvider>
                <RelayProvider>
                  <MainNavigator />
                </RelayProvider>
              </PlaylistProvider>
            </DailyProvider>
          </AuthProvider>
        </UserProvider>
      </AppleMusicProvider>
    </ModalProvider>
  );
};
