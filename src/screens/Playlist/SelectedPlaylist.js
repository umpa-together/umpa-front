import React, { useContext, useEffect, useState, useCallback } from 'react';
import { RefreshControl, View, StyleSheet, ScrollView } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { navigate } from 'navigationRef';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from 'components/LoadingIndicator'
import { PlaylistHeader } from 'components/Header';
import PlaylistsLikes from 'components/Playlist/PlaylistsLikes';
import SongsLists from 'components/Playlist/SongsLists';
import HashtagLists from 'components/Playlist/HashtagLists';
import Thumbnail from 'components/Playlist/Thumbnail';
import CommentBar from 'components/Playlist/CommentBar';
import Comments from 'components/Playlist/Comments';
import PlaylistProvider from 'providers/playlist';
import MusicBar from 'components/MusicBar'
import { useTrackPlayer } from 'providers/trackPlayer'
import { tmpWidth } from 'components/FontNormalize'
import { useRefresh } from 'providers/refresh';

const SelectedPlaylist = ({ route }) => {
    const { state, getPlaylist } = useContext(PlaylistContext);
    const { state: searchState } = useContext(SearchPlaylistContext);
    const { id: playlistid } = route.params;

    const [tok, setTok] = useState(false);
    const [hashtag, setHashtag] = useState('');
    const [deletedModal, setDeletedModal] = useState(false);

    const [currentPlaylist, setCurrentPlaylist] = useState(state.current_playlist)
    const [comments, setComments] = useState(state.current_comments);
    const [currentSongs, setCurrentSongs] = useState(state.current_songs)
    const { refreshing, onRefresh, setRefresh } = useRefresh()
    const { isPlayingId } = useTrackPlayer()

    const fetchData = () => {
        getPlaylist({id:state.current_playlist._id, postUserId:state.current_playlist.postUserId._id})
    };

    const recommendedClick = () => {
        comments.sort(function(a, b) {
            if(a.likes.length > b.likes.length) return -1;
            if(a.likes.length < b.likes.length) return 1;
            return 0;
        })
        setTok(!tok);
    }

    const newestClick = () => {
        comments.reverse();
        setTok(!tok);
    }

    useFocusEffect(
        useCallback(() => {
            setCurrentSongs(state.current_songs)
        }, [])
    )

    useEffect(() => {
        if(state.current_playlist != null && state.current_playlist._id == playlistid)    setComments(state.current_comments)
    }, [playlistid, state.current_comments])

    useEffect(() => {
        if(state.current_playlist != null && state.current_playlist._id == playlistid)  setCurrentPlaylist(state.current_playlist)
    }, [playlistid, state.current_playlist])

    useEffect(() => {
        if(searchState.hashtag != null && hashtag != '') navigate('SelectedHashtag', {data: searchState.hashtag });
    }, [searchState.hashtag])

    useEffect(() => {
        if(state.current_playlist != null && state.current_playlist.length == 0)    setDeletedModal(true);
    },[state.current_playlist])

    useEffect(() => {
        setRefresh(fetchData)
    }, [])

    return (
        <View style={styles.container}>
            { currentPlaylist == null ? <LoadingIndicator /> :
            <View style={styles.mainContainer}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }  
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[0]}
                >
                    <PlaylistHeader title={currentPlaylist.title} />
                    <PlaylistProvider>
                        <PlaylistsLikes playlist={currentPlaylist} />
                    </PlaylistProvider>    
                    <SongsLists songs={currentSongs} container={styles.songContainer} />
                    <HashtagLists hashtag={currentPlaylist.hashtag} setHashtag={setHashtag} />
                    <Thumbnail img={currentPlaylist.image} />
                    <PlaylistProvider>
                        <Comments comments={comments} />
                    </PlaylistProvider>
                </ScrollView>
                { isPlayingId === '0' ? 
                <CommentBar playlistId={playlistid} /> : 
                <MusicBar /> }
            </View> }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(251,251,251)',
        flex: 1
    },
    mainContainer: {
        justifyContent: 'space-between', 
        height: '100%', 
        flex: 1,
    },
    songContainer: { 
        paddingLeft: 18 * tmpWidth, 
        marginTop: 16 * tmpWidth,
    },
});

export default SelectedPlaylist;
