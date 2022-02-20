import React from 'react';
import SelectedPlaylist from 'templates/Main/Playlist/SelectedPlaylist';
import StatusBar from 'components/StatusBar';
import { Provider as ReportProvider } from 'context/Report';

export default function ({ route }) {
  const { id, postUserId } = route.params;
  return (
    <>
      <StatusBar />
      <ReportProvider>
        <SelectedPlaylist id={id} postUserId={postUserId} />
      </ReportProvider>
    </>
  );
}
