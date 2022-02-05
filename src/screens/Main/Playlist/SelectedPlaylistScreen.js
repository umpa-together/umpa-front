import React from 'react';
import SelectedPlaylist from 'templates/Main/Playlist/SelectedPlaylist';
import StatusBar from 'components/StatusBar';
import { Provider as AddedProvider } from 'context/Added';
import { Provider as ReportProvider } from 'context/Report';

export default function ({ route }) {
  const { post, id, postUserId } = route.params;
  return (
    <>
      <StatusBar />
      <AddedProvider>
        <ReportProvider>
          <SelectedPlaylist post={post} id={id} postUserId={postUserId} />
        </ReportProvider>
      </AddedProvider>
    </>
  );
}
