import React from 'react';
import MyAccount from 'templates/Main/Account/MyAccount';
import TrackPlayerProvider from 'providers/trackPlayer';

export default function Account() {
  return (
    <TrackPlayerProvider>
      <MyAccount />
    </TrackPlayerProvider>
  );
}
