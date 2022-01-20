import React from 'react';
import Follow from 'templates/Main/Account/Follow';
import StatusBar from 'components/StatusBar';

export default function FollowScreen({ route }) {
  const { opt } = route.params;

  return (
    <>
      <StatusBar />
      <Follow opt={opt} />
    </>
  );
}
