import React from 'react';
import PlaylistUpload from 'templates/Main/Playlist/PlaylistUpload';
import PlaylistCreateProvider from 'providers/playlistCreate';
import TrackPlayerProvider from 'providers/trackPlayer';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  const { data } = route.params;
  return (
    <>
      <StatusBar />
      <PlaylistCreateProvider>
        <TrackPlayerProvider>
          <PlaylistUpload data={data} />
        </TrackPlayerProvider>
      </PlaylistCreateProvider>
    </>
  );
}
