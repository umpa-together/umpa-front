import React from 'react'
import { useSearch } from 'providers/search';
import SongHint from './SongHint';
import HashtagHint from './HashtagHint';
import DJHint from './DJHint';
import SongResult from './SongResult';
import SearchResult
 from './SearchResult';
export default SearchView = () => {
    const { searchOption, isHint, isResultClick } = useSearch()
    return (
        <>
            { searchOption === 'Song' ? 
            <>
                { isHint ? <SongHint /> : 
                <>
                    { isResultClick ? <SearchResult /> : <SongResult /> }
                </> }
            </> :
            searchOption === 'Hashtag' ? 
            <HashtagHint /> : <DJHint /> }
        </>
    )
}
