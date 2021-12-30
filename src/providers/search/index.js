import React, { createContext, useContext, useState, useEffect } from 'react';
import { Context as AppleMusicContext } from 'context/AppleMusic';

const SearchContext = createContext(null);

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const { state, searchSong, searchNext, searchHint, initSearch } = useContext(AppleMusicContext);
  const [text, setText] = useState('');
  const [searchOption, setSearchOption] = useState('Song');
  const [loading, setLoading] = useState(false);
  const [isResultClick, setIsResultClick] = useState(false);

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
    setIsResultClick(true);
  };

  useEffect(() => {
    if (text === '') {
      // setIsResultClick(false);
    } else if (searchOption === 'Song') {
      searchHint({ term: text });
    } else if (searchOption === 'Hashtag') {
      hashtagHint({ term: text });
    } else if (searchOption === 'DJ') {
      djHint({ term: text });
    }
    if (isResultClick) {
      setIsResultClick(false);
      initSearch();
    }
  }, [text]);

  const value = {
    text,
    searchOption,
    loading,
    isResultClick,
    onChangeText,
    onSearchKeyword,
    onEndReached,
    setIsResultClick,
    setText,
    setSearchOption,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
