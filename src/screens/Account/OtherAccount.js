import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, ActivityIndicator, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Context as UserContext } from '../../context/UserContext';
import { Context as DJContext } from '../../context/DJContext';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import AccountPlaylist from  '../../components/Account/AccountPlaylist';
import AccountCurating from  '../../components/Account/AccountCurating';
import TrackPlayer from 'react-native-track-player';
import { tmpWidth } from '../../components/FontNormalize';
import ReportModal from '../../components/ReportModal';
import HarmfulModal from '../../components/HarmfulModal';

require('date-utils');
const ImageSelect = ({url, opac}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        <Image style ={{borderRadius :100 * tmpWidth, opacity : opac , height:'100%', width:'100%'}} source ={{url:url}}/>
    );
};

const OtherAccountScreen = ({navigation}) => {
    const {state: userState, follow, unfollow, getMyInfo, storyView } = useContext(UserContext);
    const {state: djState } = useContext(DJContext);
    const [result, setResult] = useState('playlist');
    const [isFollow, setIsFollow] = useState(false);
    const [representModal, setRepresentModal] = useState(false);
    const [storyModal, setStoryModal] = useState(false);
    const [representSong, setRepresentSong] = useState(null);
    const [story, setStory] = useState(null);
    const [idx, setIdx] = useState(0);
    const [type, setType] = useState('Each');
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [url, setUrl] = useState('');
    const [today, setToday] = useState('');
    const [reportModal, setReportModal] = useState(false);
    const [user, setUser] = useState(null);   
    const [harmfulModal, setHarmfulModal] = useState(false);
    const [followerNum , setFollowerNum] = useState(0);
    const id = navigation.getParam('otherUserId');

    const onClose = async () => {
        setRepresentModal(false);
        setStoryModal(false);
        setIsPlayingid('0');
        setIdx(0);
        setType('Each');
        await TrackPlayer.reset()
    };
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
    const representNext = ({idx}) => {
        stoptracksong()
        setIdx(idx);
        setRepresentSong(user.songs[idx]);
    }
    const storyClick = () => {
        storyView({id: story.id});
        setStoryModal(true);
        if(story['song'].song.attributes.contentRating != 'explicit'){
            addtracksong({data: story['song'].song});
        }
    }

    const followCheck = ({id}) => {
        if(user != null) {
            for(let key in user.follower){
                if(user.follower[key]._id== id)   return true;
            }
        }
        return false;
    }
    
    useEffect(() => {
        if(user != null){
            setStory(userState.otherStory.filter(item => item.id == user._id)[0]);
            setIsFollow(followCheck({id: userState.myInfo._id}))
        }
    }, [user]);
    useEffect(() => {
        if(story != null){
            setUrl(story['song'].song.attributes.artwork.url);
        }
    }, [story]);

    useEffect(() => {
        if(userState.otherUser != null){
            setUser(userState.otherUser);
            setFollowerNum(userState.otherUser.follower.length);
        }
    }, [id]);
    useEffect(() => {
        var newDate = new Date();
        setToday(newDate.toFormat('YYYY.MM.DD'))
    }, []);

    return (
        <View style={{flex:1,backgroundColor: 'rgb(255,255,255)'}}>
            {user == null || (djState.songs == null) ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View> :
            <View style={{flex: 1}}>
            <View style={styles.header}>
                <TouchableOpacity  style={{position :"absolute", left:12 * tmpWidth,width:40 * tmpWidth, height:40 * tmpWidth}} onPress={() => navigation.goBack()}>
                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
                <Text style={{fontSize: 16 * tmpWidth, fontWeight: 'bold'}}>{user.name}</Text>
                <TouchableOpacity style={{position :"absolute",right:20 * tmpWidth}} onPress={() => setReportModal(true)}>
                    <Text style={{color: 'rgb(80,80,80)'}}>신고</Text>
                </TouchableOpacity>
                {reportModal ? <ReportModal reportModal={reportModal} setReportModal={setReportModal} type={'account'} subjectId={user._id}/> : null }
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{height: '100%'}}>
                    <View style={{flexDirection: 'row',  justifyContent: 'center', marginTop: 10 * tmpWidth }}>
                        <View style={{alignItems: 'center', marginTop: 37 * tmpWidth }}>
                            <TouchableOpacity style={styles.songImage} onPress={() => {
                                setRepresentModal(true)
                                setRepresentSong(user.songs[0])
                            }}>
                                <ImageSelect  url={user.songs[0].attributes.artwork.url}/> 
                            </TouchableOpacity>
                            <Text style={{marginTop: 10 * tmpWidth , fontSize: 11 * tmpWidth, color: 'rgb(80,80,80)'}}>대표곡</Text>
                        </View>
                        { user.profileImage == undefined ?
                        <View style={styles.profileImage}>
                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                        </View> :
                        <Image style={styles.profileImage} source={{uri: user.profileImage}}/> }
                        <View style={{alignItems: 'center', marginTop: 37 * tmpWidth }}>
                            {url == '' ? 
                            <TouchableOpacity style={styles.songImage2}>
                                <SvgUri width={14*tmpWidth} height={14*tmpWidth} source={require('../../assets/icons/musicnote.svg')} />
                            </TouchableOpacity> : 
                            <TouchableOpacity style={styles.songImage} onPress={() => storyClick()}>
                                <ImageSelect url={url} />
                            </TouchableOpacity>}
                            <Text style={{marginTop: 10  * tmpWidth, fontSize: 11 * tmpWidth, color: 'rgb(80,80,80)'}}>오늘의 곡</Text>
                        </View>
                    </View>
                    <View style={styles.nameBox}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                            <View style={{width:200 * tmpWidth,  flexDirection:'row'}}>
                                <TouchableOpacity style={{flexDirection: 'row', marginRight: 12 * tmpWidth, alignItems:'center', }} onPress={() => {
                                    navigation.push('Follow', {option: 'OtherAccount', name:user.name, type:'following'})
                                }}>
                                    <Text style={{fontSize: 12 * tmpWidth, }}>팔로잉 </Text>
                                    <Text style={{fontSize: 14 * tmpWidth, fontWeight: 'bold'}}>{user.following.length}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flexDirection: 'row', marginRight: 12 * tmpWidth,alignItems:'center', }} onPress={() => {
                                    navigation.push('Follow', {option: 'OtherAccount', name:user.name, type:'follower'})
                                }}>
                                    <Text style={{fontSize: 12 * tmpWidth}}>팔로워 </Text>
                                    <Text style={{fontSize: 14 * tmpWidth, fontWeight: 'bold'}}>{followerNum}</Text>
                                </TouchableOpacity>
                            </View>
                            {isFollow ?
                            <TouchableOpacity style={styles.followingBox} onPress={async () => {
                                setIsFollow(false);
                                await unfollow({id:user._id})
                                getMyInfo();
                                setFollowerNum(prev => prev-1)

                            }}>
                                <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(154,188,255)'}}>팔로잉</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.followBox} onPress={async () => {
                                setIsFollow(true);
                                await follow({id:user._id})
                                getMyInfo();
                                setFollowerNum(prev=>prev+1)
                            }}>
                                <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(80,80,80)'}}>팔로우 +</Text>
                            </TouchableOpacity> }
                        </View>
                    </View>
                    {user.introduction != '' ? 
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.infoBox}>
                            <Text>{user.introduction}</Text>
                        </View>
                    </View> : null }
                    <View style={styles.opt}>
                        <TouchableOpacity style={result=='playlist' ? styles.selectedOption : styles.notselectedOption} onPress={() => setResult('playlist')}>
                            <Text>플레이리스트 {user.playlists.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={result=='curating' ? styles.selectedOption : styles.notselectedOption} onPress={() => setResult('curating')}>
                            <Text>큐레이션 {user.curationposts.length}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: 'rgb(250,250,250)'}}>
                        {result == 'playlist' ?  <AccountPlaylist playList={user.playlists} myAccount={false}/> :
                        <AccountCurating curating={user.curationposts} myAccount={false}/>}
                    </View>
                </View>
            </ScrollView>
        </View> }
        {representSong != null ?
            <Modal
                isVisible={representModal}
                onBackdropPress={onClose}
                backdropOpacity={0.5}
                style={{justifyContent:'flex-end', margin:0}}>
                    <View style={styles.representSongBox}>
                        <View style={{flexDirection: 'row', marginTop: 20 * tmpWidth ,justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(80,80,80)'}}>대표곡</Text>
                                <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 4  * tmpWidth}}>{user.songs.length}곡</Text>
                            </View>
                            <TouchableOpacity style={{position:'absolute',right:13 * tmpWidth,width:30 * tmpWidth,height:30 * tmpWidth, }} onPress={()=>{onClose();}}>
                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalexit.svg')}/>
                            </TouchableOpacity>
                        </View>
                        {type == 'Each' ? 
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 * tmpWidth }}>
                            <View style={styles.leftSideBox}>
                                {idx != 0 ? <TouchableOpacity style={{width:40 * tmpWidth, height:40 * tmpWidth,}} onPress={() => {
                                    representNext({idx: idx-1})
                                }}>
                                 <SvgUri width='100%' height='100%' source={require('../../assets/icons/representleft.svg')}/>
                                </TouchableOpacity> : null}
                            </View>
                            <View style={styles.songBox}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{width: 150 * tmpWidth , alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                                        {representSong.attributes.contentRating == "explicit" ? 
                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth, paddingTop: 20 * tmpWidth, paddingBottom: 25 * tmpWidth}}/> 
                                        : null }
                                        <Text numberOfLines={1} style={{fontSize: 18 * tmpWidth, fontWeight: 'bold', marginTop: 20 * tmpWidth , marginBottom: 25 * tmpWidth}}>{representSong.attributes.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.representSongCover} onPress={() => {
                                        if(isPlayingid == representSong.id){
                                            stoptracksong()
                                        }else{
                                            addtracksong({data: representSong})
                                        }
                                    }}>
                                        <ImageSelect opac={1.0} url={representSong.attributes.artwork.url}/>
                                        { isPlayingid != representSong.id ? 
                                        <SvgUri width='50' height='50' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> :
                                        <SvgUri width='50' height='50' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> }
                                    </TouchableOpacity>
                                    {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                    <Text style={{fontSize: 14 * tmpWidth, marginTop: 29  * tmpWidth}}>{representSong.attributes.artistName}</Text>
                                    <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(118,118,118)', marginTop: 7 * tmpWidth }}>{representSong.attributes.releaseDate}</Text>
                                </View>
                            </View>
                            <View style={styles.rightSideBox}>
                                {idx != user.songs.length-1 ? <TouchableOpacity style={{width:40 * tmpWidth, height:40 * tmpWidth,}} onPress={() => {
                                    representNext({idx: idx+1})
                                }}>
                                  <SvgUri width='100%' height='100%' source={require('../../assets/icons/representright.svg')}/>
                                </TouchableOpacity> : null }
                            </View>
                        </View>
                        <View style={{alignItems: 'center', marginTop: 14 * tmpWidth }}>
                            <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(118,118,118)'}}>{idx+1}/{user.songs.length}</Text>
                            <TouchableOpacity style={styles.representlistbutton} onPress={() => {
                                setType('List')}}>
                                <SvgUri width={18 * tmpWidth} height={18 * tmpWidth} source={require('../../assets/icons/representlist.svg')}/>
                                <Text style={{fontSize: 11 * tmpWidth, color: 'rgb(153,153,153)',}}>목록보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : 
                    <View>
                        <View style={styles.line}/>
                            <View style={{height: 335 * tmpWidth}}>
                                <FlatList 
                                    data={user.songs}
                                    keyExtractor={song=>song.attributes.name}
                                    renderItem={({item}) => {
                                        return (
                                            <View style={styles.listBox}>
                                                <TouchableOpacity style={styles.listSongCover} onPress={() => {
                                                if(isPlayingid == item.id){
                                                    stoptracksong()
                                                }else{
                                                    addtracksong({data: item})
                                                }}}>
                                                    <ImageSelect opac={1.0} url={item.attributes.artwork.url}/>
                                                    { isPlayingid != item.id ? 
                                                    <SvgUri width='27' height='27' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                                    <SvgUri width='27' height='27' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                                </TouchableOpacity>
                                                {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                                <View style={{marginLeft: 17 * tmpWidth, width: 250 * tmpWidth }}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        {item.attributes.contentRating == "explicit" ? 
                                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                        : null }
                                                        <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                                    </View>
                                                    <Text style={{fontSize:11 * tmpWidth , color: 'rgb(148,153,163)', marginTop: 4.8 * tmpWidth }} numberOfLines={1}>{item.attributes.artistName}</Text>
                                                </View>
                                            </View>    
                                        )
                                    }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => setType('Each')} style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 11 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 33 * tmpWidth }}>개별 보기</Text>
                            </TouchableOpacity>
                        </View> }
                    </View>
                </Modal> : null }
                <Modal 
                    animationIn='fadeInRight'
                    animationOut='fadeOutLeft'
                    isVisible={storyModal}
                    onBackdropPress={onClose}
                    backdropOpacity={0.5}
                >
                    <View style={styles.storyContainer}>
                        {story != null ? 
                        <View>
                            <TouchableOpacity style={styles.storyexit} onPress={() => onClose()}>
                                <SvgUri width={30 * tmpWidth} height={30 * tmpWidth} source={require('../../assets/icons/modalexit.svg')}/>
                            </TouchableOpacity>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(80,80,80)'}}>오늘의 곡</Text>
                                    <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 4  * tmpWidth}}>{today}</Text>
                                    <View style={styles.innerContainer}>
                                        <View style={{marginTop:20 * tmpWidth , width: 160  * tmpWidth, marginBottom: 25  * tmpWidth, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                                            {story['song'].song.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                            : null }
                                            <Text style={{fontSize: 18 * tmpWidth, fontWeight: 'bold'}} numberOfLines={1}>{story['song'].song.attributes.name}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.representSongCover} onPress={() => {
                                            if(isPlayingid == story['song'].song.id){
                                                stoptracksong()
                                            }else{
                                                addtracksong({data: story['song'].song})
                                            }
                                        }}>
                                            <ImageSelect opac={1.0} url={url} />
                                            { isPlayingid != story['song'].song.id ? 
                                            <SvgUri width='50' height='50' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> :
                                            <SvgUri width='50' height='50' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> }
                                        </TouchableOpacity>
                                        { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }       
                                        <View style={{width: 180 * tmpWidth, alignItems: 'center'}}>
                                            <Text style={{fontSize:14 * tmpWidth, marginTop: 29 * tmpWidth }} numberOfLines={1}>{story['song'].song.attributes.artistName}</Text>
                                        </View>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(118,118,118)', marginTop: 7 * tmpWidth }}>{story['song'].song.attributes.releaseDate}</Text>
                                    </View>
                                </View>
                            </View> : null}
                        </View>
                </Modal>
            </View>
    )
};

OtherAccountScreen.navigationOptions = ({navigation})=>{
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    profileImage: {
        width: 128 * tmpWidth ,
        height: 128  * tmpWidth,
        borderRadius: 128 * tmpWidth,
        marginLeft: 32 * tmpWidth ,
        marginRight: 32 * tmpWidth
    },
    songImage: {
        width: 68 * tmpWidth ,
        height: 68 * tmpWidth,
        borderRadius: 68 * tmpWidth,
        backgroundColor: 'rgba(169,193,255,0.3)',
    },
    songImage2: {
        width: 68 * tmpWidth ,
        height: 68 * tmpWidth,
        borderRadius: 68 * tmpWidth,
        backgroundColor: 'rgba(169,193,255,0.3)',
        justifyContent:'center',
        alignItems:'center',
    },   
    followBox: {
        width: 64 * tmpWidth ,
        height: 25 * tmpWidth ,
        borderRadius: 30 * tmpWidth,
        backgroundColor: 'rgba(169,193,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    followingBox: {
        width: 64 * tmpWidth ,
        height: 25  * tmpWidth,
        borderRadius: 30 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8 * tmpWidth,
        borderColor: 'rgba(169,193,255,0.5)'
    },
    nameBox: {
        flexDirection: 'row',
        height: 25 * tmpWidth,
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingLeft: 20  * tmpWidth,
        paddingRight: 16 * tmpWidth ,
        marginTop: 42 * tmpWidth
    },
    infoBox: {
        width: 334 * tmpWidth ,
        marginTop: 25 * tmpWidth ,
        marginBottom: 20 * tmpWidth,
    },
    selectedOption: {
        paddingLeft: 9 * tmpWidth ,
        paddingRight: 9  * tmpWidth,
        paddingBottom: 6 * tmpWidth ,
        borderBottomWidth: 2 * tmpWidth,
        borderBottomColor: 'rgba(25,25,25,0.5)'
    },
    notselectedOption: {
        paddingLeft: 9  * tmpWidth,
        paddingRight: 9 * tmpWidth ,
    },
    representSongBox: {
        height:463  * tmpWidth,
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
        width: 215  * tmpWidth,
        height: 289  * tmpWidth,
        borderRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)' 
    },
    leftSideBox: {
        width: 48  * tmpWidth,
        height: 289  * tmpWidth,
        borderTopRightRadius: 16 * tmpWidth,
        borderBottomRightRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightSideBox: {
        width: 48  * tmpWidth,
        height: 289  * tmpWidth,
        borderTopLeftRadius: 16 * tmpWidth,
        borderBottomLeftRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    representSongCover: {
        width: 134  * tmpWidth,
        height: 134  * tmpWidth,
        borderRadius: 134 * tmpWidth,
    },
    nextIcon: {
        width: 7 * tmpWidth,
        height: 24  * tmpWidth,
        borderWidth: 1 * tmpWidth
    },
    listBox: {
        height: 57  * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20  * tmpWidth,
        marginTop: 12 * tmpWidth
    },
    listSongCover:{
        width: 57  * tmpWidth,
        height: 57  * tmpWidth,
        borderRadius: 57 * tmpWidth,
    },
    storyContainer: {
        width: 333 * tmpWidth,
        height: 442 * tmpWidth,
        borderRadius: 12 * tmpWidth,
        backgroundColor: 'rgb(250,250,250)',
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
    },
    innerContainer: {
        width: 215  * tmpWidth,
        height: 289  * tmpWidth,
        borderRadius: 16 * tmpWidth,
        borderWidth: 2 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        marginTop: 24  * tmpWidth,
        alignItems: 'center'
    },
    header:{
        height: 48  * tmpWidth,
        marginTop:40 * tmpWidth,
        width:375 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    opt:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft: 60 * tmpWidth,
        paddingRight: 60  * tmpWidth,
        height:52 * tmpWidth,
        backgroundColor:'rgb(255,255,255)',
   },
   line:{
    borderBottomWidth: 0.7 * tmpWidth,
    borderColor: 'rgb(229,231,239)',
    marginTop: 5.3  * tmpWidth,
    marginLeft: 37  * tmpWidth,
    marginRight: 37 * tmpWidth
   },
   storyexit:{
        width:30 * tmpWidth,
        height:30 * tmpWidth,
        marginTop: 16  * tmpWidth,
        alignItems: 'flex-end',
        marginLeft: 283 * tmpWidth
   },
    representlistbutton:{
        width:50 * tmpWidth,
        height:18 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:10 * tmpWidth
    },

});

export default OtherAccountScreen;