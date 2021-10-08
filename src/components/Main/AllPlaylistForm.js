import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { push } from 'navigationRef';
import LoadingIndicator from '../LoadingIndicator'
import { useRefresh } from 'providers/refresh';

const AllPlaylistForm = () => {
    const { state, getPlaylist, nextAllPlaylists, getAllPlaylists } = useContext(PlaylistContext)
    const [loading, setLoading] = useState(false);
    const { refreshing, onRefresh, setRefresh } = useRefresh()
    
    const getData = async () => {
        if(state.allPlaylists.length >= 20 && !state.notAllPlaylistsNext){
            setLoading(true);
            await nextAllPlaylists({ page: state.currentAllPlaylistsPage });
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

    useEffect(() => {
        getAllPlaylists()
        setRefresh(getAllPlaylists)
    }, [])

    return (
        <View style={styles.container}>
            { state.allPlaylists == null ? <LoadingIndicator /> :
            <FlatList 
                numColumns={3}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListFooterComponent={loading && <ActivityIndicator />}
                data={state.allPlaylists}
                keyExtractor={playlist=>playlist._id}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity 
                            onPress={async () => {
                                await getPlaylist({id:item._id, postUserId:item.postUserId._id})
                                push('SelectedPlaylist', {id: item._id, postUser: item.postUserId._id})
                            }}
                            style={index%3 === 1 && styles.secondColumn}
                        >
                            <Image style={styles.img} source={{url :item.image}}/>
                        </TouchableOpacity>
                    )
                }}
            /> }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        marginTop: 8 * tmpWidth,
        paddingLeft: 8 * tmpWidth,
        height: '100%',
    },
    img: {
        borderRadius: 4 * tmpWidth,
        width: 117 * tmpWidth, 
        height: 117 * tmpWidth, 
        marginBottom: 4 * tmpWidth, 
        marginRight: 4 * tmpWidth
    },
    secondColumn: {
        marginTop: 12 * tmpWidth,
        marginBottom: -12 * tmpWidth,
    }
})

export default AllPlaylistForm;
