/* eslint-disable no-nested-ternary */
import React from 'react';
import HintLists from 'components/SearchSong/HintLists';
import ResultLists from 'components/SearchSong/ResultLists';
import { useSearch } from 'providers/search';
import RecentKeywords from 'components/Search/RecentKeywords';

export default function SearchLists() {
  const { text, isResultClick } = useSearch();
  return (
    <>
      {isResultClick ? <ResultLists /> : text.length > 0 ? <HintLists /> : <RecentKeywords modal />}
    </>
  );
}
