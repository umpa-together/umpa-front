import React from 'react';
import PlaylistUpload from 'templates/Main/Playlist/PlaylistUpload';
import PlaylistCreateProvider from 'providers/playlistCreate';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  const { data, edit } = route.params;
  return (
    <>
      <StatusBar />
      <PlaylistCreateProvider>
        <PlaylistUpload data={data} edit={edit} />
      </PlaylistCreateProvider>
    </>
  );
}
