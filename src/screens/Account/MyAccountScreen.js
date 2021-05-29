import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, StyleSheet, RefreshControl, ActivityIndicator, View, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { Context as UserContext } from '../../context/UserContext';
import { Context as SearchContext } from '../../context/SearchContext';
import { navigate } from '../../navigationRef';
import AccountPlaylist from  '../../components/Account/AccountPlaylist';
import AccountCurating from  '../../components/Account/AccountCurating';
import Modal from 'react-native-modal';
import TrackPlayer from 'react-native-track-player';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';
import HarmfulModal from '../../components/HarmfulModal';
import DeleteModal from '../../components/DeleteModal';

require('date-utils');
const ImageSelect = ({url, opac}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        <Image style ={{borderRadius :100 * tmpWidth, opacity : opac , height:'100%', width:'100%'}} source ={{url:url}}/>
    );
};

const MyAccountScreen = ({navigation}) => {
    const { state: userState, postStory, getMyInfo } = useContext(UserContext);
    const { state: searchState, searchsong, searchinit, songNext, searchHint, initHint } = useContext(SearchContext);
    const [result, setResult] = useState('playlist');
    const [representModal, setRepresentModal] = useState(false);
    const [storyModal, setStoryModal] = useState(false);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [url, setUrl] = useState('');
    const [newStory, setNewStory] = useState(false);
    const [representSong, setRepresentSong] = useState(null);
    const [idx, setIdx] = useState(0);
    const [type, setType] = useState('Each');
    const [today, setToday] = useState('');
    const [tok, setTok] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [harmfulModal, setHarmfulModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
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

    const onClose = async () => {
        setRepresentModal(false);
        setStoryModal(false);

        setIsPlayingid('0');
        setIdx(0);
        setType('Each');
        setRepresentSong(null);
        if(newStory){
            setNewStory(false);
            initHint();
            searchinit();
            setText('');
            setTok(false);
        }
        await TrackPlayer.reset()
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
        await getMyInfo();
        setRefreshing(false);
    };
    const addtracksong= async ({data}) => {
        const track = new Object();
        track.id = data.id;
        track.url = data.attributes.previews[0].url;
        track.title = data.attributes.name;
        track.artist = data.attributes.artistName;
        if (data.attributes.contentRating != "explicit") {
            await TrackPlayer.reset()
            setIsPlayingid(data.id);
            await TrackPlayer.add(track)
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
        setIdx(idx);
        setRepresentSong(userState.myInfo.songs[idx]);
    }

    const storyClick = () => {
        setStoryModal(true);
        if(userState.myStory.song.attributes.contentRating != "explicit"){
            addtracksong({data: userState.myStory.song});
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
        const listener = navigation.addListener('didFocus', async () => {
            await TrackPlayer.reset()
        });
        return () => listener.remove()
    }, []);

    return (
        <View style={{backgroundColor: 'rgb(255,255,255)', flex: 1}}>
            { userState.myInfo == null ? <View style={{ justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View> :
            <View style={{flex: 1}}>
                <View style={styles.header}>
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
                            <View style={{flexDirection: 'row', width:375 * tmpWidth, height:128 * tmpWidth, justifyContent: 'center', marginTop:10 * tmpWidth }}>
                                <View style={{alignItems: 'center', marginTop: 37 * tmpWidth }}>
                                    <TouchableOpacity style={styles.songImage} onPress={() => {
                                        setRepresentModal(true)
                                        setRepresentSong(userState.myInfo.songs[0])
                                    }}>
                                        <ImageSelect url={userState.myInfo.songs[0].attributes.artwork.url}/>
                                    </TouchableOpacity>
                                    <Text style={{marginTop: 10 * tmpWidth , fontSize: 11 * tmpWidth, color: 'rgb(80,80,80)'}}>대표곡</Text>
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
                                    <TouchableOpacity style={styles.songImage} onPress={() => storyClick()}>
                                        <ImageSelect url={url} />
                                    </TouchableOpacity> }
                                    <Text style={{marginTop: 10 * tmpWidth , fontSize: 11 * tmpWidth, color: 'rgb(80,80,80)'}}>오늘의 곡</Text>
                                </View>
                            </View>
                            <View style={styles.nameBox}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                                    <View style={{flexDirection: 'row', width:200 * tmpWidth}}>
                                        <TouchableOpacity style={{flexDirection: 'row',alignItems:'center', marginRight: 12 * tmpWidth }} onPress={() => {
                                            navigation.push('Follow', {option: 'MyAccount', name: userState.myInfo.name, type: 'following'})
                                        }}>
                                            <Text style={{fontSize: 12 * tmpWidth}}>팔로잉 </Text>
                                            <Text style={{fontSize: 14 * tmpWidth, fontWeight: 'bold'}}>{userState.myInfo.following.length}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flexDirection: 'row',alignItems:'center',marginRight: 12 * tmpWidth }} onPress={() => {
                                            navigation.push('Follow', {option: 'MyAccount', name: userState.myInfo.name, type: 'follower'})
                                        }}>
                                            <Text style={{fontSize: 12 * tmpWidth}}>팔로워 </Text>
                                            <Text style={{fontSize: 14 * tmpWidth, fontWeight: 'bold'}}>{userState.myInfo.follower.length}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width:155 * tmpWidth, alignItems:'flex-end'}}>
                                        <TouchableOpacity style={styles.profileEditBox} onPress={() => navigate('ProfileEdit')}>
                                            <Text style={{fontSize:12 * tmpWidth, color: 'rgb(169,193,255)'}}>프로필 편집</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {userState.myInfo.introduction != '' ? 
                            <View style={{alignItems: 'center'}}>
                                <View style={styles.infoBox}>
                                    <Text>{userState.myInfo.introduction}</Text>
                                </View>
                            </View> : null }
                        </View>
                        <View style={styles.opt}>
                            <TouchableOpacity style={result=='playlist' ? styles.selectedOption : styles.notselectedOption} onPress={() => setResult('playlist')}>
                                <Text>플레이리스트 {userState.myInfo.playlists.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={result=='curating' ? styles.selectedOption : styles.notselectedOption} onPress={() => setResult('curating')}>
                                <Text>큐레이션 {userState.myInfo.curationposts.length}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: 'rgb(250,250,250)'}}>
                            { result == 'playlist' ?  <AccountPlaylist playList={userState.myInfo.playlists} myAccount={true}/> :
                            <AccountCurating curating={userState.myInfo.curationposts} myAccount={true}/> }
                        </View>
                    </View>
                </ScrollView>
            </View> }
            {representSong != null ?
            <Modal
                isVisible={representModal}
                onBackdropPress={onClose}
                backdropOpacity={0.5}
                style={{justifyContent:'flex-end', margin:0}}
            >
                <View style={styles.representSongBox}>
                    <View style={{ marginTop: 20 * tmpWidth ,justifyContent: 'center'}}>
                        <View style={{alignItems: 'center', flexDirection:'row'}}>
                            <Text style={{marginLeft:166 * tmpWidth,fontSize: 16 * tmpWidth, color: 'rgb(80,80,80)'}}>대표곡</Text>
                            <TouchableOpacity style={{width:30 * tmpWidth, marginLeft:130 * tmpWidth,height:30 * tmpWidth, }} onPress={()=>{onClose();}}>
                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalexit.svg')}/>
                            </TouchableOpacity>
                        </View>
                        {type == 'Each' ?
                        <TouchableOpacity onPress={() => {
                            onClose()
                            navigate('SongEdit', {'data': userState.myInfo.songs})}}
                            style={styles.songedit}
                        >
                            <Text style={{fontSize: 14 * tmpWidth, color:'rgba(141,153,255,0.7)'}}>수정하기</Text>
                            <SvgUri width={18 * tmpWidth} height={18 * tmpWidth} source={require('../../assets/icons/representchange.svg')}/>
                        </TouchableOpacity> :
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 4 * tmpWidth }}>{userState.myInfo.songs.length}곡</Text>
                        </View> }
                    </View>
                    {type == 'Each' ?
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 * tmpWidth }}>
                            <View style={styles.leftSideBox}>
                                {idx != 0 ? 
                                <TouchableOpacity style={{width:40 * tmpWidth, height:40 * tmpWidth}} onPress={() => {
                                    stoptracksong()
                                    representNext({idx: idx-1})
                                }}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/representleft.svg')}/>
                                </TouchableOpacity> : null}
                            </View>
                            <View style={styles.songBox}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={{width: 150 * tmpWidth , flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        {representSong.attributes.contentRating == "explicit" ? 
                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth, paddingTop: 20 * tmpWidth, paddingBottom: 25 * tmpWidth}}/> 
                                        : null }
                                        <Text style={styles.representsongname} numberOfLines={1}>{representSong.attributes.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.representSongCover} onPress={() => {
                                        if(isPlayingid == representSong.id) {
                                            stoptracksong()
                                        }else{
                                            addtracksong({data:representSong})
                                        }
                                    }}>
                                        <ImageSelect opac={1.0} url={representSong.attributes.artwork.url}/>
                                        { isPlayingid != representSong.id ? 
                                        <SvgUri width='50' height='50' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> :
                                        <SvgUri width='50' height='50' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> }
                                    </TouchableOpacity>
                                    {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                    <Text style={{fontSize: 14 * tmpWidth, marginTop: 29 * tmpWidth}}>{representSong.attributes.artistName}</Text>
                                    <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(118,118,118)', marginTop: 7 * tmpWidth }}>{representSong.attributes.releaseDate}</Text>
                                </View>
                            </View>
                            <View style={styles.rightSideBox}>
                                {idx != userState.myInfo.songs.length-1 ? 
                                <TouchableOpacity style={{width:40 * tmpWidth, height:40 * tmpWidth}} onPress={() => {
                                    stoptracksong()
                                    representNext({idx: idx+1})
                                }}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/representright.svg')}/>
                                </TouchableOpacity> : null }
                            </View>
                        </View>
                        <View style={{alignItems: 'center', marginTop: 14 * tmpWidth }}>
                            <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(118,118,118)'}}>{idx+1}/{userState.myInfo.songs.length}</Text>
                            <TouchableOpacity style={styles.representlistbutton} onPress={() => {
                                setType('List')}}>
                                <SvgUri width={18 * tmpWidth} height={18 * tmpWidth} source={require('../../assets/icons/representlist.svg')}/>
                                <Text style={{fontSize: 11 * tmpWidth, color: 'rgb(153,153,153)',}}>목록보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View> :
                    <View>
                        <View style={styles.line}/>
                        <View style={{height: 335 * tmpWidth }}>
                            <FlatList
                                data={userState.myInfo.songs}
                                keyExtractor={song=>song.attributes.name}
                                renderItem={({item}) => {
                                    return (
                                        <View style={styles.listBox}>
                                            <TouchableOpacity style={styles.listSongCover} onPress={() => {
                                                if(isPlayingid == item.id){
                                                    stoptracksong()
                                                }else{
                                                    addtracksong({data: item})
                                                }
                                            }}>
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
                                                <Text style={{fontSize:11 * tmpWidth , color: 'rgb(148,153,163)', marginTop: 4.8 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
                            setType('Each')}} >
                            <Text style={{fontSize: 11 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 33 * tmpWidth}}>개별 보기</Text>
                        </TouchableOpacity>
                    </View> }
                </View>
            </Modal> : null }
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
                            style={{fontSize: 16 * tmpWidth}}
                        />
                    </View>
                    <View style={styles.searchresult}>
                        { tok ?
                        searchState.songData.length == 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}><ActivityIndicator /></View> :
                        <FlatList
                            style={{marginTop: 14 * tmpWidth }}
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
                                            <TouchableOpacity style={styles.searchSongCover} onPress={() => {
                                                if(isPlayingid == item.id){
                                                    stoptracksong()
                                                }else{
                                                    addtracksong({data: item})
                                                }
                                            }}>
                                                <ImageSelect opac={1.0} url={item.attributes.artwork.url} />
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
                                            <TouchableOpacity style={styles.searchSongCover} onPress={() => {
                                                if(isPlayingid == item.id){
                                                    stoptracksong()
                                                }else{
                                                    addtracksong({data: item})
                                                }
                                            }}>
                                                <ImageSelect opac={1.0} url={item.attributes.artwork.url} />
                                                { isPlayingid != item.id ? 
                                                <SvgUri width='24' height='24' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 13 * tmpWidth, top: 13 * tmpWidth}}/> :
                                                <SvgUri width='24' height='24' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 13 * tmpWidth, top: 13 * tmpWidth}}/> }
                                            </TouchableOpacity>
                                            <View style={styles.searchediteminfo}>
                                                <View>
                                                    <View style={{width: 180 * tmpWidth, flexDirection: 'row', alignItems: 'center' }}>
                                                        {item.attributes.contentRating == "explicit" ? 
                                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                        : null }
                                                        <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                                    </View>
                                                    <View style={{width: 180 * tmpWidth }}>
                                                        <Text style={{fontSize:12 * tmpWidth, color: 'rgb(148,153,163)', marginTop: 4 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity style={styles.completeView} onPress={() => {
                                                    postStory({song: item})
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
            >
                <View style={styles.storyContainer}>
                    {userState.myStory != null ?
                    <View>
                        <TouchableOpacity style={styles.story} onPress={() => onClose()}>
                            <SvgUri width={30 * tmpWidth} height={30 * tmpWidth} source={require('../../assets/icons/modalexit.svg')}/>
                        </TouchableOpacity>
                        <View style={{alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(80,80,80)'}}>오늘의 곡</Text>
                                <TouchableOpacity onPress={() => {
                                    stoptracksong()
                                    //setStoryModal(false)
                                    setDeleteModal(true)
                                }}>
                                    <Text>삭제</Text>
                                </TouchableOpacity>
                                { deleteModal ? <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} type={'todaySong'} /> : null }
                            </View>
                            <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 4}}>{today}</Text>
                            <View style={styles.innerContainer}>
                                <View style={{marginTop:20 * tmpWidth , width: 160 * tmpWidth , marginBottom: 25  * tmpWidth, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                                    {userState.myStory.song.attributes.contentRating == "explicit" ? 
                                    <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                    : null }
                                    <Text style={{fontSize: 18 * tmpWidth, fontWeight: 'bold'}} numberOfLines={1}>{userState.myStory.song.attributes.name}</Text>
                                </View>
                                <TouchableOpacity style={styles.representSongCover} onPress={() => {
                                    if(isPlayingid == userState.myStory.song.id){
                                        stoptracksong()
                                    }else{
                                        addtracksong({data: userState.myStory.song})
                                    }
                                }}>
                                    <ImageSelect opac={1.0} url={userState.myStory.song.attributes.artwork.url} />
                                    { isPlayingid != userState.myStory.song.id ? 
                                    <SvgUri width='50' height='50' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> :
                                    <SvgUri width='50' height='50' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> }
                                </TouchableOpacity>
                                { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }       
                                <View style={{width: 180 * tmpWidth, alignItems: 'center'}}>
                                    <Text style={{fontSize:14 * tmpWidth, marginTop: 29 * tmpWidth }} numberOfLines={1}>{userState.myStory.song.attributes.artistName}</Text>
                                </View>
                                <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(118,118,118)', marginTop: 7 * tmpWidth }}>{userState.myStory.song.attributes.releaseDate}</Text>
                            </View>
                        </View>
                    </View> : null}
                </View>
            </Modal>
        </View>
    );
};

MyAccountScreen.navigationOptions = ({navigation})=>{
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    profileImage: {
        width: 128 * tmpWidth ,
        height: 128 * tmpWidth ,
        borderRadius: 128 * tmpWidth,
        marginLeft: 32 * tmpWidth,
        marginRight: 32 * tmpWidth
    },
    songImage: {
        width: 64 * tmpWidth ,
        height: 64  * tmpWidth,
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
        marginTop:38 * tmpWidth,
    },
    infoBox: {
        width: 334 * tmpWidth ,
        marginTop: 25 * tmpWidth ,
        marginBottom: 20 * tmpWidth,
    },
    selectedOption: {
        paddingLeft: 9  * tmpWidth,
        paddingRight: 9 * tmpWidth,
        paddingBottom: 6 * tmpWidth ,
        borderBottomWidth: 2 * tmpWidth,
        borderBottomColor: 'rgba(25,25,25,0.5)'
    },
    notselectedOption: {
        paddingLeft: 9 * tmpWidth,
        paddingRight: 9  * tmpWidth,
    },
    representSongBox: {
        height:463 * tmpWidth ,
        backgroundColor: 'rgb(250,250,250)', 
        borderTopRightRadius: 16 * tmpWidth,
        borderTopLeftRadius: 16 * tmpWidth,
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0 * tmpWidth,
            width: 0 * tmpWidth,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
    },
    songBox: {
        width: 215  * tmpWidth,
        height: 289 * tmpWidth ,
        borderRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)' 
    },
    leftSideBox: {
        width: 48 * tmpWidth ,
        height: 289 * tmpWidth ,
        borderTopRightRadius: 16 * tmpWidth,
        borderBottomRightRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightSideBox: {
        width: 48 * tmpWidth ,
        height: 289  * tmpWidth,
        borderTopLeftRadius: 16 * tmpWidth,
        borderBottomLeftRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    representSongCover: {
        width: 134 * tmpWidth ,
        height: 134  * tmpWidth,
        borderRadius: 134 * tmpWidth,
    },
    listBox: {
        height: 57 * tmpWidth ,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20 * tmpWidth ,
        marginTop: 12 * tmpWidth
    },
    listSongCover:{
        width: 57 * tmpWidth,
        height: 57  * tmpWidth,
        borderRadius: 57 * tmpWidth,
    },
    storyContainer: {
        width: 333 * tmpWidth ,
        height: 442 * tmpWidth ,
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
        flexDirection: 'row'
    },
    songedit:{
        height:16 * tmpWidth,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    representsongname:{
        fontSize: 18 * tmpWidth,
        fontWeight: 'bold',
        paddingTop: 20  * tmpWidth,
        paddingBottom: 25 * tmpWidth,
    },
    representlistbutton:{
        width:50 * tmpWidth,
        height:18 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:10 * tmpWidth
    },
    line:{
        borderBottomWidth: 0.7 * tmpWidth,
        borderColor: 'rgb(229,231,239)',
        marginTop: 5.3  * tmpWidth,
        marginLeft: 37  * tmpWidth,
        marginRight: 37 * tmpWidth
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
        alignItems:'center',
        paddingLeft: 60 * tmpWidth,
        paddingRight: 60  * tmpWidth,
        height:52 * tmpWidth,
        backgroundColor:'rgb(255,255,255)',
    },

});

export default MyAccountScreen;