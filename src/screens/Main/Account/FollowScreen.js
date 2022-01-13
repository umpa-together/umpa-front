import React from 'react';
import Follow from 'templates/Main/Account/Follow';
import StatusBar from 'components/StatusBar';
import TrackPlayerProvider from 'providers/trackPlayer';

export default function FollowScreen({ route }) {
  const { opt } = route.params;

  return (
    <>
      <StatusBar />
      <TrackPlayerProvider>
        <Follow opt={opt} />
      </TrackPlayerProvider>
    </>
  );
}
