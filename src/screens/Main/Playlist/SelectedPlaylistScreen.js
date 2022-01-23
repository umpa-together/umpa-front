import React from 'react';
import SelectedPlaylist from 'templates/Main/Playlist/SelectedPlaylist';
import StatusBar from 'components/StatusBar';
import KeyboradProvider from 'providers/keyboard';
import { Provider as AddedProvider } from 'context/Added';

export default function ({ route }) {
  const { id, postUser, post } = route.params;
  return (
    <>
      <StatusBar />
      <KeyboradProvider>
        <AddedProvider>
          <SelectedPlaylist post={post} playlistId={id} postUser={postUser} />
        </AddedProvider>
      </KeyboradProvider>
    </>
  );
}
