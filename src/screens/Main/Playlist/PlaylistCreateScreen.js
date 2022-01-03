import React from 'react';
import PlaylistCreate from 'templates/Main/Playlist/PlaylistCreate';
import PlaylistCreateProvider from 'providers/playlistCreate';
import TrackPlayerProvider from 'providers/trackPlayer';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  return (
    <>
      <StatusBar />
      <PlaylistCreateProvider>
        <TrackPlayerProvider>
          <PlaylistCreate data={route.params && route.params.data} />
        </TrackPlayerProvider>
      </PlaylistCreateProvider>
    </>
  );
}
