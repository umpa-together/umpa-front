import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, StyleSheet, View,ImageBackground, TouchableOpacity, FlatList,  SafeAreaView, Platform, StatusBar} from 'react-native';
import {Context as PlaylistContext} from '../../context/PlaylistContext';
import {Context as UserContext} from '../../context/UserContext';
import {Context as CurationContext} from '../../context/CurationContext';
import {Context as DJContext} from '../../context/DJContext';

import { navigate } from '../../navigationRef';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import Curating from  './Curating';
import Playlist from  './Playlist';
import { tmpWidth } from '../FontNormalize';
import HarmfulModal from '../HarmfulModal';
import { SongImage } from '../SongImage'
import { addtracksong, stoptracksong } from '../TrackPlayer'

const Feed = ({navigation}) => {
    const { state } = useContext(PlaylistContext);
    const { state: userState, getOtherStory, storyView, getOtheruser } = useContext(UserContext);
    const { state: curation } = useContext(CurationContext);
    const { getSongs } = useContext(DJContext);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [storyModal, setStoryModal] = useState(false);
    const [result, setResult] = useState('playlist');
    const [selectedStory, setSelectedStory] = useState(undefined);
    const [selectedIdx, setSelectedIdx] =  useState(0);
    const [harmfulModal, setHarmfulModal] = useState(false);

    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])
    const onClose = async () => {
        if(storyModal)  {
            getOtherStory()
            setStoryModal(false);
            setIsPlayingid('0');
            await TrackPlayer.reset()
        }
    }

    const storyClick = ({item, index}) => {
        stoptracksong({ setIsPlayingid });
        setSelectedStory(item);
        setSelectedIdx(index);
        setStoryModal(true);
        storyView({id: item.id});
        if(item.song['song'].attributes.contentRating != 'explicit')    addtracksong({data: item.song["song"], setIsPlayingid, setHarmfulModal});
    }

    useEffect(() => {
        const listener = navigation.addListener('didFocus', async () => {
            await TrackPlayer.reset()
        });
        return () => listener.remove()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.opt}>
                <View style={styles.optleft}>
                    <TouchableOpacity style={styles.opt1} onPress={() => setResult('playlist')}>
                        {result == 'playlist' ? <Text style={{fontSize: 18 * tmpWidth, color: 'black'}}>플레이리스트</Text> : <Text style={{fontSize: 18 * tmpWidth, color:'rgb(193,195,209)'}}>플레이리스트</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opt2} onPress={() => setResult('curating')}>
                        {result == 'curating' ? <Text style={{fontSize: 18 * tmpWidth, color: 'black'}}>큐레이션</Text> : <Text style={{fontSize: 18 * tmpWidth, color:'rgb(193,195,209)'}}>큐레이션</Text> }
                    </TouchableOpacity>
                </View>
                <View style={styles.optright}>
                    {result == 'playlist' ?
                    <TouchableOpacity style={{marginRight:21.3 * tmpWidth, width:40 * tmpWidth, height:40 * tmpWidth}} onPress = {()=>navigate('Create', {'data': []})}>
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/postplaylist.svg')} style={{ }}/>
                    </TouchableOpacity> :
                    <TouchableOpacity style={{marginRight:21.3 * tmpWidth,width:40 * tmpWidth, height:40 * tmpWidth}}  onPress = {()=>navigate('CurationSearch')}>
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/curationsearch.svg')} style={{}}/>
                    </TouchableOpacity>}
                </View>
            </View>
            {result == 'playlist' ?
            <View style={{flex:1}}>
                {userState.otherStory != null && userState.otherStory.length != 0 ? 
                <View style={styles.story}>
                    <FlatList
                        data={userState.otherStory}
                        keyExtractor={user=>user.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingLeft: 27 * tmpWidth}}
                        renderItem={({item, index})=>{
                            return (
                                <View style={{height:115 * tmpWidth,marginRight:24 * tmpWidth,width:64 * tmpWidth}}>
                                    <View style={{alignItems: 'center'}}>
                                    {item.profileImage == undefined ?
                                        <TouchableOpacity onPress={() => storyClick({item, index})}>
                                            {item.song.view.includes(userState.myInfo._id) ?
                                            <View style={styles.storynopicread}>
                                               <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                            </View>  :
                                            <ImageBackground style={{justifyContent:'center',alignItems:'center',width:tmpWidth*64, height:tmpWidth*64}} source={require('../../assets/icons/storylive.png')}>
                                                <View style={styles.storynopicread}>
                                                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                </View> 
                                            </ImageBackground> }
                                        </TouchableOpacity> :
                                        <TouchableOpacity onPress={() => storyClick({item, index})}>
                                            {item.song.view.includes(userState.myInfo._id) ? <Image source={{uri: item.profileImage}} style={styles.storypicread}/> :
                                            <ImageBackground style={{justifyContent:'center',alignItems:'center',width:tmpWidth*64, height:tmpWidth*64}} source={require('../../assets/icons/storylive.png')}>
                                                <Image source={{uri: item.profileImage}} style={styles.storypic} />
                                            </ImageBackground>
                                            }
                                        </TouchableOpacity>

                                    }
                                        <Text numberOfLines ={1} style={{marginTop:6}}>{item.name}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View> : null }
                <Playlist playList={state.playlists} navigation={navigation}/>
            </View> : <View style={{flex:1}}><Curating curationPosts={curation.maincurationposts} navigation={navigation}/></View> }
            {selectedStory != undefined ?
            <Modal
                animationIn='fadeInLeft'
                animationOut='fadeOutRight'
                isVisible={storyModal}
                onBackdropPress={onClose}
                backdropOpacity={0.5}
                style={{alignItems: 'center'}}
            >
                <View style={styles.modalBox}>
                    <View style={{flex: 1, margin: 16 * tmpWidth}}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={async() => {
                            setStoryModal(false);
                            await Promise.all([getOtheruser({id: selectedStory.id}),
                            getSongs({id:selectedStory.id}), 
                            TrackPlayer.reset()])
                            navigation.push('OtherAccount',{otherUserId:selectedStory.id})
                        }}>
                            { selectedStory.profileImage == undefined ?
                            <View style={styles.profile}>
                               <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                            </View> :
                            <Image style={styles.profile} source={{uri: selectedStory.profileImage}}/> }
                            <Text style={{marginLeft: 12 * tmpWidth}}>{selectedStory.name}</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContainer}>
                            <View style={styles.nextContainer}>
                                {selectedIdx != 0 ?
                                <TouchableOpacity style={styles.nextIcon} onPress={() => storyClick({item: userState.otherStory[selectedIdx-1], index: selectedIdx-1})}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalLeft.svg')}/>
                                </TouchableOpacity> : <View style={styles.nextIcon}/>}
                                <TouchableOpacity onPress={() => {
                                    if(isPlayingid == selectedStory.song["song"].id){
                                        stoptracksong({ setIsPlayingid })
                                    }else{
                                        addtracksong({data: selectedStory.song["song"], setIsPlayingid, setHarmfulModal})
                                    }
                                }}>
                                    <SongImage url={selectedStory.song["song"].attributes.artwork.url} size={152} border={152}/>
                                    { isPlayingid != selectedStory.song["song"].id ? 
                                    <SvgUri width='48' height='48' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 52 * tmpWidth, top: 52 * tmpWidth}}/> :
                                    <SvgUri width='48' height='48' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 52 * tmpWidth, top: 52 * tmpWidth}}/> }
                                </TouchableOpacity>
                                { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                {selectedIdx != userState.otherStory.length-1 ?
                                <TouchableOpacity style={styles.nextIcon} onPress={() => storyClick({item: userState.otherStory[selectedIdx+1], index: selectedIdx+1})}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalRight.svg')}/>
                                </TouchableOpacity>: <View style={styles.nextIcon}/>}
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <View style={styles.textContainer}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {selectedStory.song["song"].attributes.contentRating == "explicit" ? 
                                    <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                    : null }
                                    <Text numberOfLines={1} style={styles.modalTitleText}>{selectedStory.song["song"].attributes.name}</Text>
                                </View>
                                <Text numberOfLines={1} style={styles.modalArtistText}>{selectedStory.song["song"].attributes.artistName}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal> : null }
        </View>
    );
};

Feed.navigationOptions = () =>{
    return {
        headerShown: false,
    };
};


const styles = StyleSheet.create({
    container: {
        backgroundColor:"rgb(254,254,254)", 
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 44 * tmpWidth : StatusBar.currentHeight * tmpWidth,
    },
    headertext:{
        fontSize: 30 * tmpWidth,
        fontWeight: 'bold',
        color: 'rgba(169,193,255,1)',
        marginLeft:27 * tmpWidth,
        marginTop:14 * tmpWidth
    },
    opt:{
        marginTop: 15*tmpWidth,
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
    story:{
        backgroundColor:"rgb(254,254,254)",
        width:375 * tmpWidth,
        paddingTop:7 * tmpWidth,
        height:100 * tmpWidth,
    },
    storynopicread:{
        width:56* tmpWidth,
        height:56 * tmpWidth,
        borderRadius:60 * tmpWidth,
        margin: 4 * tmpWidth,
    },
    storynopic:{
        width:56 * tmpWidth,
        height:56 * tmpWidth,
        borderRadius:60 * tmpWidth,
    },
    storypicread:{
        width:56 * tmpWidth,
        height:56 * tmpWidth,
        borderRadius:60 * tmpWidth,
        opacity:0.7 * tmpWidth,
        margin: 4 * tmpWidth
    },
    storypic:{
        width:56 * tmpWidth,
        height:56* tmpWidth,
        borderRadius:60 * tmpWidth,
    },
    profile: {
        width: 32 * tmpWidth,
        height: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
    },
    modalBox: {
        width : 305 * tmpWidth,
        height : 311 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 10 * tmpWidth,
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 30 * tmpWidth,
        shadowOpacity: 0.3,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15 * tmpWidth
    },
    nextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 152 * tmpWidth,
    },
    nextIcon: {
        width: 36 * tmpWidth,
        height: 52 * tmpWidth
    },
    textContainer: {
        marginTop: 16 * tmpWidth,
        alignItems: 'center',
        width: 190 * tmpWidth,
    },
    modalArtistText: {
        fontSize: 14 * tmpWidth,
        color: 'rgb(133,133,133)',
        marginTop: 8 * tmpWidth,
        marginBottom: 10 * tmpWidth,
    },
    modalTitleText: {
        fontSize: 16 * tmpWidth
    },
    likeIcon: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth
    }
});

export default Feed;
