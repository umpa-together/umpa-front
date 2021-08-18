import React from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from 'components/Main/SearchBar';
import SearchProvider from 'providers/search'
import SearchOptions from 'components/Main/SearchOptions';
import SearchView from 'components/Main/SearchView';

const SearchScreen = () => {
    return (
        <SearchProvider>
            <SafeAreaView style={{backgroundColor:"#fff", flex: 1}}>
                <SearchBar />
                <SearchOptions />
                <SearchView />            
            </SafeAreaView>
        </SearchProvider>
    );
};

export default SearchScreen;