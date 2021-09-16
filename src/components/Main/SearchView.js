import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSearch } from 'providers/search';
import SongHint from './SongHint';
import HashtagHint from './HashtagHint';
import DJHint from './DJHint';
import SongResult from './SongResult';
import SearchResult from './SearchResult';
import HashtagResult from './HashtagResult';

export default SearchView = () => {
    const { searchOption, isHint, isResultClick } = useSearch()

    return (
        <View style={styles.container}>
            { searchOption === 'Song' ? 
            <>
                { isHint ? <SongHint /> : 
                <>
                    { isResultClick ? <SearchResult /> : <SongResult /> }
                </> }
            </> :
            searchOption === 'Hashtag' ? 
            <>
                { isHint ? <HashtagHint /> : <HashtagResult /> }
            </> : <DJHint /> }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1
    }
})