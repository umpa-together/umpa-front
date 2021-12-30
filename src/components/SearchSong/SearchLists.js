import React from 'react';
import HintLists from 'components/SearchSong/HintLists';
import ResultLists from 'components/SearchSong/ResultLists';
import { useSearch } from 'providers/search';

export default function SearchLists() {
  const { isResultClick } = useSearch();
  return <>{isResultClick ? <ResultLists /> : <HintLists />}</>;
}
