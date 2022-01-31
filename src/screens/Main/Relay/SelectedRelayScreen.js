import React from 'react';
import SelectedRelay from 'templates/Main/Relay/SelectedRelay';
import StatusBar from 'components/StatusBar';
import { Provider as ReportProvider } from 'context/Report';

export default function ({ route }) {
  const { id } = route.params;

  return (
    <>
      <StatusBar />
      <ReportProvider>
        <SelectedRelay id={id} />
      </ReportProvider>
    </>
  );
}
