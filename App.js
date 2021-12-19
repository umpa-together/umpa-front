import React from 'react';
import MainNavigator from './src/navigation';
import TrackPlayerProvider from './src/providers/trackPlayer';
import { Provider as AuthProvider } from './src/context/Auth';
import { Provider as SearchSongProvider } from './src/context/SearchSong';

export default () => {
  return (
    <TrackPlayerProvider>
      <SearchSongProvider>
        <AuthProvider>
          <MainNavigator />
        </AuthProvider>
      </SearchSongProvider>
    </TrackPlayerProvider>
  );
};
