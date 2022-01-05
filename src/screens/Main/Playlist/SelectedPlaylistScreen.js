import React from 'react';
import SelectedPlaylist from 'templates/Main/Playlist/SelectedPlaylist';
import StatusBar from 'components/StatusBar';
import TrackPlayerProvider from 'providers/trackPlayer';
import KeyboradProvider from 'providers/keyboard';

export default function ({ route }) {
  const { id } = route.params;
  return (
    <>
      <TrackPlayerProvider>
        <KeyboradProvider>
          <StatusBar />
          <SelectedPlaylist playlistId={id} />
        </KeyboradProvider>
      </TrackPlayerProvider>
    </>
  );
}
