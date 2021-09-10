import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { RefreshControl, View, Text, Image, StyleSheet, ActivityIndicator ,TextInput, TouchableOpacity, FlatList, ScrollView, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { navigate, push, goBack } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import ReportModal from 'components/ReportModal';
import DeleteModal from 'components/DeleteModal';
import HarmfulModal from 'components/HarmfulModal';
import DeletedModal from 'components/DeletedModal';
import { SongImage } from 'components/SongImage'
import { stoptracksong } from 'components/TrackPlayer'
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

const SelectedPlaylist = ({ route }) => {
    const { state, addComment, getreComment, addreComment, likesPlaylist, unlikesPlaylist, likescomment, 
        unlikescomment, likesrecomment, unlikesrecomment, initRecomment, getPlaylist } = useContext(PlaylistContext);
    const { state: userState, getOtheruser, addSonginPlaylists } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);

    const { state: searchState, SearchHashtag } = useContext(SearchPlaylistContext);
    const { id: playlistid } = route.params;
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [showModal, setShowModal] = useState('0');
    const [currentcommentid, setCurrentcommentid] = useState('');
    const [tok, setTok] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [commentDeleteModal, setCommentDeleteModal] = useState(false);
    const [reCommentDeleteModal, setReCommentDeleteModal] = useState(false);
    const [reportModal, setReportModal] = useState(false);
    const [commentReportModal, setCommentReportModal] = useState(false);
    const [reportId, setReportId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [hashtag, setHashtag] = useState('');
    const [harmfulModal, setHarmfulModal] = useState(false);
    const [deletedModal, setDeletedModal] = useState(false);
    const [weeklyModal, setWeeklyModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    const [completeModal, setCompleteModal] = useState(false);

    const opacity = useState(new Animated.Value(1))[0];
    const [currentPlaylist, setCurrentPlaylist] = useState(state.current_playlist)
    const [comments, setComments] = useState(state.current_comments);
    const [currentSongs, setCurrentSongs] = useState(state.current_songs)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }

    const fetchData = async () => {
        setRefreshing(true);
        await getPlaylist({id:state.current_playlist._id, postUserId:state.current_playlist.postUserId._id})
        setRefreshing(false);
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

    const addtracksong= async ({data}) => {
        setSelectedSong(data)
        const track = new Object();
        track.id = data.id;
        track.url = data.attributes.previews[0].url;
        track.title = data.attributes.name;
        track.artist = data.attributes.artistName;
        if (data.attributes.contentRating != "explicit") {
            setIsPlayingid(data.id);
            await TrackPlayer.reset()
            await TrackPlayer.add(track);
            TrackPlayer.play();
        } else {
            setHarmfulModal(true)
        }
    };

    const onClickMusicPlus = ({song}) => {
        setCompleteModal(true)
        addSonginPlaylists({song})
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
            }).start()
            setTimeout(() => {
                setCompleteModal(false)
                opacity.setValue(1);
            }, 1000)
        }, 1000);
    }

    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])

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
        if(searchState.playList != null && hashtag != '') navigate('SelectedHashtag', {data: searchState.playList, text: hashtag, searchOption : 'Hashtag' });
    }, [searchState.playList])

    useEffect(() => {
        if(state.current_playlist != null && state.current_playlist.length == 0)    setDeletedModal(true);
    },[state.current_playlist])

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
                    <SongsLists songs={currentSongs} />
                    <HashtagLists hashtag={currentPlaylist.hashtag} setHashtag={setHashtag} />
                    <Thumbnail img={currentPlaylist.image} />
                    <PlaylistProvider>
                        <Comments comments={comments} />
                    </PlaylistProvider>
                </ScrollView>
                <CommentBar playlistId={playlistid} />
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
});

export default SelectedPlaylist;
