import React, { useState, useContext } from 'react';
import { Text, Image, StyleSheet, View,ImageBackground, TouchableOpacity, FlatList} from 'react-native';
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

const ImageSelect = ({url, opac}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        <Image style ={{borderRadius :100*tmpWidth ,opacity : opac , height:'100%', width:'100%'}} source ={{url:url}}/>
    );
};

const Feed = ({navigation}) => {
    const { state } = useContext(PlaylistContext);
    const { state: userState, getOtherStory, storyView, getOtheruser,  } = useContext(UserContext);
    const { state:curation } = useContext(CurationContext);
    const { getSongs } = useContext(DJContext);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [storyModal, setStoryModal] = useState(false);
    const [result, setResult] = useState('playlist');
    const [selectedStory, setSelectedStory] = useState(undefined);
    const [selectedIdx, setSelectedIdx] =  useState(0);
    const [harmfulModal, setHarmfulModal] = useState(false);
    const addtracksong= async ({data}) => {
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
            setHarmfulModal(true);
        }
    };
    const stoptracksong= async () => {    
        setIsPlayingid('0');
        await TrackPlayer.reset()
    };
    const onClose = async () => {
        if(storyModal)  {
            setStoryModal(false);
            setIsPlayingid('0');
            await TrackPlayer.reset()
        }
    }

    const storyClick = ({item, index}) => {
        stoptracksong();
        setSelectedStory(item);
        setSelectedIdx(index);
        setStoryModal(true);
        if(item.song.view.includes(userState.myInfo._id) == false){
            storyView({id: item.id});
            getOtherStory();
        }
        if(item.song['song'].attributes.contentRating != 'explicit')    addtracksong({data: item.song["song"]});
    }
    return (
        <View style={{backgroundColor:"rgb(254,254,254)", flex: 1}}>
            <View style={styles.opt}>
                <View style={styles.optleft}>
                    <TouchableOpacity style={styles.opt1} onPress={() => setResult('playlist')}>
                        {result == 'playlist' ? <Text style={{fontSize: 18 * tmpWidth}}>플레이리스트</Text> : <Text style={{fontSize: 18 * tmpWidth, color:'gray'}}>플레이리스트</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opt2} onPress={() => setResult('curating')}>
                        {result == 'curating' ? <Text style={{fontSize: 18 * tmpWidth}}>큐레이션</Text> : <Text style={{fontSize: 18 * tmpWidth, color:'gray'}}>큐레이션</Text> }
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
            </View> : <View style={{flex:1}}><Curating curationPosts={curation.maincurationposts}/></View> }
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
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/representleft.svg')}/>
                                </TouchableOpacity> : <View style={styles.nextIcon}/>}
                                <TouchableOpacity style={styles.songscover} onPress={() => {
                                    if(isPlayingid == selectedStory.song["song"].id){
                                        stoptracksong()
                                    }else{
                                        addtracksong({data: selectedStory.song["song"]})
                                    }
                                }}>
                                    <ImageSelect opac={1.0} url={selectedStory.song["song"].attributes.artwork.url}/>
                                    { isPlayingid != selectedStory.song["song"].id ? 
                                    <SvgUri width='74' height='74' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 63 * tmpWidth, top: 63 * tmpWidth}}/> :
                                    <SvgUri width='74' height='74' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 63 * tmpWidth, top: 63 * tmpWidth}}/> }
                                </TouchableOpacity>
                                { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                {selectedIdx != userState.otherStory.length-1 ?
                                <TouchableOpacity style={styles.nextIcon} onPress={() => storyClick({item: userState.otherStory[selectedIdx+1], index: selectedIdx+1})}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/representright.svg')}/>
                                </TouchableOpacity>: <View style={styles.nextIcon}/>}
                            </View>
                        </View>
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

    songscover : {
        width : 200 * tmpWidth,
        height : 200 * tmpWidth,
    },
    header:{
        height:48 * tmpWidth,
        width:375 * tmpWidth,
        marginTop:44 * tmpWidth,
        flexDirection: 'row',
    },
    headertext:{
        fontSize: 30 * tmpWidth,
        fontWeight: 'bold',
        color: 'rgba(169,193,255,1)',
        marginLeft:27 * tmpWidth,
        marginTop:14 * tmpWidth
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
    story:{
        backgroundColor:"rgb(254,254,254)",
        paddingLeft:27 * tmpWidth,
        width:375 * tmpWidth,
        paddingTop:7 * tmpWidth,
        height:100 * tmpWidth,
    },
    storynopicread:{
        width:56* tmpWidth,
        height:56 * tmpWidth,
        borderRadius:60 * tmpWidth,
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
        height : 340 * tmpWidth,
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
        justifyContent: 'space-between'
    },
    nextIcon: {
        width: 36 * tmpWidth,
        height: 52 * tmpWidth
    },
    textContainer: {
        marginTop: 16 * tmpWidth,
        alignItems: 'center',
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