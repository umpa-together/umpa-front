import React from 'react';
import PlaylistCreate from 'templates/Main/Playlist/PlaylistCreate';
import PlaylistCreateProvider from 'providers/playlistCreate';
import StatusBar from 'components/StatusBar';
import ScrollProvider from 'providers/scroll';

export default function ({ route }) {
  return (
    <>
      <StatusBar />
      <PlaylistCreateProvider>
        <ScrollProvider>
          <PlaylistCreate data={route.params && route.params.data} />
        </ScrollProvider>
      </PlaylistCreateProvider>
    </>
  );
}
