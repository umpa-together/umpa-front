import React from 'react';
import Notice from 'templates/Main/Notice';
import { Provider as NoticeProvider } from 'context/Notice';
import StatusBar from 'components/StatusBar';
import RefreshProvider from 'providers/refresh';

export default function () {
  return (
    <>
      <StatusBar />
      <NoticeProvider>
        <RefreshProvider>
          <Notice />
        </RefreshProvider>
      </NoticeProvider>
    </>
  );
}
