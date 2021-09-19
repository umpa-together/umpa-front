import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext'
import Header from 'components/Header';
import SongSearch from 'components/Account/SongSearch';
import AddedRepresent from 'components/Account/AddedRepresent';
import SongOrder from 'components/Account/SongOrder'
import SearchProvider from 'providers/search'
import SearchResult from 'components/Account/SearchResult';

const SongEditPage = ({ route }) => {
    const { searchinit } = useContext(SearchContext);
    const [songs, setSong] = useState([]);
    const [isEdit, setIsEdit] = useState(true);
    const [orderModal, setOrderModal] = useState(false);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const { data: currentplayList } = route.params

    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])

    useEffect(()=>{
        searchinit();
        if(currentplayList != undefined) {
           setSong(currentplayList);
        }
    }, []);

    return (
        <SearchProvider>
            <View style={styles.container}>
                <Header title="대표곡"/>
                <SongSearch />
                <SearchResult isEdit={isEdit} songs={songs} setSong={setSong} />
                <AddedRepresent isEdit={isEdit} songs={songs} setSong={setSong} setIsEdit={setIsEdit} setOrderModal={setOrderModal} />
                {orderModal && <SongOrder setOrderModal={setOrderModal} songs={songs} /> }
            </View>
        </SearchProvider>
    )
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1,
        alignItems: 'center'
    },
});

export default SongEditPage;