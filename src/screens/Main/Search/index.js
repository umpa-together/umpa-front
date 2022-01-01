import React from 'react';
import Search from 'templates/Main/Search';
import StatusBar from 'components/StatusBar';
import { Provider as MainContentsProvider } from 'context/MainContents';

export default function () {
  return (
    <>
      <StatusBar />
      <MainContentsProvider>
        <Search />
      </MainContentsProvider>
    </>
  );
}
