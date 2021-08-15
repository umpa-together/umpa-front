import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { Context as UserContext } from '../../context/UserContext';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { tmpWidth } from '../../components/FontNormalize';
import LoadingIndicator from '../LoadingIndicator';
import { push } from '../../navigationRef';

export default LikePlaylists = () => {
    const { state, getLikePlaylists } = useContext(UserContext);
    const { getPlaylist } = useContext(PlaylistContext)
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setRefreshing(true);
        await getLikePlaylists()
        setRefreshing(false);
    };

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }

    const onClickPlaylist = async (id, postUserId) => {
        await getPlaylist({ id, postUserId })
        push('SelectedPlaylist', {id, postUser: postUserId})
    }

    return (
        <View style={styles.container}>
            {state.likePlaylists == null ? <LoadingIndicator /> : 
            <FlatList 
                numColumns={2}
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={state.likePlaylists}
                keyExtractor={playlist=>playlist._id}
                contentContainerStyle={{paddingBottom: 18 * tmpWidth}}
                renderItem={({item}) => {
                    return (
                        <View style={styles.playlistGrid}>
                            <TouchableOpacity 
                                onPress={() => onClickPlaylist(item._id, item.postUserId)}
                            >
                                <View style={styles.thumbnail}>
                                    <Image style={styles.img} source={{url :item.image}}/>
                                </View>
                                <View style={styles.titleArea}>
                                    <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                                </View>
                                <View style={styles.hashtagArea}>
                                    { item.hashtag.length > 0 &&
                                    <Text numberOfLines={1} style={styles.hashtag}>
                                        {'#' + item.hashtag.join(' #')}
                                    </Text> }
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            /> }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginTop: 20 * tmpWidth,
        paddingLeft: 20 * tmpWidth,
        flex: 1,
    },
    playlistGrid: {
        width: 161 * tmpWidth, 
        marginRight: 14 * tmpWidth, 
        marginBottom: 10 * tmpWidth, 
    },
    thumbnail: {
        width: 161 * tmpWidth, 
        height: 157 * tmpWidth, 
        borderRadius: 8 * tmpWidth, 
        marginBottom: 10 * tmpWidth, 
    },
    img: {
        width: '100%', 
        height: '100%', 
        borderRadius: 8 * tmpWidth
    },
    titleArea: {
        width: 161 * tmpWidth
    },
    title: {
        fontSize: 14 * tmpWidth, 
        color: "rgba(79,79,79,1)"
    },
    hashtagArea: {
        width: 161 * tmpWidth, 
        flexDirection: 'row', 
        marginTop: 8 * tmpWidth,
    },
    hashtag: {
        fontSize: 12 * tmpWidth, 
        color: 'rgba(153,153,153,1)',
    }
})