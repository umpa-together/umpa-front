import React from 'react';
import HintLists from 'components/Search/HintLists';
import ResultLists from 'components/Search/ResultLists';
import { useSearch } from 'providers/search';
import RecentKeywords from 'components/Search/RecentKeywords';

export default function SearchLists() {
  const { searching, isResultClick } = useSearch();

  return (
    <>{searching ? <HintLists /> : <>{isResultClick ? <ResultLists /> : <RecentKeywords />}</>}</>
  );
}
