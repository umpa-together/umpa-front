import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as DJContext } from '../../context/DJContext';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';
import HarmfulModal from '../../components/HarmfulModal';

const SongImage = ({url, play}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        play ? <Image style ={{borderRadius: 152 * tmpWidth , height:'100%', width:'100%', opacity: 0.5}} source ={{url:url}}/>
    : <Image style ={{borderRadius: 152 * tmpWidth, height:'100%', width:'100%', opacity: 1.0}} source ={{url:url}}/>
    );
};

const MusicArchivePage = ({navigation}) => {
    const { state, likeSong, unlikeSong, addSongView, getMusicArchive, getMusicChart } = useContext(BoardContext);
    const { state: userState, getOtheruser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [clickModal, setClickModal] = useState(false);
    const [storyTok , setStoryTok] = useState(false);
    const [like, setLike] = useState(false);

    const [selectedStory, setSelectedStory] = useState(undefined);
    const [selectedIdx, setSelectedIdx] =  useState(0);
    const [option, setOption] = useState('archive');
    const [harmfulModal, setHarmfulModal] = useState(false);

    useEffect(() => {
        const listener =navigation.addListener('didFocus', ()=>{
            getMusicArchive({boardId: state.boards._id});
            getMusicChart({boardId:  state.boards._id});
        });
        return () => {
            listener.remove();
        };
    }, [])
    const likeCheck = ({item}) => {
        if(item.likes.includes(userState.myInfo._id) != true){
            setLike(true);
        }else{
            setLike(false);
        }
    };
    const onClose = async () => {
        setClickModal(false);
        setIsPlayingid('0');
        await TrackPlayer.reset()
    }
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

    const storyClick = async ({item, index}) => {
        stoptracksong()
        likeCheck({item})
        setClickModal(true);
        setSelectedStory(item);
        console.log(selectedStory)
        setSelectedIdx(index);
        if(item.song.attributes.contentRating != 'explicit')    addtracksong({data:item.song});
        await addSongView({id: item._id, boardId: state.boards._id, postUserId: item.postUserId._id});
    };

    useEffect(() => {
        storyClick
    }, [storyTok]);
    return (
        <View style={styles.container}>
            {state.musicArchive == null || state.musicArchive == null ? <View style={{justifyContent: 'center', alignItems: 'center' ,flex: 1}}><ActivityIndicator /></View> :
            <View style={{flex: 1, width: '100%'}}>
                <View style={styles.shareBox}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.shareText}>공유된 음악</Text>
                        <TouchableOpacity onPress={() => navigate('SearchMusic', {name: navigation.getParam('name')})}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/songPlus.svg')}/>    
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 16 * tmpWidth, paddingLeft: 24 * tmpWidth}}
                        data={state.musicArchive}
                        keyExtractor={(song) => song._id}
                        horizontal={true}
                        renderItem={({item, index}) => {
                            return (
                                <View style={styles.musicArchiveContainer}>
                                    <View style={styles.songBox}>
                                        {isPlayingid == item.song.id ?
                                        <TouchableOpacity style={styles.songCover} onPress={()=> stoptracksong()}>
                                            <SongImage play={true} url={item.song.attributes.artwork.url}/>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.songCover} onPress={async ()=>{   {
                                            setOption('archive');
                                            storyClick({item, index})
                                        }}} >
                                            <SongImage play={false} url={item.song.attributes.artwork.url}/>
                                        </TouchableOpacity> }
                                        <View style={styles.nameBox}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                {item.song.attributes.contentRating == "explicit" ? 
                                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                : null }
                                                <Text style={styles.titleText} numberOfLines={1}>{item.song.attributes.name}</Text>
                                            </View>
                                            <Text style={styles.artistText} numberOfLines={1}>{item.song.attributes.artistName}</Text>
                                        </View>
                                    </View>    
                                    <Text style={styles.timeText}>{state.musicTime[item._id]}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={{flex: 1, width: '100%'}}>
                    <Text style={styles.chartText}>인기 순위</Text>
                    <FlatList 
                        style={{marginTop: 8 * tmpWidth}}
                        data={state.musicChart}
                        keyExtractor={(song) => song._id}
                        renderItem={({item, index}) => {
                            return (
                                <TouchableOpacity style={styles.popularSongBox} onPress={async () => {
                                    setOption('chart');
                                    storyClick({item, index})
                                    likeCheck({item})
                                }}>
                                    <Text style={styles.chartNum}>{index + 1}</Text>
                                    <View style={styles.eachSongBox}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={styles.popularSongCover}>
                                                <SongImage play={false} url={item.song.attributes.artwork.url} />
                                            </View>
                                            <View style={styles.popularNameBox}>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    {item.song.attributes.contentRating == "explicit" ? 
                                                    <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                    : null }
                                                    <Text style={styles.titleText} numberOfLines={1}>{item.song.attributes.name}</Text>
                                                </View>
                                                <Text style={styles.popularArtistText} numberOfLines={1}>{item.song.attributes.artistName}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.likeContainer}>
                                            <SvgUri width='24' height='24' source={require('../../assets/icons/musicView.svg')}/>
                                            <Text style={styles.likeText}>{item.views}</Text>
                                            <SvgUri width='24' height='24' source={require('../../assets/icons/musicHeart.svg')}/>
                                            <Text style={styles.likeText}>{item.likes.length}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>    
                            )
                        }}
                    />
                </View>
            </View> }
            { selectedStory != undefined ? 
            <Modal
                animationIn='fadeInLeft'
                animationOut='fadeOutRight'
                isVisible={clickModal}
                onBackdropPress={onClose}
                backdropOpacity={0.5}
                style={{alignItems: 'center'}}
            >  
                <View style={styles.modalBox}>
                    <View style={{flex: 1, margin: 16 * tmpWidth}}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={async () => {
                            setClickModal(false)
                            stoptracksong()
                            if(selectedStory.postUserId._id == userState.myInfo._id){
                                navigate('Account');
                            }else{
                                await Promise.all([getOtheruser({id: selectedStory.postUserId._id}),
                                getSongs({id:selectedStory.postUserId._id})]);
                                navigation.push('OtherAccount',{checkid:selectedStory.postUserId._id})
                            }
                        }}>
                            {selectedStory.postUserId.profileImage == undefined ? 
                            <View style={styles.profile}>
                               <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                            </View> :
                            <Image style={styles.profile} source={{uri: selectedStory.postUserId.profileImage}}/> }
                            <Text style={{marginLeft: 12 * tmpWidth}}>{selectedStory.postUser}</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContainer}>
                            <View style={styles.nextContainer}>
                            {selectedIdx != 0 ? 
                                <TouchableOpacity style={styles.nextIcon}
                                    onPress={() => {
                                    if(option == 'archive'){
                                        storyClick({item: state.musicArchive[selectedIdx-1], index: selectedIdx-1})
                                    }else{
                                        storyClick({item: state.musicChart[selectedIdx-1], index: selectedIdx-1})
                                    }}}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalLeft.svg')}/>
                                </TouchableOpacity> : <View style={styles.nextIcon}/>}
                            { isPlayingid == selectedStory.song.id ? 
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => stoptracksong()}>
                                <View style={styles.songscover}>
                                    <SongImage play={false} url={selectedStory.song.attributes.artwork.url} />
                                </View>
                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalStop.svg')} style={styles.playIcon}/>
                            </TouchableOpacity> :
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => addtracksong({data: selectedStory.song})}>
                                <View style={styles.songscover}>
                                    <SongImage play={false} url={selectedStory.song.attributes.artwork.url} />
                                </View>
                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalPlay.svg')} style={styles.playIcon}/>
                            </TouchableOpacity> }
                            { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal} /> : null }
                            {(option == 'archive' && selectedIdx != state.musicArchive.length-1) ||
                                 (option == 'chart' && selectedIdx != state.musicChart.length-1) ? 
                                <TouchableOpacity style={styles.nextIcon}
                                    onPress={() => {
                                        if(option == 'archive'){
                                            storyClick({item: state.musicArchive[selectedIdx+1], index: selectedIdx+1})
                                        }else{
                                            storyClick({item: state.musicChart[selectedIdx+1], index: selectedIdx+1})
                                        }}}
                                >
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/modalRight.svg')}/>
                                </TouchableOpacity>: <View style={styles.nextIcon}/>}
                            </View>
                            <View style={styles.textContainer}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {selectedStory.song.attributes.contentRating == "explicit" ? 
                                    <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                    : null }
                                    <Text numberOfLines={1} style={styles.modalTitleText}>{selectedStory.song.attributes.name}</Text>
                                </View>
                                <Text numberOfLines={1} style={styles.modalArtistText}>{selectedStory.song.attributes.artistName}</Text>
                            </View>
                            {like ? 
                            <TouchableOpacity style={styles.likeIcon}
                            onPress={async () => {
                                setLike(false)
                                await likeSong({id: selectedStory._id, boardName: navigation.getParam('name'), boardId: state.boards._id})}}>
                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/heart.svg')}/>     
                            </TouchableOpacity> : 
                            <TouchableOpacity style={styles.likeIcon}
                            onPress={async () => {
                                setLike(true)
                                await unlikeSong({id: selectedStory._id, boardId: state.boards._id})}}>
                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/hearto.svg')}/>
                            </TouchableOpacity> }
                        </View>
                    </View>
                </View>
            </Modal> : null}
        </View>
    )
};

MusicArchivePage.navigationOptions = ({navigation})=>{
    return {
        title: '음악 아카이브',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth,
            fontWeight: "400"
        }, 
        headerStyle: {
            backgroundColor: 'rgb(251,251,251)',
            height: 92 * tmpWidth,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowRadius: 0,
            shadowOpacity: 0,
        },
        headerLeft: () => {
            return (
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth}} onPress={() => navigation.goBack()}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        }
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(251,251,251)', 
        flex: 1,
        alignItems: 'center'
    },
    shareBox:{
        width: '100%',
        height: 262 * tmpWidth,
    },
    shareText: {
        fontSize: 16 * tmpWidth, 
        marginRight: 2 * tmpWidth, 
        marginTop: 10 * tmpWidth,
        paddingLeft: 24 * tmpWidth,
    },
    musicArchiveContainer: {
        marginRight: 16 * tmpWidth, 
        alignItems: 'center',
    },
    songBox: {
        width: 124 * tmpWidth,
        height: 162 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 16 * tmpWidth,
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: 3 * tmpWidth,
            width: 0,
        },
        shadowRadius: 3 * tmpWidth,
        shadowOpacity: 0.05,
        alignItems: 'center',
    },
    songCover: {
        width: 92 * tmpWidth,
        height: 92 * tmpWidth, 
        borderRadius: 100 * tmpWidth,
        alignItems: 'center',
        marginTop: 12 * tmpWidth,
    },
    nameBox: {
        alignItems: 'center', 
        marginTop: 12 * tmpWidth, 
        width: 80 * tmpWidth,
    },
    titleText: {
        fontSize: 14 * tmpWidth
    },
    artistText: {
        fontSize: 14 * tmpWidth, 
        color:'rgb(124,124,124)', 
        marginTop: 6 * tmpWidth
    },
    timeText: {
        color: 'gray',
        marginTop: 12 * tmpWidth
    },
    chartText: {
        fontSize: 16 * tmpWidth, 
        marginTop: 19 * tmpWidth,  
        marginLeft: 21 * tmpWidth
    },
    chartNum: {
        fontSize: 16 * tmpWidth, 
        color:'rgb(169,193,255)'
    },
    popularSongBox:{
        width: '100%',
        height: 68 * tmpWidth, 
        marginBottom: 8 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 32 * tmpWidth,
        paddingRight: 24 * tmpWidth
    },
    eachSongBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1, 
        justifyContent: 'space-between'
    },
    popularSongCover:{
        width: 48 * tmpWidth,
        height: 48 * tmpWidth, 
        borderRadius: 100 * tmpWidth,
        marginLeft: 16 * tmpWidth
    },
    popularNameBox: {
        marginLeft: 20 * tmpWidth, 
        width: 110 * tmpWidth, 
    },
    popularArtistText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(133,133,133)',
        marginTop: 6 * tmpWidth
    },
    likeContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    likeText: {
        fontSize: 14 * tmpWidth,
        marginRight:4*tmpWidth
    },
    songscover : {
        width: 152 * tmpWidth,
        height: 152 * tmpWidth,
        borderRadius: 152 * tmpWidth,
        position: 'absolute',
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
    profile: {
        width: 32 * tmpWidth,
        height: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
    },
    modalContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 15 * tmpWidth,
    },
    nextContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingLeft: 17 * tmpWidth,
        paddingRight: 17 * tmpWidth,
        width: '100%',
        height: 152 * tmpWidth
    },
    playIcon: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        zIndex: 1,
    },
    nextIcon: {
        width: 36 * tmpWidth,
        height: 52 * tmpWidth
    },
    textContainer: {
        marginTop: 16 * tmpWidth,  
        alignItems: 'center', 
        width: 230 * tmpWidth,
    },
    modalArtistText: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(133,133,133)', 
        marginTop: 8 * tmpWidth,
        marginBottom: 10 * tmpWidth
    },
    modalTitleText: {
        fontSize: 16 * tmpWidth
    },
    likeIcon: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth
    }
});

export default MusicArchivePage;