import React from 'react';
import { Provider as SearchProvider } from 'context/Search';
import SelectedHashtag from 'templates/Main/Search/SelectedHashtag';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  const { id, hashtag } = route.params;
  return (
    <>
      <StatusBar />
      <SearchProvider>
        <SelectedHashtag id={id} hashtag={hashtag} />
      </SearchProvider>
    </>
  );
}
