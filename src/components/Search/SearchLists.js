/* eslint-disable no-nested-ternary */
import React from 'react';
import HintLists from 'components/Search/HintLists';
import ResultLists from 'components/Search/ResultLists';
import { useSearch } from 'providers/search';
import RecentKeywords from 'components/Search/RecentKeywords';

export default function SearchLists() {
  const { text, isResultClick } = useSearch();

  return (
    <>
      {isResultClick ? (
        <ResultLists />
      ) : text.length > 0 ? (
        <HintLists />
      ) : (
        <RecentKeywords modal={false} />
      )}
    </>
  );
}
