
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity,  ScrollView, RefreshControl, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgUri from 'react-native-svg-uri';
import {Context as PlaylistContext} from 'context/PlaylistContext';
import {Context as UserContext} from 'context/UserContext';
import {Context as DJContext} from 'context/DJContext';
import { push } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import RepresentSong from 'components/RepresentSong';
import { useRefresh } from 'providers/refresh';

const Recommend = () => {
    const { getPlaylist } = useContext(PlaylistContext);
    const { getOtheruser, getMyInfo, follow, unfollow } = useContext(UserContext);
    const { state: djState, recommendDJ, getSongs } = useContext(DJContext);
    const [representSong, setRepresentSong] = useState(null);
    const [representModal, setRepresentModal] = useState(false);
    const { refreshing, onRefresh, setRefresh } = useRefresh()
    const [isFollow, setIsFollow] = useState([]);
    const [result, setResult] = useState('playlist');
    const scrollX = useRef(new Animated.Value(0)).current;
    
    useEffect(()=>{
        recommendDJ();
        setRefresh(getMyInfo)
    }, []);

    return (
        <LinearGradient colors={['rgb(219,229,255)', 'rgba(209,218,255,0)']} style={{flex: 1}}>
            <View style={styles.opt}>
                <View style={styles.optleft}>
                    <TouchableOpacity style={styles.opt1} onPress={() => setResult('playlist')}>
                        {result == 'playlist' ? <Text style={{fontSize: 18 * tmpWidth}}>플레이리스트</Text> : <Text style={{fontSize: 18 * tmpWidth, color:'gray'}}>플레이리스트</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opt2} onPress={() => setResult('curating')}>
                        {result == 'curating' ? <Text style={{fontSize: 18 * tmpWidth}}>큐레이션</Text> : <Text style={{fontSize: 18 * tmpWidth, color:'gray'}}>큐레이션</Text> }
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
            <View style={styles.openingContainer}>
                <Text style={{fontSize: 18 * tmpWidth, marginBottom: 13 * tmpWidth}}>환영합니다!</Text>
                <Text style={styles.openingText}>취향이 비슷한 사람을 팔로우하고</Text>
                <Text style={styles.openingText}>피드에서 감상할 수 있어요.</Text>
            </View>
            <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                data={djState.recommendDJ}
                keyExtractor={dj => dj._id}
                horizontal={true}
                snapToInterval={266*tmpWidth}
                contentContainerStyle={{marginTop: 60 * tmpWidth, paddingLeft: 54.5 * tmpWidth, paddingRight: 54.5 * tmpWidth}}
                decelerationRate={0}
                bounces={false}
                scrollEventThrottle={16}
                onScroll = {Animated.event(
                    [{ nativeEvent: {contentOffset: {x: scrollX } } }],
                    {useNativeDriver: false}
                )}
                renderItem={({item, index})=>{
                    const inputRange = [
                        (index-1) * (266 * tmpWidth),
                        index * (266 * tmpWidth),
                        (index+1) * (266 * tmpWidth)
                    ];
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, -30, 0]
                    })
                    return (
                        <Animated.View style={{
                            width: 236 * tmpWidth,
                            height: 340 * tmpWidth,
                            backgroundColor: 'rgba(255,255,255,1)',
                            borderRadius: 16 * tmpWidth,
                            shadowColor: "rgb(0, 0, 0)",
                            shadowOffset: {
                                height: 4 * tmpWidth,
                                width: 0,
                            },
                            shadowRadius: 20 * tmpWidth,
                            shadowOpacity: 0.07,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 15 * tmpWidth,
                            marginRight: 15 *tmpWidth,
                            transform: [{translateY}]
                        }}>
                            <TouchableOpacity onPress={async () => {
                                await Promise.all([getOtheruser({id:item._id}),
                                getSongs({id:item._id})]);
                                push('OtherAccount', {otherUserId:item._id})
                            }}>
                                { item.profileImage == undefined ?
                                <View style={styles.djProfile}>
                                   <SvgUri width='100%' height='100%' source={require('assets/icons/noprofile.svg')} />
                                </View> :
                                <Image style={styles.djProfile} source={{uri: item.profileImage}}/> }
                            </TouchableOpacity>
                            <Text style={styles.userText}>{item.name}</Text>
                            <TouchableOpacity style={styles.representSongBox} onPress={() => {
                                setRepresentModal(true)
                                setRepresentSong(item.songs)
                            }}>
                                <Text style={styles.representText} numberOfLines={1}>대표곡 - {item.songs[0].attributes.name}</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', marginTop: item.playlist.length == 0 ? 0 : 18 * tmpWidth}}>
                                {item.playlist.length != 0 ? 
                                item.playlist.slice(0,3).map(playlist => {
                                    return (
                                        <TouchableOpacity key={playlist['image']} onPress={async () => {
                                            await getPlaylist({id:playlist['_id'], postUserId:item._id})
                                            push('SelectedPlaylist', {id: playlist['_id'], postUser: item._id})
                                        }}>
                                            <Image style={styles.playlistBox} source={{uri: playlist['image']}}/>
                                        </TouchableOpacity>
                                    )
                                }): null}
                            </View>
                            {isFollow.includes(index) ? 
                            <TouchableOpacity style={styles.followingBox} onPress={async () => {
                                await unfollow({id:item._id})
                                setIsFollow(isFollow.filter(item => item!=index))
                            }}>
                                <Text style={styles.followingText}>팔로잉</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.followBox} onPress={async () => {
                                await follow({id:item._id})
                                setIsFollow([...isFollow, index])
                            }}>
                                <Text style={styles.followText}>팔로우</Text>
                            </TouchableOpacity> }
                        </Animated.View>
                    )
                }}
            />
            {representSong != null ? <RepresentSong representModal={representModal} song={representSong} setRepresentModal={setRepresentModal} /> : null }
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    openingContainer: {
        alignItems: 'center', 
        marginTop: 60 * tmpWidth,
    },
    openingText: {
        fontSize: 16 * tmpWidth, 
        color: 'rgb(95,103,119)'
    },
    userText: {
        fontSize: 14 * tmpWidth, 
        marginTop: 15 * tmpWidth, 
        marginBottom: 14 * tmpWidth
    },
    representText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(169,193,255)'
    },
    followingText: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(93,93,93)'
    },
    followText: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(255,255,255)'
    },
    recommendBox: {
        width: 236 * tmpWidth,
        height: 340 * tmpWidth,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 16 * tmpWidth,
        shadowColor: "rgba(0, 0, 0, 0.07)",
        shadowOffset: {
            height: 4 * tmpWidth,
            width: 0,
        },
        shadowRadius: 20 * tmpWidth,
        shadowOpacity: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30 * tmpWidth,
        marginRight: 30 *tmpWidth
    },
    djProfile: {
        width: 92 * tmpWidth,
        height: 92 * tmpWidth,
        borderRadius: 92 * tmpWidth,
    },
    representBox: {
        flexDirection: 'row', 
        marginTop: 20 * tmpWidth,
        justifyContent: 'center'
    },
    representSongBox: {
        paddingTop: 4 * tmpWidth,
        paddingBottom: 4 * tmpWidth,
        width: 150 * tmpWidth,
        paddingLeft: 22 * tmpWidth,
        paddingRight: 22 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playlistBox: {
        width: 64 * tmpWidth,
        height: 64 * tmpWidth,
        marginRight: 4 * tmpWidth
    },
    followBox: {
        width: 190 * tmpWidth,
        height: 32 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        backgroundColor: 'rgb(169,193,255)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18 * tmpWidth
    },
    followingBox: {
        width: 190 * tmpWidth,
        height: 32 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        borderWidth: 0.7 * tmpWidth,
        borderColor: 'rgb(196,196,196)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18 * tmpWidth
    },
    representContainer: {
        height: 463 * tmpWidth,
        backgroundColor: 'rgb(250,250,250)', 
        borderTopRightRadius: 16 * tmpWidth, 
        borderTopLeftRadius: 16 * tmpWidth,
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
    },
    songBox: {
        width: 215 * tmpWidth,
        height: 289 * tmpWidth,
        borderRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)' 
    },
    sideContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 25 * tmpWidth
    },
    leftSideBox: {
        width: 48 * tmpWidth,
        height: 289 * tmpWidth,
        borderTopRightRadius: 16 * tmpWidth,
        borderBottomRightRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightSideBox: {
        width: 48 * tmpWidth,
        height: 289 * tmpWidth,
        borderTopLeftRadius: 16 * tmpWidth,
        borderBottomLeftRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    representSongCover: {
        width: 134 * tmpWidth,
        height: 134 * tmpWidth,
        borderRadius: 134 * tmpWidth,
    },
    nextIcon: {
        width: 7 * tmpWidth,
        height: 24 * tmpWidth,
        borderWidth: 1 * tmpWidth
    },
    listBox: {
        height: 57 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20 * tmpWidth,
        marginTop: 12 * tmpWidth
    },
    listSongCover:{
        width: 57 * tmpWidth,
        height: 57 * tmpWidth,
        borderRadius: 57 * tmpWidth,
    },
    titleText: {
        fontSize: 18 * tmpWidth,
        fontWeight: '400', 
        marginTop: 20 * tmpWidth, 
        marginBottom: 25 * tmpWidth
    },
    artistText: {
        fontSize: 14 * tmpWidth, 
        marginTop: 29 * tmpWidth
    },
    releaseDateText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(118,118,118)', 
        marginTop: 7 * tmpWidth
    },
    typeText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(153,153,153)', 
        marginTop: 33 * tmpWidth
    },
    songText: {
        fontSize: 16 * tmpWidth, 
        color: 'rgb(80,80,80)'
    },
    songLengthText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(153,153,153)', 
        marginTop: 4 * tmpWidth
    },
    eachHeader: {
        borderBottomWidth: 0.7 * tmpWidth, 
        borderColor: 'rgb(229,231,239)', 
        marginTop: 5.3 * tmpWidth, 
        marginLeft: 37 * tmpWidth, 
        marginRight: 37 * tmpWidth
    },
    opt:{
        marginTop: 60*tmpWidth,
        width:375 * tmpWidth,
        height:48 * tmpWidth,
        flexDirection: 'row',
    },
    optleft:{
        alignItems:'center',
        flexDirection:'row',
        height:48 * tmpWidth,
        width:375*2/3 * tmpWidth,
     },
    opt1:{
        height:40 * tmpWidth,
        marginLeft:28 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        width:100* tmpWidth,
    },
    opt2:{
        height:40 * tmpWidth,
        width:100 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
    },
    optpicked:{
        height:40 * tmpWidth,
        justifyContent:'center',
        borderBottomWidth:2 * tmpWidth,
        borderColor:'rgba(169,193,255,1)',
    },
    optright:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        height:48 * tmpWidth,
        width:375/3 * tmpWidth
     },
});

export default Recommend;