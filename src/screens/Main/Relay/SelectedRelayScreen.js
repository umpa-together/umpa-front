import React from 'react';
import SelectedRelay from 'templates/Main/Relay/SelectedRelay';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  const { id } = route.params;

  return (
    <>
      <StatusBar />
      <SelectedRelay id={id} />
    </>
  );
}
