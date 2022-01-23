import React from 'react';
import { Provider as UserProvider } from 'context/User';
import { Provider as AuthProvider } from 'context/Auth';
import { Provider as AppleMusicProvider } from 'context/AppleMusic';
import { Provider as RelayProvider } from 'context/Relay';
import { Provider as PlaylistProvider } from 'context/Playlist';
import { Provider as DailyProvider } from 'context/Daily';
import ModalProvider from 'providers/modal';
import SongActionsProvider from 'providers/songActions';
import TrackPlayerProvider from 'providers/trackPlayer';
import MainNavigator from './src/navigation';

export default () => {
  return (
    <AppleMusicProvider>
      <UserProvider>
        <AuthProvider>
          <DailyProvider>
            <PlaylistProvider>
              <RelayProvider>
                <ModalProvider>
                  <SongActionsProvider>
                    <TrackPlayerProvider>
                      <MainNavigator />
                    </TrackPlayerProvider>
                  </SongActionsProvider>
                </ModalProvider>
              </RelayProvider>
            </PlaylistProvider>
          </DailyProvider>
        </AuthProvider>
      </UserProvider>
    </AppleMusicProvider>
  );
};
