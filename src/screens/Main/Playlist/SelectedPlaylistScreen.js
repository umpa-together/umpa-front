import React from 'react';
import SelectedPlaylist from 'templates/Main/Playlist/SelectedPlaylist';
import StatusBar from 'components/StatusBar';
import TrackPlayerProvider from 'providers/trackPlayer';
import KeyboradProvider from 'providers/keyboard';

export default function ({ route }) {
  const { id, postUser, post } = route.params;
  return (
    <>
      <StatusBar />
      <TrackPlayerProvider>
        <KeyboradProvider>
          <SelectedPlaylist post={post} playlistId={id} postUser={postUser} />
        </KeyboradProvider>
      </TrackPlayerProvider>
    </>
  );
}
