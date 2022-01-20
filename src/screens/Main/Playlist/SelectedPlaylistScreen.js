import React from 'react';
import SelectedPlaylist from 'templates/Main/Playlist/SelectedPlaylist';
import StatusBar from 'components/StatusBar';
import KeyboradProvider from 'providers/keyboard';

export default function ({ route }) {
  const { id, postUser } = route.params;
  return (
    <>
      <StatusBar />
      <KeyboradProvider>
        <SelectedPlaylist playlistId={id} postUser={postUser} />
      </KeyboradProvider>
    </>
  );
}
