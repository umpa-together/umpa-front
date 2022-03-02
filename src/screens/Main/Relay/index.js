import React from 'react';
import Relay from 'templates/Main/Relay';
import { Provider as NoticeProvider } from 'context/Notice';
import RefreshProvider from 'providers/refresh';

export default function () {
  return (
    <>
      <NoticeProvider>
        <RefreshProvider>
          <Relay />
        </RefreshProvider>
      </NoticeProvider>
    </>
  );
}
