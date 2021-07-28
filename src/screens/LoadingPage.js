import React, { useEffect, useContext, useState } from 'react';
import { Animated, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {Context as PlaylistContext} from '../context/PlaylistContext';
import {Context as UserContext} from '../context/UserContext';
import {Context as BoardContext} from '../context/BoardContext';
import {Context as NoticeContext} from '../context/NoticeContext';
import {Context as SearchContext} from '../context/SearchContext';
import {Context as CurationContext} from '../context/CurationContext';
import {Context as WeeklyContext} from '../context/WeeklyContext';

import { navigate } from '../navigationRef';
import LinearGradient from 'react-native-linear-gradient';
import { tmpWidth } from '../components/FontNormalize';

const LoadingPage = () => {
    const { getPlaylists } = useContext(PlaylistContext);
    const { initUser, getMyInfo, getMyScrab, getMyBookmark, getMyStory, getOtherStory } = useContext(UserContext);
    const { getGenreBoard } = useContext(BoardContext);
    const { getnotice, setnoticetoken } = useContext(NoticeContext);
    const { currentHashtag } = useContext(SearchContext);
    const { getCurationposts } = useContext(CurationContext);
    const { getWeeklyPlaylist, getWeeklyCuration, getWeeklyDJ, postWeekly } = useContext(WeeklyContext);

    const opacity = useState(new Animated.Value(0))[0];
    const fadeIn = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 3500,
        }).start()
    }
    const mainLoading= async () => {
        await postWeekly()
        await Promise.all([
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

        currentHashtag(),

        getWeeklyPlaylist(),
        getWeeklyCuration(),
        getWeeklyDJ()]);
    };
    useEffect(()=>{
        TrackPlayer.setupPlayer().then(async() => {
            console.log('reday');
        });        
        mainLoading();
        fadeIn();
        const nav = setTimeout(() => navigate('Main'), 3500);
        return () => clearTimeout(nav);
    }, []);
    return (
        <LinearGradient colors={['rgb(229,229,255)', 'rgba(229,231,239,0)']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View style={{width: 194.9*tmpWidth, height: 119.9 * tmpWidth, opacity: opacity}}>
                <Image style={{width:'100%', height:'100%'}} source={require('../assets/icons/logo.png')} />
            </Animated.View>
            <Animated.Text style={{fontSize: 16 * tmpWidth, color: 'rgb(169,193,255)', marginTop: 26.5 * tmpWidth, opacity: opacity}}>퍼져나가는 음악 취향, 음파</Animated.Text>
        </LinearGradient>
    );
};

export default LoadingPage;