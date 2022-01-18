import React from 'react';
import OtherAccount from 'templates/Main/Account/OtherAccount';
import TrackPlayerProvider from 'providers/trackPlayer';

export default function OtherAccountScreen({ route }) {
  const { id } = route.params;
  return (
    <TrackPlayerProvider>
      <OtherAccount id={id} />
    </TrackPlayerProvider>
  );
}
