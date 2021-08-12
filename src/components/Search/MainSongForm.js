import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { Context as SearchContext } from '../../context/SearchContext';
import { Context as SearchPlaylistContext } from '../../context/SearchPlaylistContext';
import { Context as WeeklyContext } from '../../context/WeeklyContext';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { Context as CurationContext } from '../../context/CurationContext';
import { Context as DJContext } from '../../context/DJContext';

import SvgUri from 'react-native-svg-uri';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../FontNormalize';
import LinearGradient from 'react-native-linear-gradient';
import { SongImage } from '../SongImage'

const MainSongForm = ({navigation}) => {
    const { state, currentHashtag } = useContext(SearchContext);
    const { SearchHashtag } = useContext(SearchPlaylistContext);
    const { state: weeklyState } = useContext(WeeklyContext);
    const { getPlaylist, getAllPlaylists } = useContext(PlaylistContext);
    const { getCuration, getAllCurationPost } = useContext(CurationContext);
    const {state : djstate, suggestDJ} = useContext(DJContext);
    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        currentHashtag()
    }, [])
    return (
        <ScrollView>
            <View style={{height: '100%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 * tmpWidth, marginBottom: 18 * tmpWidth, alignItems: 'center'}}>
                    <Text style={styles.headertext}>위클리 플레이리스트</Text>
                    <TouchableOpacity onPress={async () => {
                        await getAllPlaylists()
                        navigate('AllContents', {type: '플레이리스트'})
                    }}>
                        <Text style={styles.subheaderText}>플레이리스트 둘러보기 {'>'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', height:240 * tmpWidth}}>
                    <Animated.FlatList
                        data={weeklyState.weeklyPlaylist}
                        keyExtractor = {playlists => playlists._id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={344*tmpWidth }
                        decelerationRate={0}
                        bounces={false}
                        scrollEventThrottle={16}
                        contentContainerStyle={{paddingLeft: 18 * tmpWidth, paddingRight: 6 * tmpWidth}}
                        onScroll = {Animated.event(
                            [{ nativeEvent: {contentOffset: {x: scrollX } } }]
                        )}
                        renderItem={({item})=> {
                            return (
                                <TouchableOpacity style={styles.playlistitem} onPress={async () => {
                                    await getPlaylist({id:item._id, postUserId:item.postUserId._id})
                                    navigation.push('SelectedPlaylist', {id: item._id, navigation: navigation, postUser: item.postUserId._id})
                                }}>
                                    <View style={{position:'absolute', width:'100%', height:'100%'}} >
                                        <Image style ={{height:'100%', width:'100%', borderRadius: 8 * tmpWidth}} source ={{uri:item.image}}/>
                                    </View>
                                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)','rgba(0,0,0,0.1)' ]} style={styles.playlistitem2}>
                                    <View style={{flexDirection:'row' ,width:331 * tmpWidth, height:40 * tmpWidth}}>
                                        <View style={styles.playlistprofile}>
                                            {item.postUserId.profileImage == null ?
                                            <View style={{width:20 * tmpWidth, height:20 * tmpWidth, borderRadius:12 * tmpWidth, backgroundColor:'#fff'}}>
                                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />

                                            </View>
                                             :
                                            <Image style={{width:20 * tmpWidth, height:20 * tmpWidth, borderRadius:12 * tmpWidth}} source={{uri: item.postUserId.profileImage}} />}
                                        </View>
                                        <Text style={styles.playlistusertext}>{item.postUserId.name}</Text>
                                    </View>
                                    <View style={styles.playlistinfo}>
                                        <Text style={{fontSize:14 * tmpWidth,color:"#fff", marginRight:12 * tmpWidth,fontWeight:'bold', marginBottom:tmpWidth*4}}>{item.title}</Text>
                                        <Text style={{fontSize:12 *tmpWidth, color:'rgba(255,255,255,0.8)',marginRight:12 * tmpWidth, marginBottom:tmpWidth*8}}>{item.hashtag.map(hashtag => ' #'+hashtag+'')}</Text>
                                    </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={()=>{suggestDJ();}}><Text>추천갱신</Text></TouchableOpacity>
                    <Animated.FlatList
                        data={djstate.suggestDJ}
                        keyExtractor = {playlists => playlists._id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={344*tmpWidth }
                        decelerationRate={0}
                        bounces={false}
                        scrollEventThrottle={16}
                        contentContainerStyle={{paddingLeft: 18 * tmpWidth, paddingRight: 6 * tmpWidth}}
                        onScroll = {Animated.event(
                            [{ nativeEvent: {contentOffset: {x: scrollX } } }]
                        )}
                        renderItem={({item})=> {
                            return (
                                <Text>{item.name}</Text>
                            )
                        }}
                    />
                </View>
                <View style={styles.hashtag}>
                    <Text style={{fontSize: 16 * tmpWidth, color:'rgb(80,80,80)'}}>지금 뜨는 해시태그</Text>
                    <TouchableOpacity onPress={() => currentHashtag()}>
                        <SvgUri width={25 * tmpWidth} height={25 * tmpWidth} source={require('../../assets/icons/refresh.svg')} style={{marginLeft:4 * tmpWidth}} />
                    </TouchableOpacity>
                </View>
                <View style={styles.hashtagitem}>
                    {state.currentHashtag != null && state.currentHashtag.map(item => {
                        return (
                            <TouchableOpacity
                                key={item._id}
                                onPress={() => {
                                    navigate('SelectedHashtag', {data: item, text: item.hashtag, searchOption: 'Hashtag'})
                                    SearchHashtag({ object: item.hashtag })
                            }}>
                                <Text style={styles.hashtagbox}>#{item.hashtag}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
};

const styles=StyleSheet.create({
    headertext:{
        marginLeft: 24 * tmpWidth,
        fontSize: 16 * tmpWidth,
        fontWeight: '500'
    },
    subheaderText: {
        marginRight: 12 * tmpWidth,
        color: 'rgb(153,153,153)'
    },
    playlistitem:{
        width:331 * tmpWidth,
        height:224 * tmpWidth,
        borderRadius:8 * tmpWidth,
        backgroundColor:'#aaa',
        marginLeft:6 * tmpWidth,
        marginRight: 6 * tmpWidth,
        shadowColor: "rgb(99, 99, 99)",
        shadowOffset: {
            height: 2 * tmpWidth,
            width: 2 * tmpWidth,
        },
        shadowRadius: 2 * tmpWidth,
        shadowOpacity: 0.3,
        elevation: 5
    },
    playlistitem2:{
        width:331* tmpWidth,
        height:224 * tmpWidth,
        borderRadius:8 * tmpWidth,
    },
    playlistprofile:{
        marginLeft:12 * tmpWidth,
        marginTop:12 * tmpWidth,
        width:20 * tmpWidth,
        height:20 * tmpWidth,
        borderRadius:12 * tmpWidth
    },
    playlistusertext:{
        fontSize:14 * tmpWidth,
        marginTop:15 * tmpWidth,
        marginLeft:8 * tmpWidth,
        color:'rgba(255,255,255,0.72)',
        opacity:0.72
    },
    playlistinfo:{
        width:331 * tmpWidth,
        height:184 * tmpWidth,
        marginBottom:6 * tmpWidth,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    curationtext:{
        marginLeft: 24 * tmpWidth,
        fontSize: 16 * tmpWidth,
        fontWeight: '500'
    },
    subCurationText: {
        marginRight: 12 * tmpWidth,
        color: 'rgb(153,153,153)',
    },
    hashtag:{
        marginTop: 26 * tmpWidth,
        marginLeft: 24 * tmpWidth,
        marginBottom: 14 * tmpWidth,
        fontSize: 16 * tmpWidth ,
        flexDirection: 'row',
        alignItems:'center'
    },
    hashtagitem:{
        width:327 * tmpWidth,
        marginLeft:24 * tmpWidth,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20 * tmpWidth,
    },
    hashtagbox:{
        borderWidth: 1 * tmpWidth,
        borderColor:'rgb(169,193,255)',
        borderRadius:16 * tmpWidth,
        color:'rgb(169,193,255)',
        paddingTop: 7 * tmpWidth,
        paddingBottom:7 * tmpWidth,
        paddingRight: 10 * tmpWidth,
        paddingLeft: 10 * tmpWidth,
        marginRight:8 * tmpWidth,
        marginBottom:12 * tmpWidth
    },
});

export default MainSongForm;
