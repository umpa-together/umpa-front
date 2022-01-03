import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Context as AppleMusicContext } from 'context/AppleMusic';

const SearchContext = createContext(null);

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const { state, searchSong, searchNext, searchHint, initSearch } = useContext(AppleMusicContext);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
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
    searchSong({ songname: input });
    setText(input);
    setIsResultClick(true);
    setSearching(false);
  };

  const onFocus = () => {
    if (isResultClick) {
      setSearching(true);
    }
    setIsResultClick(false);
  };

  useEffect(() => {
    if (text === '') {
      initSearch();
    } else if (!isResultClick) {
      setSearching(true);
      searchHint({ term: text });
    }
    if (searching && text === '') {
      setSearching(false);
    }
  }, [text]);

  const value = {
    text,
    loading,
    isResultClick,
    searching,
    textInputRef,
    onChangeText,
    onSearchKeyword,
    onEndReached,
    setIsResultClick,
    setText,
    onFocus,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
