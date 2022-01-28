import React from 'react';
import SelectedPlaylist from 'templates/Main/Playlist/SelectedPlaylist';
import StatusBar from 'components/StatusBar';
import KeyboradProvider from 'providers/keyboard';
import { Provider as AddedProvider } from 'context/Added';
import { Provider as ReportProvider } from 'context/Report';

export default function ({ route }) {
  const { post, id, postUserId } = route.params;
  return (
    <>
      <StatusBar />
      <KeyboradProvider>
        <AddedProvider>
          <ReportProvider>
            <SelectedPlaylist post={post} id={id} postUserId={postUserId} />
          </ReportProvider>
        </AddedProvider>
      </KeyboradProvider>
    </>
  );
}
