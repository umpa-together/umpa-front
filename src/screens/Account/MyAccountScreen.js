import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Text, Image, StyleSheet, RefreshControl, ActivityIndicator,Keyboard, View, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { Context as UserContext } from '../../context/UserContext';
import { Context as SearchContext } from '../../context/SearchContext';
import { Context as DJContext } from '../../context/DJContext';
import { navigate, push } from '../../navigationRef';
import AccountPlaylist from  '../../components/Account/AccountPlaylist';
import AccountCurating from  '../../components/Account/AccountCurating';
import Modal from 'react-native-modal';
import TrackPlayer from 'react-native-track-player';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';
import HarmfulModal from '../../components/HarmfulModal';
import DeleteModal from '../../components/DeleteModal';
import RepresentSong from '../../components/RepresentSong';
import StoryCalendar from '../../components/StoryCalendar';
import MusicBoxModal from '../../components/MusicBoxModal';
import { SongImage } from '../../components/SongImage'
import { addtracksong, stoptracksong } from '../../components/TrackPlayer'
import { useFocusEffect } from '@react-navigation/native';

require('date-utils');

const MyAccountScreen = () => {
    const { state: userState, postStory, getMyInfo, getMyStory, getOtheruser, storyCalendar, getOtherStory } = useContext(UserContext);
    const { state: searchState, searchsong, searchinit, songNext, searchHint, initHint } = useContext(SearchContext);
    const { getSongs } = useContext(DJContext);
    const [result, setResult] = useState('playlist');
    const [representModal, setRepresentModal] = useState(false);
    const [storyModal, setStoryModal] = useState(false);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [url, setUrl] = useState('');
    const [newStory, setNewStory] = useState(false);
    const [today, setToday] = useState('');
    const [tok, setTok] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [harmfulModal, setHarmfulModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [viewerModal, setViewerModal] = useState(false);
    const [calendarModal, setCalendarModal] = useState(false);
    const [musicBoxModal, setMusicBoxModal] = useState(false);
    const getData = async () => {
        if(searchState.songData.length >= 20){
            setLoading(true);
            await songNext({ next: searchState.songNext.substr(22) });
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

    const onClose = () => {
        if(viewerModal){
            setViewerModal(false)
            return;
        }
        setRepresentModal(false);
        setStoryModal(false);
        setIsPlayingid('0');
        if(newStory){
            setNewStory(false);
            initHint();
            searchinit();
            setText('');
            setTok(false);
        }
        TrackPlayer.reset()
        setDeleteModal(false)
    }

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }
    const fetchData = async () => {
        setRefreshing(true);
        await Promise.all([
            getMyInfo(),
            getMyStory()
        ])
        setRefreshing(false);
    };
    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])

    const storyClick = () => {
        setStoryModal(true);
        if(userState.myStory.song.attributes.contentRating != "explicit"){
            addtracksong({ data: userState.myStory.song, setIsPlayingid, setHarmfulModal });
        }
    }

    useEffect(() => {
        if(text == ''){
            initHint();
        }else{
            searchHint({term: text});
        }
    }, [text]);

    useEffect(() => {
        if(userState.myStory != null){
            setUrl(userState.myStory.song.attributes.artwork.url);
        }else {
            setUrl('')
        }
        setStoryModal(false)
    }, [userState.myStory]);

    useEffect(() => {
        var newDate = new Date();
        setToday(newDate.toFormat('YYYY.MM.DD'))
    }, []);

    useFocusEffect(
        useCallback(() => {
            TrackPlayer.reset()
        }, [])
    )

    return (
        <View style={{backgroundColor: 'rgb(250,250,250)', flex: 1}}>
            { userState.myInfo == null ? <View style={{ justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View> :
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <TouchableOpacity  style={{position :"absolute", left:12 * tmpWidth,width:40 * tmpWidth, height:40 * tmpWidth}} onPress={() => setMusicBoxModal(true)}>
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/musicBox.svg')}/>
                    </TouchableOpacity>
                    <Text style={{fontSize: 16 * tmpWidth, fontWeight: 'bold'}}>{userState.myInfo.name}</Text>
                    <TouchableOpacity  style={{position :"absolute",right:12 * tmpWidth,width:40 * tmpWidth, height:40 * tmpWidth}} onPress={() => navigate('Setting')}>
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/setting.svg')}/>
                    </TouchableOpacity>
                </View>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}       
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{height: '100%'}}>
                        <View>
                            <View style={{flexDirection: 'row', width:375 * tmpWidth, height:128 * tmpWidth, justifyContent: 'center', marginTop:10 * tmpWidth}}>
                                <View style={{alignItems: 'center', marginTop: 37 * tmpWidth }}>
                                    <TouchableOpacity onPress={() => {
                                        setRepresentModal(true)
                                    }}>
                                        <SongImage url={userState.myInfo.songs[0].attributes.artwork.url} size={68} border={68}/>
                                    </TouchableOpacity>
                                    <Text style={{marginTop: 10 * tmpWidth , fontSize: 12 * tmpWidth, color: 'rgb(80,80,80)'}}>대표곡</Text>
                                </View>
                                { userState.myInfo.profileImage == undefined ?
                                <View style={styles.profileImage}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                </View> : <Image style={styles.profileImage} source={{uri: userState.myInfo.profileImage}}/> }
                                <View style={{alignItems: 'center', marginTop: 37 * tmpWidth }}>
                                    { url == '' ?
                                    <TouchableOpacity style={styles.songImage} onPress={() => setNewStory(true)}>
                                        <SvgUri width={68 * tmpWidth} height={64 * tmpWidth} source={require('../../assets/icons/story.svg')}/>
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => {
                                        storyCalendar({id: userState.myInfo._id})
                                        storyClick()}}>
                                        <SongImage url={url} size={68} border={68}/>
                                    </TouchableOpacity> }
                                    <Text style={{marginTop: 10 * tmpWidth , fontSize: 12 * tmpWidth, color: 'rgb(80,80,80)'}}>오늘의 곡</Text>
                                </View>
                            </View>
                            <View style={styles.nameBox}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                                    <View style={{flexDirection: 'row', width:200 * tmpWidth}}>
                                        <TouchableOpacity style={{flexDirection: 'row',alignItems:'center', marginRight: 12 * tmpWidth }} onPress={() => {
                                            push('Follow', {option: 'MyAccount', name: userState.myInfo.name, type: 'following'})
                                        }}>
                                            <Text style={{fontSize: 12 * tmpWidth}}>팔로잉 </Text>
                                            <Text style={{fontSize: 14 * tmpWidth, fontWeight: '600'}}>{userState.myInfo.following.length}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flexDirection: 'row',alignItems:'center',marginRight: 12 * tmpWidth }} onPress={() => {
                                            push('Follow', {option: 'MyAccount', name: userState.myInfo.name, type: 'follower'})
                                        }}>
                                            <Text style={{fontSize: 12 * tmpWidth}}>팔로워 </Text>
                                            <Text style={{fontSize: 14 * tmpWidth, fontWeight: '600'}}>{userState.myInfo.follower.length}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width:155 * tmpWidth, alignItems:'flex-end'}}>
                                        <TouchableOpacity style={styles.profileEditBox} onPress={() => navigate('ProfileEdit')}>
                                            <Text style={{fontSize:12 * tmpWidth, color: 'rgb(169,193,255)'}}>프로필 편집</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {userState.myInfo.introduction != ''  ? 
                            <View style={{alignItems: 'center',}}>
                                <View style={styles.infoBox}>
                                    <Text>{userState.myInfo.introduction}</Text>
                                </View>
                            </View> : null }
                        </View>
                        <View style={styles.opt}>
                            <TouchableOpacity style={result=='playlist' ? styles.selectedOption : styles.notselectedOption} onPress={() => setResult('playlist')}>
                                <Text style={result=='playlist' ? {fontWeight:'500',fontSize:14*tmpWidth,color:'#000', textAlign: 'center'} : {fontSize:14*tmpWidth,color:'rgba(25,25,25,0.5)', textAlign: 'center'}}>플레이리스트 {userState.myInfo.playlists.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={result=='curating' ? styles.selectedOption : styles.notselectedOption} onPress={() => setResult('curating')}>
                                <Text style={result=='curating' ? {fontWeight:'500',fontSize:14*tmpWidth,color:'#000', textAlign: 'center'} : {fontSize:14*tmpWidth,color:'rgba(25,25,25,0.5)', textAlign: 'center'}}>큐레이션 {userState.myInfo.curationposts.length}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: 'rgb(255,255,255))'}}>
                            { result == 'playlist' ?  <AccountPlaylist playList={userState.myInfo.playlists} myAccount={true} /> :
                            <AccountCurating curating={userState.myInfo.curationposts} myAccount={true} /> }
                        </View>
                    </View>
                </ScrollView>
            </View> }
            <RepresentSong representModal={representModal} setRepresentModal={setRepresentModal} song={userState.myInfo.songs} myAccount={true}/>
            <Modal
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={newStory}
                onBackdropPress={onClose}
                backdropOpacity={0.5}
            >
                <View style={styles.searchContainer}>
                    <View style={styles.searchheader}>
                        <View style={{width:32 * tmpWidth, height:32 * tmpWidth}}/>
                        <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(80,80,80)', marginTop: 24 * tmpWidth}}>오늘의 곡</Text>
                        <TouchableOpacity style={{width:32 * tmpWidth, height:32 * tmpWidth, marginTop: 5  * tmpWidth}} onPress={() => onClose()}>
                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalexit.svg')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchBox}>
                        <View style={{width: 40  * tmpWidth, height: 40 * tmpWidth ,marginLeft: 14 * tmpWidth , marginRight: 7 * tmpWidth }}>
                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/storySearch.svg')}/>
                        </View>
                        <TextInput
                            value = {text}
                            onChangeText={(text)=>{
                                setText(text)
                                if(text=='')    setTok(false)
                            }}
                            placeholder="오늘의 곡을 검색해주세요."
                            autoCapitalize='none'
                            autoCorrect={false}
                            onSubmitEditing= {()=> {
                                searchsong({ songname: text})
                                setTok(true)
                            }}
                            placeholderTextColor= 'rgb(211,211,211)'
                            style={{fontSize: 16 * tmpWidth, width:tmpWidth*200}}
                        />
                            <TouchableOpacity 
                              style={{width:40 * tmpWidth, height:40 * tmpWidth,marginLeft:10 * tmpWidth, marginTop:7 * tmpWidth}}
                              onPress={()=>{Keyboard.dismiss(); setText(''); setTok(false);}}
                            >
                              <SvgUri width='95%' height='95%' source={require('../../assets/icons/cancel.svg')}  />
                            </TouchableOpacity>  
                    </View>
                    <View style={styles.searchresult}>
                        { tok ?
                        searchState.songData.length == 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}><ActivityIndicator /></View> :
                        <FlatList
                            contentContainerStyle={{paddingTop: 14 * tmpWidth}}
                            data={searchState.songData}
                            keyExtractor={song=>song._id}
                            onEndReached={onEndReached}
                            onEndReachedThreshold={0}
                            ListFooterComponent={loading && <ActivityIndicator />}
                            renderItem={({item})=> {
                                return (
                                    <View>
                                        { selectedId != item.id ?
                                        <TouchableOpacity style={styles.searcheditem} onPress={() => setSelectedId(item.id)}>
                                            <TouchableOpacity onPress={() => {
                                                if(isPlayingid == item.id){
                                                    stoptracksong({ setIsPlayingid })
                                                }else{
                                                    addtracksong({ data: item, setIsPlayingid, setHarmfulModal })
                                                }
                                            }}>
                                                <SongImage url={item.attributes.artwork.url} size={50} border={50}/>
                                                { isPlayingid != item.id ? 
                                                <SvgUri width='24' height='24' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 13 * tmpWidth, top: 13 * tmpWidth}}/> :
                                                <SvgUri width='24' height='24' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 13 * tmpWidth, top: 13 * tmpWidth}}/> }
                                            </TouchableOpacity>
                                            {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }    
                                            <View style={{marginLeft: 19 * tmpWidth }}>
                                                <View style={{width: 180 * tmpWidth, flexDirection: 'row', alignItems: 'center' }}>
                                                    {item.attributes.contentRating == "explicit" ? 
                                                    <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                    : null }
                                                    <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                                </View>
                                                <View style={{width: 200 * tmpWidth }}>
                                                    <Text style={{fontSize:12 * tmpWidth, color: 'rgb(148,153,163)', marginTop: 4 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.searcheditem2} onPress={() => setSelectedId('')}>
                                            <TouchableOpacity onPress={() => {
                                                if(isPlayingid == item.id){
                                                    stoptracksong({ setIsPlayingid })
                                                }else{
                                                    addtracksong({ data: item, setIsPlayingid, setHarmfulModal })
                                                }
                                            }}>
                                                <SongImage url={item.attributes.artwork.url} size={50} border={50}/>
                                                { isPlayingid != item.id ? 
                                                <SvgUri width='24' height='24' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 13 * tmpWidth, top: 13 * tmpWidth}}/> :
                                                <SvgUri width='24' height='24' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 13 * tmpWidth, top: 13 * tmpWidth}}/> }
                                            </TouchableOpacity>
                                            <View style={styles.searchediteminfo}>
                                                <View>
                                                    <View style={{width: 150 * tmpWidth, flexDirection: 'row', alignItems: 'center' }}>
                                                        {item.attributes.contentRating == "explicit" ? 
                                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                        : null }
                                                        <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                                    </View>
                                                    <View style={{width: 180 * tmpWidth}}>
                                                        <Text style={{fontSize:12 * tmpWidth, color: 'rgb(148,153,163)', marginTop: 4 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity style={styles.completeView} onPress={async () => {
                                                    await postStory({song: item})
                                                    await getOtherStory()
                                                    getMyStory()
                                                    onClose()
                                                }}>
                                                    <Text style={styles.completeBox}>공유</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity> }
                                    </View>
                                )
                            }}
                        /> :
                        <FlatList
                            style={{marginLeft: 24 * tmpWidth , marginTop: 20 * tmpWidth, }}
                            data={searchState.hint}
                            keyExtractor={term=>term}
                            renderItem={({item})=> {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        searchsong({ songname: item })
                                        setTok(true)}}>
                                        <Text style={{fontSize: 16 * tmpWidth, marginBottom: 24 * tmpWidth }}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        /> }
                    </View>
                </View>
            </Modal>
            <Modal
                animationIn='fadeInRight'
                animationOut='fadeOutLeft'
                isVisible={storyModal}
                onBackdropPress={onClose}
                backdropOpacity={0.5}
                style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
            >
                <View style={styles.storyContainer}>
                    {userState.myStory != null ?
                    <View>
                        <Modal
                            isVisible={viewerModal}
                            onBackdropPress={onClose}
                            backdropOpacity={0.2}
                            style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}
                        >
                            <View style={styles.viewerContainer}>
                                <FlatList
                                    data={userState.storyViewer}
                                    keyExtractor={user => user._id}
                                    style={{paddingTop: 18 * tmpWidth, marginLeft: 24 *tmpWidth}}
                                    renderItem={({item})=>{
                                        return (
                                            <TouchableOpacity 
                                                style={{flexDirection: 'row', alignItems: 'center', marginBottom: 18 * tmpWidth}} 
                                                onPress={async () => {
                                                    await Promise.all([
                                                        getOtheruser({id:item._id}),
                                                        getSongs({id:item._id}),
                                                        TrackPlayer.reset()
                                                    ]);
                                                    setViewerModal(false)
                                                    setStoryModal(false)
                                                    push('OtherAccount', {otherUserId:item._id})
                                                }}
                                            >
                                                { item.profileImage == undefined ?
                                                <View style={styles.storyProfileImage}>
                                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                </View> : <Image style={styles.storyProfileImage} source={{uri: item.profileImage}}/> }
                                                <Text style={{marginLeft: 12 * tmpWidth}}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        </Modal>
                        <StoryCalendar calendarModal={calendarModal} setCalendarModal={setCalendarModal}/>
                        <View style={{alignItems: 'center'}}>
                            {userState.storyViewer.length != 0 ?
                            <TouchableOpacity 
                                style={{height: 40 * tmpWidth, position: 'absolute', left: 20 * tmpWidth, top: 20 * tmpWidth}}
                                onPress={() => {
                                    setViewerModal(true)
                                }}
                            >
                                <FlatList 
                                    data={userState.storyViewer}
                                    keyExtractor={user=>user._id}
                                    horizontal={true}
                                    renderItem={({item, index}) => {
                                        if(index > 1)  return null
                                        return (
                                            <View style={index == 0 ? styles.firstPosition : styles.secondPosition}>
                                                { item.profileImage == undefined ?
                                                <View style={styles.smallViewr}>
                                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                </View> : <Image style={styles.smallViewr} source={{uri: item.profileImage}}/> }
                                            </View>
                                        )
                                    }}
                                />
                                <Text style={{fontSize:11 * tmpWidth, color: 'rgb(196,196,196)', textAlign: 'center'}}>{userState.storyViewer.length}명</Text>
                            </TouchableOpacity> : null }
                            <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(80,80,80)', marginTop: 20 * tmpWidth}}>오늘의 곡</Text>
                            <Text style={{fontSize: 14 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 5 * tmpWidth, marginBottom:21 * tmpWidth}}>{today}</Text>
                            <TouchableOpacity 
                                style={{height: 40 * tmpWidth, position: 'absolute', right: 13 * tmpWidth, top: 13 * tmpWidth}}
                                onPress={() => setCalendarModal(true)}
                            >
                                <SvgUri width='40' height='40' source={require('../../assets/icons/calendar.svg')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if(isPlayingid == userState.myStory.song.id){
                                    stoptracksong({ setIsPlayingid })
                                }else{
                                    addtracksong({ data: userState.myStory.song, setIsPlayingid, setHarmfulModal })
                                }
                            }}>
                                <SongImage url={userState.myStory.song.attributes.artwork.url} size={155} border={155}/>
                                { isPlayingid != userState.myStory.song.id ? 
                                <SvgUri width='56' height='56' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 49 * tmpWidth, top: 49 * tmpWidth}}/> :
                                <SvgUri width='56' height='56' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 49 * tmpWidth, top: 49 * tmpWidth}}/> }
                            </TouchableOpacity>
                            { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                            <View style={{marginTop:15 * tmpWidth , width: 160 * tmpWidth , marginBottom: 11 * tmpWidth, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                                {userState.myStory.song.attributes.contentRating == "explicit" ? 
                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                : null }
                                <Text style={{fontSize: 18 * tmpWidth, fontWeight: '400'}} numberOfLines={1}>{userState.myStory.song.attributes.name}</Text>
                            </View>
                            <View style={{marginBottom: 6*tmpWidth,width: 160 * tmpWidth, alignItems: 'center'}}>
                                <Text style={{fontSize:14 * tmpWidth, color:'rgb(133,133,133)'}} numberOfLines={1}>{userState.myStory.song.attributes.artistName}</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                            onPress={() => {
                                stoptracksong({ setIsPlayingid })
                                setDeleteModal(true)
                            }}
                            style={styles.deleteBox}
                        >
                            <Text style={{fontSize: 14 * tmpWidth, color: 'rgb(255,255,255)'}}>삭제</Text>
                        </TouchableOpacity>  
                        { deleteModal ? <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} type={'todaySong'} /> : null }
                    </View> : null}
                </View>
            </Modal>
            { musicBoxModal && <MusicBoxModal musicBoxModal={musicBoxModal} setMusicBoxModal={setMusicBoxModal} />}
        </View>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: 114 * tmpWidth ,
        height: 114 * tmpWidth ,
        borderRadius: 128 * tmpWidth,
        marginLeft: 32 * tmpWidth,
        marginRight: 32 * tmpWidth
    },
    songImage: {
        width: 68 * tmpWidth ,
        height: 68  * tmpWidth,
        borderRadius: 64 * tmpWidth,
        backgroundColor: 'rgba(169,193,255,0.3)',
    },
    followBox: {
        width: 64 * tmpWidth ,
        height: 25 * tmpWidth ,
        borderRadius: 30 * tmpWidth,
        backgroundColor: 'rgba(169,193,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameBox: {
        flexDirection: 'row',
        height: 25 * tmpWidth ,
        alignItems: 'center',
        paddingLeft: 20  * tmpWidth,
        paddingRight: 16 * tmpWidth,
        marginTop: 25 * tmpWidth,
    },
    infoBox: {
        width: 334 * tmpWidth ,
        marginTop: 15 * tmpWidth ,
    },
    selectedOption: {
        height: 28*tmpWidth,
        borderBottomWidth: 1.4 * tmpWidth,
        borderBottomColor: 'rgba(25,25,25,1)',
        width: 160 * tmpWidth,
    },
    notselectedOption: {
        height: 28*tmpWidth,
        width: 160 * tmpWidth
    },
    storyContainer: {
        width: 271 * tmpWidth ,
        height: 352 * tmpWidth ,
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
    innerContainer: {
        width: 215 * tmpWidth ,
        height: 289 * tmpWidth ,
        borderRadius: 16 * tmpWidth,
        borderWidth: 2 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        marginTop: 24  * tmpWidth,
        alignItems: 'center'
    },
    searchContainer: {
        marginLeft:4 * tmpWidth,
        width: 327  * tmpWidth,
        height: 478 * tmpWidth,
        borderRadius: 12 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
    },
    searchBox: {
        height: 53  * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchSongCover: {
        width: 50  * tmpWidth,
        height: 50  * tmpWidth,
        borderRadius: 50 * tmpWidth
    },
    completeView: {
        borderWidth: 1 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        borderColor: 'rgb(167,191,240)',
    },
    completeBox: {
        marginLeft: 8  * tmpWidth,
        marginRight: 8  * tmpWidth,
        marginTop: 4  * tmpWidth,
        marginBottom: 4  * tmpWidth,
        fontSize: 11 * tmpWidth,
        color: 'rgb(160,172,211)',
    },
    profileEditBox: {
        width: 87 * tmpWidth,
        height: 25  * tmpWidth,
        borderRadius: 30 * tmpWidth,
        borderWidth: 0.8 * tmpWidth,
        marginRight:24 * tmpWidth,
        backgroundColor:'rgba(255,255,255,0.5)',
        borderColor: 'rgba(169,193,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    header:{
        height:40  * tmpWidth,
        marginTop:40 * tmpWidth,
        width:375 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchheader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 5  * tmpWidth,
        marginLeft: 5  * tmpWidth,
        height: 56 * tmpWidth,
    },
    searchresult:{
        backgroundColor: 'rgb(250,250,250)',
        flex: 1,
        borderBottomLeftRadius:10 * tmpWidth,
        borderBottomRightRadius:10 * tmpWidth
    },
    searcheditem:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2  * tmpWidth,
        paddingLeft: 20  * tmpWidth,
        height: 61 * tmpWidth
    },
    searcheditem2:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2  * tmpWidth,
        backgroundColor:'rgb(238,244,255)',
        paddingLeft: 20  * tmpWidth,
        height: 61 * tmpWidth
    },
    searchediteminfo:{
        marginLeft: 19  * tmpWidth,
        flexDirection: 'row',
        marginRight: 20  * tmpWidth,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    story:{
        width:30 * tmpWidth,
        height:30 * tmpWidth,
        marginTop: 16  * tmpWidth,
        alignItems: 'flex-end',
        marginLeft: 283 * tmpWidth
    },
    opt:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        paddingLeft: 20 * tmpWidth,
        paddingRight: 20  * tmpWidth,
        height:52 * tmpWidth,
        backgroundColor:'rgb(250,250,250)',
        borderBottomWidth : 1*tmpWidth,
        borderColor:'rgba(153,153,153,0.2)',
        marginTop: 5 * tmpWidth
    },
    deleteBox: {
        alignItems:'center', 
        justifyContent:'center', 
        marginTop: 16 * tmpWidth, 
        backgroundColor: 'rgb(169,193,255)',
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0 * tmpWidth,
            width: 0 * tmpWidth,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
        paddingTop: 11 * tmpWidth,
        paddingBottom: 11 * tmpWidth,
        borderBottomLeftRadius: 16 * tmpWidth,
        borderBottomRightRadius: 16 * tmpWidth,
    },
    viewerContainer: {
        height: 352 * tmpWidth ,
        borderRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(250,250,250)',
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
        width: '100%'
    },
    storyProfileImage: {
        width: 50 * tmpWidth,
        height: 50 * tmpWidth,
        borderRadius: 50 * tmpWidth
    },
    firstPosition: {
        position: 'absolute'
    },
    secondPosition: {
        marginLeft: 12 * tmpWidth
    },
    smallViewr: {
        width: 20 * tmpWidth,
        height: 20 * tmpWidth,
        borderRadius: 20 * tmpWidth
    }

});

export default MyAccountScreen;