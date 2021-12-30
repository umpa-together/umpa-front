import React from 'react';
import Swipe from 'templates/Main/Relay/Swipe';
import TrackPlayerProvider from 'providers/trackPlayer';

export default function () {
  return (
    <TrackPlayerProvider>
      <Swipe />
    </TrackPlayerProvider>
  );
}
