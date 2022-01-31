import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Context as AppleMusicContext } from 'context/AppleMusic';
import { Context as SearchContextC } from 'context/Search';

const SearchContext = createContext(null);

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const { state, searchSong, searchNext, searchHint, initSearch } = useContext(AppleMusicContext);
  const { state: AllState } = useContext(SearchContextC);

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchWait, setSearchWait] = useState(false);
  const [isResultClick, setIsResultClick] = useState(false);
  const [searching, setSearching] = useState(false);
  const textInputRef = useRef();

  const getData = async () => {
    if (state.songData.length >= 20 && !state.notNextSong) {
      setLoading(true);
      await searchNext({ nextUrl: state.nextSongUrl });
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  const onChangeText = (input) => {
    setText(input);
  };

  const onSearchKeyword = (input) => {
    setSearchWait(true);
    searchSong({ songname: input });
    setText(input);
    setIsResultClick(true);
    setSearching(false);
  };

  const onSearchContents = (input) => {
    setSearchWait(true);
    setText(input);
    setIsResultClick(true);
    setSearching(false);
  };

  const onFocus = () => {
    /* if (isResultClick) {
      setSearching(true);
    } */
    setSearching(true);
    setIsResultClick(false);
  };

  const onClickDelete = () => {
    setText('');
    setIsResultClick(false);
    setSearching(true);
  };

  useEffect(() => {
    if (text === '') {
      initSearch();
    } else if (!isResultClick) {
      setSearching(true);
      searchHint({ term: text });
    }
    /*
    if (searching && text === '') {
      setSearching(false);
    } */
  }, [text]);

  useEffect(() => {
    setSearchWait(false);
  }, [state.songData]);

  useEffect(() => {
    setSearchWait(false);
  }, [AllState.result]);

  const value = {
    text,
    loading,
    isResultClick,
    searching,
    textInputRef,
    searchWait,
    onChangeText,
    onSearchKeyword,
    onEndReached,
    setSearching,
    setIsResultClick,
    setText,
    onFocus,
    onSearchContents,
    onClickDelete,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
