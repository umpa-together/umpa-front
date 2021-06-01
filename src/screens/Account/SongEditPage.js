import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Context as SearchContext } from '../../context/SearchContext'
import { Context as UserContext } from '../../context/UserContext'
import { Context as DJContext } from '../../context/DJContext'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SvgUri from 'react-native-svg-uri';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';
import { tmpWidth } from '../../components/FontNormalize';
import HarmfulModal from '../../components/HarmfulModal';

const SongImage = ({url, opacity}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return <Image style ={{height:'100%', width:'100%', borderRadius: 100 * tmpWidth, opacity}} source ={{url:url}}/>
};

const SongEditPage = ({navigation}) => {
    const { state, searchsong, searchinit, songNext, searchHint, initHint } = useContext(SearchContext);
    const { state: userState, getMyInfo} = useContext(UserContext);
    const { editSongs } = useContext(DJContext);
    const [text, setText] = useState('');
    const [tok, setTok]= useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [songs, setSong] = useState([]);
    const [isEdit, setIsEdit] = useState(true);
    const [orderModal, setOrderModal] = useState(false);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [orderLists, setOrderLists] = useState([]);
    const [harmfulModal, setHarmfulModal] = useState(false);
    let uploadSongs = [];
    const currentplayList = navigation.getParam('data');
    const getData = async () => {
        if(state.songData.length >= 20){
            setLoading(true);
            await songNext({ next: state.songNext.substr(22) });
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
    const addItem = ({data}) => {
        let tok = false;
        for(let key in songs){
            if(data.id == songs[key].id){
                tok = true;
                break;
            }
        }
        if (songs.length < 7 && !tok) {
            setSong([...songs, data]);
        }
    };
    const deleteItem = ({data}) => {
        setSong(songs.filter(item=> item.id != data.id));
    };
    const renderLeftActions = () => {
        return (
            <View style={{width: '30%', height: '90%', backgroundColor:'#fff'}}/>
        )
    }
    const okPress = async () => {
        if(songs.length >= 5){
            setIsEdit(true);
            setOrderModal(true);
        }else{
            setIsEdit(false);
            return;
        }
    }

    const upload = async () => {
        for(let key in orderLists){
            uploadSongs.push(songs[orderLists[key]]);
        }
        setOrderModal(false)
        await editSongs({ songs: uploadSongs });
        getMyInfo();
        navigation.goBack();
    }
    
    const onClose = () => {
        setOrderModal(false)
        setOrderLists([])
    }

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

    useEffect(()=>{
        searchinit();
        if(currentplayList != undefined) {
           setSong(currentplayList);
        }
        const listener =navigation.addListener('didFocus', ()=>{
            searchinit();
        });
        return () => {
            listener.remove();
        };
    }, []);
    useEffect(() => {
        if(text == ''){
            initHint();
        }else{
            searchHint({term: text});
        }
    }, [text]);
    
    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <View style ={{flexDirection:'row'}}>
                    <View style={styles.searchIcon}>
                        <SvgUri width={18 * tmpWidth} height={19 * tmpWidth} source={require('../../assets/icons/songeditsearch.svg')}/>
                    </View>
                    <View style={{marginLeft: 14 * tmpWidth  , marginTop: 20 * tmpWidth  }}>
                        <TextInput style={{backgroundColor: "rgb(255,255,255)", width:272 * tmpWidth, height:60 * tmpWidth}}
                            value = {text}
                            onChangeText={(text)=>{
                                setText(text)
                                if(text=='')    setTok(false)
                            }}
                            placeholder="곡, 아티스트를 검색해주세요."
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoFocus ={true}
                            onSubmitEditing= {()=> {
                                searchsong({songname: text})
                                setTok(true)}}
                            placeholderTextColor= 'rgb(196,196,196)'
                            style={{fontSize: 16 * tmpWidth, width:tmpWidth*270, }}
                        />
                    </View>
                    <TouchableOpacity 
                    style={{width:28*tmpWidth, height:tmpWidth*28, marginTop:tmpWidth*15}}
                    onPress={()=>{Keyboard.dismiss(); setText(''); setTok(false)}}
                    >
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/resultDelete.svg')}/>
                    </TouchableOpacity>                    
                </View>
            </View>
            {!tok && state.hint.length == 0 ?
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={{flex: 1, width: '100%', backgroundColor: 'rgb(250,250,250)'}}>
                <View style={{marginTop: 114 * tmpWidth  , alignItems: 'center'}}>
                    <View style={styles.musicIcon}>
                        <SvgUri width={24 * tmpWidth} height={24 * tmpWidth} source={require('../../assets/icons/musicnote.svg')}/>

                    </View>
                    <View style={{flexDirection: 'row', marginTop: 24  * tmpWidth , marginBottom: 18 * tmpWidth  }}>
                        <Text style={{fontSize:14 * tmpWidth, fontWeight: 'bold', color: 'rgb(80,80,80)'}}>{userState.myInfo.name}</Text>
                        <Text style={{fontSize: 14 * tmpWidth, color: 'rgb(118,118,118)'}}> 님의 취향의 곡을 등록해주세요</Text>
                    </View>
                    {isEdit ? 
                    <Text style={{fontSize:12 * tmpWidth, color: 'rgb(153,153,153)'}}>(최소 5곡, 최대 7곡)</Text> :
                    <Text style={{fontSize: 12* tmpWidth, color: 'rgb(238,98,92)'}}>(최소 5곡, 최대 7곡)</Text> }
                </View>
            </View>
            </TouchableWithoutFeedback>
             : !tok && state.hint.length != 0 ?
            <View style={{flex: 1, width: '100%',backgroundColor:'rgb(250,250,250)'}}>
                <FlatList 
                    style={{marginLeft: 24 * tmpWidth  , marginTop: 20  * tmpWidth , flex: 1}}
                    data={state.hint}
                    keyExtractor={term=>term}
                    renderItem={({item})=> {
                        return (
                            <TouchableOpacity onPress={() => {
                                searchsong({ songname: item})
                                setTok(true)}}>
                                <Text style={{fontSize: 16 * tmpWidth, marginBottom: 24 * tmpWidth  }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View> : tok && state.songData.length == 0 ? <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator /></View> :
            <View style={{flex:1, backgroundColor:'rgb(250,250,250)'}}>
            <FlatList
                data={state.songData}
                keyExtractor={song => song.id}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                ListFooterComponent={loading && <ActivityIndicator />}
                renderItem={({item}) =>{
                    return (
                        <View>
                            {selectedId == item.id ? 
                                <TouchableOpacity onPress={() => {
                                    setSelectedId('')
                                    deleteItem({data: item})}}
                                    style={styles.selectedSong}>
                                    <TouchableOpacity onPress={() => {
                                        if(isPlayingid == item.id){
                                            stoptracksong()
                                        }else{
                                            addtracksong({data: item})
                                        }}}
                                        style={styles.songCover}>
                                        <SongImage url={item.attributes.artwork.url} opacity={1}/>
                                        { isPlayingid != item.id ? 
                                        <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                        <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                        {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                    </TouchableOpacity>
                                    <View style={{marginTop: 10  * tmpWidth , marginLeft: 24  * tmpWidth}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center',  width: 200 * tmpWidth}}>
                                            {item.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                            : null }
                                            <Text style={{fontSize: 16 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                        </View>
                                        <Text style={{fontSize: 14 * tmpWidth, color:'rgb(148,153,163)', marginTop: 8 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                    </View>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => {
                                    setSelectedId(item.id)
                                    addItem({ data: item })}}
                                    style={styles.eachSong}>
                                    <TouchableOpacity onPress={() => {
                                        if(isPlayingid == item.id){
                                            stoptracksong()
                                        }else{
                                            addtracksong({data: item})
                                        }}}
                                        style={styles.songCover}>
                                        <SongImage url={item.attributes.artwork.url} opacity={1}/>
                                        { isPlayingid != item.id ? 
                                        <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                        <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                        {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                    </TouchableOpacity>
                                    <View style={{marginTop: 10 * tmpWidth, marginLeft: 24 * tmpWidth}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center',  width: 200 * tmpWidth}}>
                                            {item.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                            : null }
                                            <Text style={{fontSize: 16 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                        </View>
                                        <Text style={{fontSize: 14 * tmpWidth, color:'rgb(148,153,163)', marginTop: 8 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                    </View>
                                </TouchableOpacity> }
                        </View>
                    )
                }}
            />
            </View>}
            <View style={styles.selectedBox}>
                <View style={styles.mysong}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 14 * tmpWidth, marginRight: 5 * tmpWidth}}>내 대표곡</Text>
                        { !isEdit && state.songData.length != 0 ? 
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(238,98,92)'}}>
                            (최소 5곡, 최대 7곡)
                        </Text> : null }
                    </View>
                    <TouchableOpacity onPress={() => okPress()}>
                        <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(169,193,255)'}}>순서</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{marginTop: 20 * tmpWidth, marginLeft: 33 * tmpWidth, }}
                    data={songs}
                    keyExtractor={posts => posts.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>{
                        return (
                            <Swipeable
                                friction={2}
                                renderLeftActions={renderLeftActions}
                                onSwipeableLeftOpen={() => {
                                    if(selectedId == item.id)   setSelectedId('')
                                    deleteItem({data: item})}}
                            >
                                <View style={styles.selecetedSongBox}>
                                    <View style={styles.selectedSongCover}>
                                        <SongImage url={item.attributes.artwork.url} opacity={1} />
                                    </View>
                                    <View style={{marginLeft: 22.4 * tmpWidth, width: 180 * tmpWidth}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            {item.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                            : null }
                                            <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                        </View>
                                        <Text style={{fontSize: 12 * tmpWidth, color:'rgb(148,153,163)', marginTop: 6 * tmpWidth  }} numberOfLines={1}>{item.attributes.artistName}</Text>
                                    </View>
                                    <TouchableOpacity 
                                    style={{marginLeft: 8*tmpWidth, width:tmpWidth*20, height:tmpWidth*20, justifyContent:'center', alignItems:'center'}}
                                    onPress={()=>{deleteItem({data: item})}}
                                    >
                                    <SvgUri width={11*tmpWidth} height={11*tmpWidth} source={require('../../assets/icons/songdelete.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                    </TouchableOpacity>
                                </View>
                            </Swipeable>
                        )
                    }}
                />
            </View>
            <Modal
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={orderModal}
                onBackdropPress={onClose}
                backdropOpacity={0.5}
            >
                <View style={{width: '100%', height: '50%', backgroundColor: 'rgb(255,255,255)', borderRadius: 8 * tmpWidth}}>
                    <View>
                        <Text style={{textAlign: 'center', marginTop: 15 * tmpWidth}}>대표곡을 첫번째로 선택하시고</Text>
                        <Text style={{textAlign: 'center', marginTop: 2 * tmpWidth}}>노출 순서를 정해주세요</Text>
                    </View>
                    {orderLists.length == songs.length ? 
                    <TouchableOpacity style={{position: 'absolute', top: 18 * tmpWidth, right: 24 * tmpWidth}} onPress={() => upload()}> 
                        <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(169,193,255)'}}>확인</Text>
                    </TouchableOpacity> : null }
                    <FlatList 
                        style={{paddingLeft: 36 * tmpWidth, marginTop: 8 * tmpWidth}}
                        data={songs}
                        keyExtractor={posts => posts.id}
                        renderItem={({item, index}) => {
                            return (
                                <View style={{flexDirection: 'row', marginTop: 12 * tmpWidth}}>
                                    <TouchableOpacity style={styles.selectedSongCover} onPress={() => {
                                        if(orderLists.includes(index)){
                                            setOrderLists(orderLists.filter(order => order != index))
                                        }else{
                                            setOrderLists([...orderLists, index])
                                        }
                                    }}>
                                        {orderLists.includes(index) ? 
                                        <SongImage url={item.attributes.artwork.url} opacity={1.0}/> : 
                                        <SongImage url={item.attributes.artwork.url} opacity={0.5}/> }
                                    </TouchableOpacity>
                                    <View style={{marginLeft: 22.4 * tmpWidth, width: 180 * tmpWidth}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            {item.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                            : null }
                                            <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                        </View>
                                        <Text style={{fontSize: 12 * tmpWidth, color:'rgb(148,153,163)', marginTop: 6 * tmpWidth  }} numberOfLines={1}>{item.attributes.artistName}</Text>
                                    </View>
                                    {orderLists.includes(index) ? 
                                    <Text style={{fontSize: 16 * tmpWidth, color:'rgb(169,193,255)', position: 'absolute', right: 36 * tmpWidth}}>{orderLists.indexOf(index)+1}</Text> : null }
                                </View>
                            )
                        }}
                    />
                    <Text style={{color: 'rgb(153,153,153)', textAlign: 'center', paddingTop: 5 * tmpWidth, paddingBottom: 5 * tmpWidth}}>(커버를 선택하시면 순서를 정할 수 있어요)</Text>
                </View>
            </Modal>
        </View>
    )
};

SongEditPage.navigationOptions = ({navigation})=>{
    return {
        title: '대표곡',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth
        }, 
        headerStyle: {
            backgroundColor: 'rgb(254,254,254)',
            height: 92 * tmpWidth  ,
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
                <TouchableOpacity style={{width:40 * tmpWidth, height:40 * tmpWidth, marginLeft: 20 * tmpWidth  }} onPress={() => navigation.goBack()}>
                    <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        }
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1,
        alignItems: 'center'
    },
    backIcon: {
        width: 7 * tmpWidth  ,
        height: 15  * tmpWidth ,
        backgroundColor: '#000',
    },
    searchBox: {
        width : 375  * tmpWidth ,
        height: 60  * tmpWidth ,
        backgroundColor: 'rgb(255,255,255)', 
    },
    searchIcon: {
        height:19  * tmpWidth ,
        width:18   * tmpWidth,
        marginTop:19 * tmpWidth  ,
        marginLeft:25  * tmpWidth
    },
    musicIcon: {
        width: 24   * tmpWidth,
        height: 24  * tmpWidth ,
    },
    selectedSong: {
        width: 375  * tmpWidth ,
        height: 76  * tmpWidth ,
        flexDirection: 'row',
        paddingTop: 8 * tmpWidth  ,
        backgroundColor: 'rgb(238,244,255)',
        paddingLeft: 25 * tmpWidth,
    },
    songCover: {
        width: 56  * tmpWidth ,
        height: 56 * tmpWidth  ,
    },
    eachSong: {
        width: 375  * tmpWidth ,
        height: 76  * tmpWidth ,
        flexDirection: 'row',
        paddingTop: 8  * tmpWidth ,
        paddingLeft: 25  * tmpWidth
    },
    selectedBox:{
        width: 375  * tmpWidth ,
        height: 250  * tmpWidth ,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: "rgb(154, 163, 201)",
        shadowOffset: {
            height: -1 * tmpWidth,
            width: 0,
        },
        shadowRadius: 8 * tmpWidth,
        shadowOpacity: 0.1,
    },
    selecetedSongBox: {
        width: 308  * tmpWidth ,
        height: 60  * tmpWidth ,
        borderWidth: 1 * tmpWidth,
        borderRadius:8 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20.7   * tmpWidth,
        marginBottom: 8  * tmpWidth
    },
    selectedSongCover: {
        width: 44   * tmpWidth,
        height: 44   * tmpWidth,
    },
    mysong:{
        flexDirection: 'row',
        marginTop: 19   * tmpWidth,
        justifyContent: 'space-between',
        marginLeft: 37   * tmpWidth,
        marginRight: 24 * tmpWidth
    },
});

export default SongEditPage;