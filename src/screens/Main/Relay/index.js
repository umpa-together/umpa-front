import React from 'react';
import Relay from 'templates/Main/Relay';
import { Provider as NoticeProvider } from 'context/Notice';

export default function () {
  return (
    <>
      <NoticeProvider>
        <Relay />
      </NoticeProvider>
    </>
  );
}
