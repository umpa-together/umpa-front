import React from 'react';
import StatusBar from 'components/StatusBar';
import Side from 'templates/Main/Account/Side';

export default function ({ route }) {
  const { type } = route.params;
  return (
    <>
      <StatusBar />
      <Side type={type} />
    </>
  );
}
