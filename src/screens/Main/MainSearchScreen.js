import React, { useState, useEffect, useContext, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import {Context as PlaylistContext} from '../../context/PlaylistContext';
import {Context as BoardContext} from '../../context/BoardContext';
import {Context as NoticeContext} from '../../context/NoticeContext';
import {Context as SearchContext} from '../../context/SearchContext';
import {Context as CurationContext} from '../../context/CurationContext';
import {Context as WeeklyContext} from '../../context/WeeklyContext';
import {Context as UserContext} from '../../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';

import SearchBar from '../../components/Main/SearchBar'
import CurrentHashtag from '../../components/Main/CurrentHashtag'
import RecentPlaylists from '../../components/Main/RecentPlaylists'
import WeeklyPlaylists from '../../components/Main/WeeklyPlaylists';
const MainSearchScreen = () => {
    const { getPlaylists } = useContext(PlaylistContext);
    const { initUser, getMyInfo, getMyScrab, getMyBookmark, getMyStory, getOtherStory } = useContext(UserContext);
    const { getGenreBoard } = useContext(BoardContext);
    const { getnotice, setnoticetoken } = useContext(NoticeContext);
    const { state, currentHashtag } = useContext(SearchContext);
    const { getCurationposts } = useContext(CurationContext);
    const { state: WeeklyState, getWeeklyPlaylist, getWeeklyCuration, getWeeklyDJ, postWeekly, getRecentPlaylists } = useContext(WeeklyContext);

    const loadingDataFetch = async () => {
        await postWeekly()
        await Promise.all([
        getRecentPlaylists(),
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
        getnotice()]);
    }
    useEffect(() => {
        loadingDataFetch()
    }, [])
    useFocusEffect(
        useCallback(() => {
            currentHashtag()
        }, [])
    )
    return (
        <SafeAreaView style={{backgroundColor:"#fff", flex: 1}}>
            <SearchBar />
            <CurrentHashtag hashtag={state.currentHashtag}/>
            <RecentPlaylists playlists={WeeklyState.recentPlaylists} />
            <WeeklyPlaylists playlists={WeeklyState.weeklyPlaylist} />
        </SafeAreaView>
    )
}

export default MainSearchScreen;