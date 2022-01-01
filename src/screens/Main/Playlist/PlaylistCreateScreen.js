import React from 'react';
import PlaylistCreate from 'templates/Main/Playlist/PlaylistCreate';
import PlaylistCreateProvider from 'providers/playlistCreate';
import TrackPlayerProvider from 'providers/trackPlayer';

export default function PlaylistCreateScreen() {
  return (
    <PlaylistCreateProvider>
      <TrackPlayerProvider>
        <PlaylistCreate />
      </TrackPlayerProvider>
    </PlaylistCreateProvider>
  );
}
