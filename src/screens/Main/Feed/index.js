import React from 'react';
import StatusBar from 'components/StatusBar';
import Feed from 'templates/Main/Feed';
import { Provider as FeedProvder } from 'context/Feed';
import { Provider as StoryProvider } from 'context/Story';

export default function () {
  return (
    <>
      <StatusBar />
      <StoryProvider>
        <FeedProvder>
          <Feed />
        </FeedProvder>
      </StoryProvider>
    </>
  );
}
