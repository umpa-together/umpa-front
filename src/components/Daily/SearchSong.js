import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from 'components/Daily/Header';
import SearchBar from 'components/Daily/SearchBar';
import ArchiveButton from 'components/Daily/ArchiveButton';
import SearchView from 'components/Daily/SearchView';
import AddedSongLists from 'components/Daily/AddedSongLists';
import SearchProvider from 'providers/search'

export default SearchSong = ({ isEdit, setIsSearch, daily }) => {
    return (
        <View style={styles.container}>
            <Header 
                title={`데일리${isEdit ? '수정하기' : '만들기'}`} 
                click="완료"
                setIsSearch={setIsSearch}
            />
            <SearchProvider>
                <SearchBar />
                <ArchiveButton />
                <View style={styles.flex}>
                    <SearchView />
                    <AddedSongLists addedSongs={daily} />
                </View>
            </SearchProvider>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1,
    },
    flex: {
        flex: 1
    }
});