import React from 'react';
import OtherAccount from 'templates/Main/Account/OtherAccount';
import StatusBar from 'components/StatusBar';

export default function OtherAccountScreen({ route }) {
  const { id } = route.params;
  return (
    <>
      <StatusBar />
      <OtherAccount id={id} />
    </>
  );
}
