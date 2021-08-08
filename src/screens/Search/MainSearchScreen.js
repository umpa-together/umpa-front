import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import { navigate } from '../../navigationRef';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import MainSongForm from '../../components/Search/MainSongForm';
import MainDJForm from '../../components/Search/MainDJForm';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';

import {Context as PlaylistContext} from '../../context/PlaylistContext';
import {Context as BoardContext} from '../../context/BoardContext';
import {Context as NoticeContext} from '../../context/NoticeContext';
import {Context as SearchContext} from '../../context/SearchContext';
import {Context as CurationContext} from '../../context/CurationContext';
import {Context as WeeklyContext} from '../../context/WeeklyContext';
import {Context as AuthContext} from '../../context/AuthContext';
import {Context as UserContext} from '../../context/UserContext';

const MainSearchScreen = () => {
    const [category, setCategory] = useState('Song');
    const { state: authState, tryLocalSignin } = useContext(AuthContext);
    const { getPlaylists } = useContext(PlaylistContext);
    const { state: userState, initUser, getMyInfo, getMyScrab, getMyBookmark, getMyStory, getOtherStory } = useContext(UserContext);
    const { getGenreBoard } = useContext(BoardContext);
    const { getnotice, setnoticetoken } = useContext(NoticeContext);
    const { currentHashtag } = useContext(SearchContext);
    const { getCurationposts } = useContext(CurationContext);
    const { getWeeklyPlaylist, getWeeklyCuration, getWeeklyDJ, postWeekly } = useContext(WeeklyContext);
    const loadingDataFetch = async () => {
        await postWeekly()
        await Promise.all([
        getWeeklyPlaylist(),
        getWeeklyCuration(),
        getWeeklyDJ(),
        setnoticetoken(),
        getPlaylists(),
        getCurationposts(),
        getGenreBoard(),
        initUser(),
        getMyInfo(),
        getMyScrab(),
        getMyStory(),
        getOtherStory(),
        getMyBookmark(),
        getnotice(),
        currentHashtag()]);
    }
    useEffect(() => {
        console.log('here')
        loadingDataFetch()
    }, [])
    return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
        <View >
            <View style={styles.searchopt}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setCategory('Song')}>
                        {category == 'Song' ? <Text style={{fontSize: 22 * tmpWidth, marginRight: 18 * tmpWidth,color:'rgb(0,0,0)'}}>SONG</Text>
                        : <Text style={{fontSize: 22 * tmpWidth, marginRight: 18 * tmpWidth, color: '#C1C3D1'}}>SONG</Text> }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCategory('DJSong')}>
                        {category == 'DJSong' ? <Text style={{fontSize: 22 * tmpWidth, color:'rgb(0,0,0)'}}>DJ</Text>
                        : <Text style={{fontSize: 22 * tmpWidth, color: '#c6c6c6'}}>DJ</Text> }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{alignItems: 'center',width: 375 * tmpWidth, height: 64 * tmpWidth, }}>
                <TouchableOpacity style={styles.inputbox} onPress={() => navigate('Search', { searchOption: category })}>
                    <View style={{flexDirection: 'row', alignItems:'center',}}>
                        <FontAwesome style={{fontSize: 18 * tmpWidth, color:'#c6c6c6',marginTop:14 * tmpWidth,marginLeft:12 * tmpWidth, marginRight:12 * tmpWidth}} name="search"/>
                        {category == 'Song' ? <Text style={{color:'#c6c6c6', fontSize: 16 * tmpWidth, marginTop:14 * tmpWidth,}}>곡, 아티스트 또는 해시태그를 검색해주세요</Text>
                        : <Text style={{color:'#c6c6c6', fontSize: 16 * tmpWidth,marginTop:14 * tmpWidth, }}>곡, 아티스트 또는 DJ를 검색해주세요</Text>}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{height:590 * tmpHeight}}>
            {category == 'Song' ? <MainSongForm /> : <MainDJForm /> }
            </View>
        </View>
    </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    searchopt:{
        marginTop : tmpWidth*20,
        flexDirection: 'row',
        width:100* tmpWidth,
        height:22 * tmpWidth,
        marginBottom:13 * tmpWidth,
        marginLeft:24 * tmpWidth
    },
    inputbox:{
        width: 325 * tmpWidth,
        height: 44 * tmpWidth,
        backgroundColor: '#F5F5F5',
        borderRadius: 10 * tmpWidth
    },
});

export default MainSearchScreen;