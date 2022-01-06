import React from 'react';
import Added from 'templates/Main/Account/Added';
import StatusBar from 'components/StatusBar';
import { Provider as AddedProvider } from 'context/Added';

export default function ({ route }) {
  return (
    <>
      <StatusBar />
      <AddedProvider>
        <Added type={route.params.type} />
      </AddedProvider>
    </>
  );
}
