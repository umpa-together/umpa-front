import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { Context as UserContext } from '../../context/UserContext';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth, tmpHeight } from '../FontNormalize';
import LinearGradient from 'react-native-linear-gradient';


const Playlist = ({ playList, navigation }) => {
    const { state: playlistState, likesPlaylist, unlikesPlaylist, getPlaylists, nextPlaylists } = useContext(PlaylistContext);
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
        <View>
            {state.otherStory != null ? 
            <View style={state.otherStory.length == 0 ? styles.noStoryContainer : styles.hasStoryContainer}>
                { playList.length !=0 ?
                <FlatList
                    data ={playList}
                    keyExtractor = {playlists => playlists._id}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    ListFooterComponent={loading && <ActivityIndicator />}
                    renderItem = {({item}) => {
                        return (
                            <View style={styles.playlist}>
                                <View style={{width: 335 * tmpWidth, height: 226 * tmpWidth, }}>
                                <TouchableOpacity style={{width: 335 * tmpWidth, height: 212 * tmpWidth, }} onPress={async () => {
                                    navigation.push('SelectedPlaylist', {id: item._id , postUser: item.postUserId, navigation: navigation})
                                }}>
                                        <View style={styles.backpic}>
                                            <Image style={styles.backpicimg} source={{uri: item.image}} />
                                        </View>
                                        <View style={styles.playlisthead}>
                                        <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)']} style={{width:tmpWidth*335, marginLeft:0*tmpWidth, height:tmpHeight*80,flexDirection:'row',borderTopLeftRadius:16*tmpWidth, borderTopRightRadius:16*tmpWidth}} source={require('../../assets/icons/backgrad.png')}>

                                        <View style={{width:tmpWidth*335, height:tmpHeight*80, flexDirection:'row',borderTopLeftRadius:16*tmpWidth, borderTopRightRadius:16*tmpWidth}}>

                                            <View style={styles.profile}>
                                            {item.postUserId.profileImage == null ?
                                            <View style={styles.profileno}>
                                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                            </View> : <Image style={styles.profileimg} source={{uri: item.postUserId.profileImage}} />}
                                            </View>
                                            <View style={{marginLeft:8*tmpWidth}}>
                                                <View>
                                                    <Text style={{fontSize:12*tmpWidth, color:'#fff',marginLeft:5*tmpWidth, marginTop:tmpWidth*16}}>{item.postUserId.name}</Text>
                                                </View>
                                                <View style={styles.viewicon}>
                                                    <SvgUri width={28 * tmpWidth} height={28 * tmpWidth} source={require('../../assets/icons/likeslength.svg')} style={{}}/>
                                                    <Text style={{fontSize:12 * tmpWidth,color:'rgb(255,255,255)'}}>{item.likes.length}</Text>
                                                    <SvgUri width={28 * tmpWidth} height={28 * tmpWidth} source={require('../../assets/icons/mainplaylistview.svg')} style={{marginLeft:tmpWidth*4}}/>
                                                    <Text style={{fontSize:12 * tmpWidth,color:'rgb(255,255,255)'}}>{item.views}</Text>
                                                </View>
                                            </View>
                                            </View>
                                        </LinearGradient>  
                                        </View>
                                        <View style={styles.playlistinfo}>

                                            <View style={{width: 335/5*4 * tmpWidth, height: 59* tmpWidth}}>
                                               <View style={{width:335/5*4*tmpWidth, height:59/2*tmpWidth}}>
                                                <Text numberOfLines= {1} style={styles.title}>{item.title}</Text>
                                               </View>
                                               <View style={{ overflow :'hidden', flexWrap: 'wrap', width:335/5*4*tmpWidth, paddingLeft:16*tmpWidth,flexDirection:'row',height:59/2*tmpWidth}}>
                                                {item.hashtag != null && item.hashtag.map(el => {
                                                    return (
                                                    <View style={styles.hashtagbox}>
                                                        <Text style={styles.hashtag}>#{el}</Text>
                                                     </View>
                                                    )
                                                })}
                                               </View>
                                            </View>
                                            <View style={styles.likeicon}>
                                            { item.likes.includes(state.myInfo._id) ?
                                                <TouchableOpacity onPress={()=>{unlikesPlaylist({id: item._id});         item.likes = item.likes.filter(id => id.toString() != state.myInfo._id.toString()); }}>
                                                    <SvgUri width='40' height='40' source={require('../../assets/icons/postplaylistfilled.svg')} style={{marginRight: 8 * tmpWidth, marginTop:8*tmpWidth}}/>
                                                </TouchableOpacity> :
                                                <TouchableOpacity onPress={()=>{likesPlaylist({id: item._id}); item.likes.push(state.myInfo._id); }}>
                                                    <SvgUri width='40' height='40' source={require('../../assets/icons/frame.svg')} style={{marginRight: 8 * tmpWidth, marginTop:8*tmpWidth }}/>
                                                </TouchableOpacity> }
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                /> : 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'rgb(93,93,93)'}}>팔로우한 사람이 올린 플레이리스트가 없습니다.</Text>
                    <Text style={{color: 'rgb(93,93,93)', marginTop: 10 * tmpWidth}}>다른 사람들을 팔로우 해보세요!</Text>
                </View> }
            </View> : null }
        </View>
    );
};

const styles=StyleSheet.create({
    hasStoryContainer: {
        backgroundColor:"rgb(254,254,254)",
        height:525 * tmpHeight,
        width:375 * tmpWidth,
        paddingTop:10*tmpWidth,
    },
    noStoryContainer: {
        backgroundColor:"rgb(254,254,254)",
        height: 625 * tmpHeight, 
        width:375 * tmpWidth,
        paddingTop:10*tmpWidth,
    },
    playlist:{
        width:375 * tmpWidth,
        alignItems: 'center',
        marginBottom: 20 * tmpWidth,
        shadowColor : "#E0E0E0",
        shadowRadius: 3 * tmpWidth,
        shadowOffset:{height:0,},
        shadowOpacity : 1,
        height: 226 * tmpWidth,
    },
    backpic:{
        position: 'absolute',
        width: '100%',
        height: '75.4%',
    },
    backpicimg:{
        width:'100%',
        height:'100%',
        borderTopLeftRadius: 16 * tmpWidth,
        borderTopRightRadius:16 * tmpWidth
    },
    playlisthead:{
        flexDirection: 'row',
        width: 335 * tmpWidth,
        height: 160 * tmpWidth,
        borderBottomLeftRadius:16 * tmpWidth,
        borderBottomRightRadius:16 * tmpWidth,
    },
    profile:{
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        borderRadius: 40 * tmpWidth,
        marginLeft:12 * tmpWidth,
        marginTop:14 * tmpWidth,
    },
    profileno:{
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        borderRadius: 40 * tmpWidth,
    },
    profileimg:{
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        borderRadius: 50 * tmpWidth
    },
    viewicon:{
        flexDirection: 'row',
        width:100 * tmpWidth,
        alignItems:'center'
    },
    playlistinfo:{
        flexDirection:'row',
        width: 335 * tmpWidth,
        height: 66 * tmpWidth ,
        flexDirection:'row',
        backgroundColor:'#fff',
        borderBottomLeftRadius:10 * tmpWidth,
        borderBottomRightRadius:10 * tmpWidth,

    },
    title:{
        color:'rgb(0,0,0)',
        fontSize:12 * tmpWidth,
        marginLeft:16 * tmpWidth,
        marginTop:8 * tmpWidth
    },
    title:{
        marginLeft:16 * tmpWidth,
        marginTop:12 * tmpWidth,
        fontSize:12 * tmpWidth,
    },
    likeicon:{
        width: 335/5 * tmpWidth,
        height: 51 * tmpWidth,
        alignItems:'flex-end',
        marginRight:6 * tmpWidth
    },
    hashtag:{
        color:'rgb(169,193,255)' ,
        fontSize:12*tmpWidth,
    },
    hashtagbox:{
        marginBottom:13*tmpWidth,
        borderRadius:100,
        height:20*tmpWidth,
        paddingLeft:5*tmpWidth,
        paddingRight:5*tmpWidth,
        paddingTop:2*tmpWidth,
        paddingBottom:2*tmpWidth,
        borderWidth: 1 * tmpWidth,
        marginTop:tmpWidth*3,
        borderColor:'rgb(169,193,255)' ,
        marginRight:6*tmpWidth,
    },
});

export default Playlist;
