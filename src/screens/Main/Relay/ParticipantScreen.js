import React from 'react';
import Participant from 'templates/Main/Relay/Participant';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  const { users } = route.params;
  return (
    <>
      <StatusBar />
      <Participant users={users} />
    </>
  );
}
