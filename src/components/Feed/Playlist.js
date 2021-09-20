import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth, tmpHeight } from 'components/FontNormalize';
import LinearGradient from 'react-native-linear-gradient';
import { push } from 'navigationRef';
import PostUser from './PostUser'
import SongsLists from 'components/Playlist/SongsLists'
import Footer from './Footer'

const Playlist = ({ playList }) => {
    const { _id: id, hashtag, comments, likes, postUserId: postUser, songs, textcontent: content } = playList

    const { state: playlistState, likesPlaylist, unlikesPlaylist, getPlaylists, nextPlaylists, getPlaylist } = useContext(PlaylistContext);
    const { state, getOtherStory } = useContext(UserContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const getData = async () => {
        if(playList.length >= 20 && !playlistState.notNext){
            setLoading(true);
            await nextPlaylists({ page: playlistState.currentPlaylistPage });
            setLoading(false);
        }
    };

    const onEndReached = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };

    const fetchData = async () => {
        setRefreshing(true);
        await Promise.all([
            getPlaylists(),
            getOtherStory()
        ])
        setRefreshing(false);
    };

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }
    return (
        <View style={styles.container}>
            <PostUser user={postUser} />
            <View style={styles.contentArea}>
                <Text style={styles.content} numberOfLines={3}>{content}</Text>
            </View>
            <SongsLists 
                songs={songs} 
                container={styles.songsContainer} 
            />
            <Footer 
                hashtag={hashtag}
                likes={likes}
                comments={comments}
                id={id}
            />
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: '#dcdcdc',
        paddingBottom: 4 * tmpWidth,
    },
    contentArea: {
        marginRight: 18 * tmpWidth,
        marginTop: 8 * tmpWidth,
        paddingLeft: 18 * tmpWidth
    },
    content: {
        fontSize: 14 * tmpWidth,
        fontWeight: '500',
        lineHeight: 24 * tmpWidth
    },
    songsContainer: {
        paddingLeft: 18 * tmpWidth,
        marginTop: 6 * tmpWidth
    },

});

export default Playlist;
