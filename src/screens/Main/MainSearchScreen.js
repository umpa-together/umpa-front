import React, { useEffect, useContext, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import {Context as PlaylistContext} from 'context/PlaylistContext';
import {Context as BoardContext} from 'context/BoardContext';
import {Context as NoticeContext} from 'context/NoticeContext';
import {Context as SearchContext} from 'context/SearchContext';
import {Context as WeeklyContext} from 'context/WeeklyContext';
import {Context as UserContext} from 'context/UserContext';
import {Context as DJContext} from 'context/DJContext';
import {Context as FeedContext} from 'context/FeedContext';

import SearchBox from 'components/Main/SearchBox'
import CurrentHashtag from 'components/Main/CurrentHashtag'
import RecentPlaylists from 'components/Main/RecentPlaylists'
import WeeklyPlaylists from 'components/Main/WeeklyPlaylists';
import MusicArchive from 'components/Main/MusicArchive'
import SimilarTasteUsers from 'components/Main/SimilarTasteUsers';
import Header from 'components/Main/Header';
import WeeklyDailies from 'components/Main/WeeklyDailies';

const MainSearchScreen = () => {
    const { getPlaylists } = useContext(PlaylistContext);
    const { getMyScrab, getMyBookmark, getMyStory, getOtherStory } = useContext(UserContext);
    const { getGenreBoard } = useContext(BoardContext);
    const { getnotice, setnoticetoken } = useContext(NoticeContext);
    const { state, currentHashtag } = useContext(SearchContext);
    const { state: WeeklyState, postWeekly, getRecentPlaylists, getMusicArchive, getWeekly } = useContext(WeeklyContext);
    const { state: djState, getMainRecommendDJ } = useContext(DJContext);
    const { getFeeds } = useContext(FeedContext)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            dataFetchinMain();
        }
    }

    const dataFetchinMain = async () => {
        await Promise.all([
            getWeekly(),
            getMusicArchive(),
            getMainRecommendDJ(),
            currentHashtag(),
            getRecentPlaylists(),
        ])
    }

    const loadingDataFetch = async () => {
        //await postWeekly()
        await Promise.all([
            getWeekly(),
            getMusicArchive(),
            getMainRecommendDJ(),
            getFeeds(),
            currentHashtag(),
            getRecentPlaylists(),
            getPlaylists(),
            getMyStory(),
            getOtherStory(),
            getGenreBoard(),
            getMyBookmark(),
            getMyScrab(),
            setnoticetoken(),
            getnotice()
        ]);
    }

    useEffect(() => {
        loadingDataFetch()
    }, [])

    return (
        <ScrollView 
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={styles.container}
            stickyHeaderIndices={[0]}
        >
            <Header />
            {/* 
            <MusicArchive archive={WeeklyState.musicArchive} />
            */}
            <SearchBox />
            <CurrentHashtag hashtag={state.currentHashtag}/>
            <RecentPlaylists playlists={WeeklyState.recentPlaylists} />
            <WeeklyPlaylists playlists={WeeklyState.mainPlaylist} />
            <SimilarTasteUsers users={djState.mainRecommendDJ} />
            <WeeklyDailies dailies={WeeklyState.mainDaily} />
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container: {
        backgroundColor:"#ffffff", 
    }
})
export default MainSearchScreen;