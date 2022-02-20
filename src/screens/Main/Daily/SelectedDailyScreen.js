import React from 'react';
import StatusBar from 'components/StatusBar';
import SelectedDaily from 'templates/Main/Daily/SelectedDaily';
import { Provider as ReportProvider } from 'context/Report';

export default function ({ route }) {
  const { id, postUserId } = route.params;

  return (
    <>
      <StatusBar />
      <ReportProvider>
        <SelectedDaily id={id} postUserId={postUserId} />
      </ReportProvider>
    </>
  );
}
