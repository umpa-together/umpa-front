import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { tmpWidth } from '../FontNormalize';
import { Context as PlaylistContext } from '../../context/PlaylistContext';

const AllPlaylistForm = ({navigation}) => {
    const { state, getPlaylist, nextAllPlaylists, getAllPlaylists} = useContext(PlaylistContext)
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
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
    const fetchData = async () => {
        setRefreshing(true);
        await getAllPlaylists()
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
        <View style={styles.result}>
            { state.allPlaylists == null ? <View style={{flex: 1,justifyContent: 'center', alignContent: 'center'}}><ActivityIndicator/></View> :
            <FlatList 
                numColumns={2}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListFooterComponent={loading && <ActivityIndicator />}
                data={state.allPlaylists}
                keyExtractor={playlist=>playlist._id}
                renderItem={({item}) => {
                    return (
                        <View style={{width: 161 * tmpWidth, marginRight: 14 * tmpWidth, marginBottom: 10 * tmpWidth}}>
                            <TouchableOpacity onPress={async () => {
                                await getPlaylist({id:item._id, postUserId:item.postUserId._id})
                                navigation.push('SelectedPlaylist', {id: item._id, navigation: navigation, postUser: item.postUserId._id})
                            }}>
                                <View style={{width: 161 * tmpWidth, height: 157 * tmpWidth, borderRadius: 8 * tmpWidth, marginBottom: 10 * tmpWidth}}>
                                    <Image style={ {width:'100%', height:'100%', borderRadius:8 * tmpWidth}} source={{url :item.image}}/>
                                </View>
                                <View style={{width:161 * tmpWidth}}>
                                    <Text numberOfLines ={2} style={{fontSize: 14 * tmpWidth, color:"rgba(79,79,79,1)"}}>{item.title}</Text>
                                </View>
                                <View style={{width:161 * tmpWidth, flexDirection:'row', marginTop: 8 * tmpWidth}}>
                                <Text numberOfLines ={1} style={{fontSize:12 * tmpWidth, color:'rgba(153,153,153,1)',}}>
                                {item.hashtag.map((hashtag,index) => {
                                     return (
                                         <Text style={{fontSize:12 * tmpWidth, color:'rgba(153,153,153,1)', marginRight:6 * tmpWidth}}>{'#'+hashtag}  </Text>
                                     )})}
                                </Text>
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
    result:{
        marginTop:18 * tmpWidth,
        paddingLeft:20 * tmpWidth,
        height: '100%',
        paddingBottom: 18 * tmpWidth,
    }
})

export default AllPlaylistForm;
