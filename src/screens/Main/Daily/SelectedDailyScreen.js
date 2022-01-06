import React from 'react';
import StatusBar from 'components/StatusBar';
import SelectedDaily from 'templates/Main/Daily/SelectedDaily';
import TrackPlayerProvider from 'providers/trackPlayer';
import KeyboradProvider from 'providers/keyboard';

export default function ({ route }) {
  const { id } = route.params;

  return (
    <>
      <StatusBar />
      <TrackPlayerProvider>
        <KeyboradProvider>
          <SelectedDaily dailyId={id} />
        </KeyboradProvider>
      </TrackPlayerProvider>
    </>
  );
}
