/* eslint-disable no-nested-ternary */
import React from 'react';
import HintLists from 'components/Search/HintLists';
import ResultLists from 'components/Search/ResultLists';
import { useSearch } from 'providers/search';
import RecentKeywords from 'components/Search/RecentKeywords';
import { Provider as MainContentsProvider } from 'context/MainContents';

export default function SearchLists() {
  const { text, isResultClick } = useSearch();

  return (
    <>
      {isResultClick ? (
        <MainContentsProvider>
          <ResultLists />
        </MainContentsProvider>
      ) : text.length > 0 ? (
        <HintLists />
      ) : (
        <RecentKeywords modal={false} />
      )}
    </>
  );
}
