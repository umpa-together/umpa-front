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
import RepresentSong from '../../components/RepresentSong';
import StoryCalendar from '../../components/StoryCalendar';

require('date-utils');
const ImageSelect = ({url, opac}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        <Image style ={{borderRadius :100 * tmpWidth, opacity : opac , height:'100%', width:'100%'}} source ={{url:url}}/>
    );
};

const OtherAccountScreen = ({navigation}) => {
    const {state: userState, follow, unfollow, getMyInfo, storyView, storyCalendar } = useContext(UserContext);
    const {state: djState } = useContext(DJContext);
    const [result, setResult] = useState('playlist');
    const [isFollow, setIsFollow] = useState(false);
    const [representModal, setRepresentModal] = useState(false);
    const [storyModal, setStoryModal] = useState(false);
    const [story, setStory] = useState(null);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [url, setUrl] = useState('');
    const [today, setToday] = useState('');
    const [reportModal, setReportModal] = useState(false);
    const [user, setUser] = useState(null);   
    const [harmfulModal, setHarmfulModal] = useState(false);
    const [followerNum , setFollowerNum] = useState(0);
    const [calendarModal, setCalendarModal] = useState(false);
    const id = navigation.getParam('otherUserId');
    const onClose = async () => {
        setRepresentModal(false);
        setStoryModal(false);
        setIsPlayingid('0');
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
            const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
            return () => clearTimeout(trackPlayer);
        } else {
            setHarmfulModal(true);
        }
    };
    const stoptracksong= async () => {    
        setIsPlayingid('0');
        await TrackPlayer.reset()
    };
    const storyClick = () => {
        storyView({id: story.id});
        setStoryModal(true);
        if(story['song'].attributes.contentRating != 'explicit'){
            addtracksong({data: story['song']});
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
            var newDate = new Date();
            let time = newDate.toFormat('YYYY-MM-DD');
            if(userState.otherUser.todaySong != undefined)  setStory(userState.otherUser.todaySong.filter(item => item.time == time)[0]);
            setIsFollow(followCheck({id: userState.myInfo._id}))
        }
    }, [user]);
    useEffect(() => {
        if(story != null){
            setUrl(story['song'].attributes.artwork.url);
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
        const listener = navigation.addListener('didFocus', async () => {
            await TrackPlayer.reset()
        });
        return () => listener.remove()
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
                                <TouchableOpacity style={styles.songImage} onPress={() => {
                                    storyCalendar({id: userState.otherUser._id})
                                    storyClick()}}>
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
            {user != null ? <RepresentSong representModal={representModal} setRepresentModal={setRepresentModal} song={user.songs} /> : null }
            <Modal 
                animationIn='fadeInRight'
                animationOut='fadeOutLeft'
                isVisible={storyModal}
                onBackdropPress={onClose}
                backdropOpacity={0.5}
                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
            >
                <StoryCalendar calendarModal={calendarModal} setCalendarModal={setCalendarModal}/>
                <View style={styles.storyContainer}>
                    {story != null ? 
                    <View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(80,80,80)', marginTop: 20 * tmpWidth}}>오늘의 곡</Text>
                            <Text style={{fontSize: 14 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 5 * tmpWidth, marginBottom:21 * tmpWidth}}>{today}</Text>
                            <TouchableOpacity style={styles.storySongCover} onPress={() => {
                                if(isPlayingid == story['song'].id){
                                    stoptracksong()
                                }else{
                                    addtracksong({data: story['song']})
                                }
                            }}>
                                <ImageSelect opac={1.0} url={url} />
                                { isPlayingid != story['song'].id ? 
                                <SvgUri width='56' height='56' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 49 * tmpWidth, top: 49 * tmpWidth}}/> :
                                <SvgUri width='56' height='56' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 49 * tmpWidth, top: 49 * tmpWidth}}/> }
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{height: 40 * tmpWidth, position: 'absolute', right: 14 * tmpWidth, top: 22 * tmpWidth}}
                                onPress={() => setCalendarModal(true)}
                            >
                                <SvgUri width='40' height='40' source={require('../../assets/icons/calendar.svg')} />
                            </TouchableOpacity>
                            { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }       
                            <View style={{marginTop:21 * tmpWidth , width: 160 * tmpWidth , marginBottom: 6 * tmpWidth, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                                {story['song'].attributes.contentRating == "explicit" ? 
                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                : null }
                                <Text style={{fontSize: 18 * tmpWidth, fontWeight: 'bold'}} numberOfLines={1}>{story['song'].attributes.name}</Text>
                            </View>
                            <View style={{width: 160 * tmpWidth, alignItems: 'center'}}>
                                <Text style={{fontSize:14 * tmpWidth, color:'rgb(133,133,133)'}} numberOfLines={1}>{story['song'].attributes.artistName}</Text>
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
        width: 271 * tmpWidth ,
        height: 322 * tmpWidth ,
        borderRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(250,250,250)',
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
    },
    storySongCover: {
        width: 155 * tmpWidth,
        height: 155 * tmpWidth,
        borderRadius: 155 * tmpWidth
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