import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { Context as SearchHintContext } from 'context/SearchContext';

const SearchContext = createContext(null)

export const useSearch = () => useContext(SearchContext)

export default SearchProvider = ({ children }) => {
    const { state: searchState, searchHint, initHint, hashtagHint, djHint, songNext } = useContext(SearchHintContext);
    const [isHint, setIsHint] = useState(false)
    const [text, setText] = useState('')
    const [searchOption, setSearchOption] = useState('Song')
    const [loading, setLoading] = useState(false);
    const [isResultClick, setIsResultClick] = useState(false)
    const textRef = useRef()

    const getData = async () => {
        if(searchState.songData.length >= 20){
            setLoading(true);
            if(searchState.songNext != undefined)   await songNext({ next: searchState.songNext.substr(22) });
            setLoading(false);
        }
    };

    const onEndReached = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };

    useEffect(() => {
        if(text === ''){
            setIsResultClick(false)
            initHint()
        } else {
            if(searchOption === 'Song') {
                searchHint({term: text})
            } else if (searchOption === 'Hashtag') {
                hashtagHint({term: text})
            } else if (searchOption == 'DJ') { 
                djHint({term: text})
            }
        }
    }, [text])

    const value = {
        textRef,
        searchOption,
        isHint,
        loading,
        isResultClick,
        onEndReached,
        setIsResultClick,
        setIsHint,
        setText,
        setSearchOption,
    }

    return (
        <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
    )
}