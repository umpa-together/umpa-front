import React from 'react';
import PlaylistUpload from 'templates/Main/Playlist/PlaylistUpload';
import PlaylistCreateProvider from 'providers/playlistCreate';
import TrackPlayerProvider from 'providers/trackPlayer';

export default function PlaylistUploadScreen({ route }) {
  const { data } = route.params;
  return (
    <PlaylistCreateProvider>
      <TrackPlayerProvider>
        <PlaylistUpload data={data} />
      </TrackPlayerProvider>
    </PlaylistCreateProvider>
  );
}
