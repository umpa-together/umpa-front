import React from 'react';
import Added from 'templates/Main/Account/Added';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  return (
    <>
      <StatusBar />
      <Added type={route.params.type} />
    </>
  );
}
