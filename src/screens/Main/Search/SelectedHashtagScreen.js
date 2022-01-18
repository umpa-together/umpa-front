import React from 'react';
import { Provider as SearchProvider } from 'context/Search';
import SelectedHashtag from 'templates/Main/Search/SelectedHashtag';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  const { id, info } = route.params;
  return (
    <>
      <StatusBar />
      <SearchProvider>
        <SelectedHashtag id={id} info={info} />
      </SearchProvider>
    </>
  );
}
