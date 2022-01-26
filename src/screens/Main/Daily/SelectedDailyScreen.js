import React from 'react';
import StatusBar from 'components/StatusBar';
import SelectedDaily from 'templates/Main/Daily/SelectedDaily';
import { Provider as ReportProvider } from 'context/Report';

export default function ({ route }) {
  const { post } = route.params;

  return (
    <>
      <StatusBar />
      <ReportProvider>
        <SelectedDaily post={post} />
      </ReportProvider>
    </>
  );
}
