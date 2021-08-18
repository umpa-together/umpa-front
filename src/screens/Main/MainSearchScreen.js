import React, { useEffect, useContext, useCallback } from 'react';
import { View } from 'react-native';
import {Context as PlaylistContext} from 'context/PlaylistContext';
import {Context as BoardContext} from 'context/BoardContext';
import {Context as NoticeContext} from 'context/NoticeContext';
import {Context as SearchContext} from 'context/SearchContext';
import {Context as CurationContext} from 'context/CurationContext';
import {Context as WeeklyContext} from 'context/WeeklyContext';
import {Context as UserContext} from 'context/UserContext';
import { useFocusEffect } from '@react-navigation/native';

import SearchBox from 'components/Main/SearchBox'
import CurrentHashtag from 'components/Main/CurrentHashtag'
import RecentPlaylists from 'components/Main/RecentPlaylists'
import WeeklyPlaylists from 'components/Main/WeeklyPlaylists';
import MusicArchive from 'components/Main/MusicArchive'
import { tmpWidth } from 'components/FontNormalize';

const MainSearchScreen = () => {
    const { getPlaylists } = useContext(PlaylistContext);
    const { initUser, getMyScrab, getMyBookmark, getMyStory, getOtherStory } = useContext(UserContext);
    const { getGenreBoard } = useContext(BoardContext);
    const { getnotice, setnoticetoken } = useContext(NoticeContext);
    const { state, currentHashtag } = useContext(SearchContext);
    const { getCurationposts } = useContext(CurationContext);
    const { state: WeeklyState, getWeeklyPlaylist, getWeeklyCuration, getWeeklyDJ, postWeekly, getRecentPlaylists, getMusicArchive } = useContext(WeeklyContext);

    const loadingDataFetch = async () => {
        await postWeekly()
        await Promise.all([
        getMusicArchive(),
        getRecentPlaylists(),
        getWeeklyPlaylist(),
        getWeeklyCuration(),
        getWeeklyDJ(),
        setnoticetoken(),
        getPlaylists(),
        getCurationposts(),
        getGenreBoard(),
        initUser(),
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
        <View style={{backgroundColor:"#fff", flex: 1, paddingTop: 44 * tmpWidth}}>
            <MusicArchive archive={WeeklyState.musicArchive} />
            <SearchBox />
            <CurrentHashtag hashtag={state.currentHashtag}/>
            <RecentPlaylists playlists={WeeklyState.recentPlaylists} />
            <WeeklyPlaylists playlists={WeeklyState.weeklyPlaylist} />
        </View>
    )
}

export default MainSearchScreen;