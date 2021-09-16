import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from 'components/Playlist/Header';
import SearchBar from 'components/Playlist/SearchBar';
import ArchiveButton from 'components/Playlist/ArchiveButton';
import SearchView from 'components/Playlist/SearchView';
import AddedSongLists from 'components/Playlist/AddedSongLists';
import SearchProvider from 'providers/search'

export default SearchSong = ({ isEdit, setIsSearch, playList }) => {
    return (
        <View style={styles.container}>
            <Header 
                title={`플레이리스트${isEdit ? '수정하기' : '만들기'}`} 
                click="완료"
                setIsSearch={setIsSearch}
            />
            <SearchProvider>
                <SearchBar />
                <ArchiveButton />
                <View style={styles.flex}>
                    <SearchView />
                    <AddedSongLists addedSongs={playList} />
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