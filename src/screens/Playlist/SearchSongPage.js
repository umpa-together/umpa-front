import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import TrackPlayer from 'react-native-track-player';
import { Context as SearchContext } from '../../context/SearchContext'
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';
import HarmfulModal from '../../components/HarmfulModal';
import Guide from '../../components/Guide';

const SongImage = ({url}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return <Image style ={{height:'100%', width:'100%', borderRadius: 100 * tmpWidth}} source ={{url:url}}/>
};

const SearchPage = ({ navigation }) => {
    const { state, searchsong, searchinit, songNext, searchHint, initHint } = useContext(SearchContext);
    const [text, setState] = useState('');
    const [songs, setSong] = useState([]);
    const [loading, setLoading] = useState(false);
    const addedplayList = navigation.getParam('data');
    const [tok, setTok]= useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [harmfulModal, setHarmfulModal] = useState(false);
    const isEdit = navigation.getParam('isEdit');

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
        if (songs.length < 5 && !tok) {
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

    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])

    const stoptracksong= async () => {    
        setIsPlayingid('0');
        await TrackPlayer.reset()
    };

    useEffect(()=>{
        searchinit();
        if(addedplayList != undefined) {
           setSong(addedplayList);
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
            <Guide type={'create'}/>
             <View style={{width: '100%'}}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/back.svg')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>플레이리스트 만들기</Text>
                </View>
            </View>
            <View style={styles.searchBox}>
                <View style ={{ flexDirection:'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 14     * tmpWidth}}>
                        <SvgUri width='40' height='40' source={require('../../assets/icons/playlistSearch.svg')}/>
                        <View style={styles.inputBox}>
                            <TextInput 
                                value = {text}
                                onChangeText={(text)=>{
                                    setState(text)
                                    if(text=='')    setTok(false)
                                }}
                                placeholder="노래, 아티스트 검색"
                                autoCapitalize='none'
                                autoCorrect={false}
                                onSubmitEditing= {()=> {
                                    searchsong({ songname: text})
                                    setTok(true)}}
                                placeholderTextColor= 'rgb(196,196,196)'
                                style={{fontSize: 16     * tmpWidth}}
                            />
                        </View>
                    </View>
                    
                    <TouchableOpacity style={{marginRight: 16     * tmpWidth, marginTop:3*tmpWidth}}onPress={() => {
                        if (tok) {
                        setTok(false);
                        }
                        Keyboard.dismiss();
                        setState('')
                        searchinit()
                        initHint()}}>
                        <SvgUri width='28' height='28' source={require('../../assets/icons/resultDelete.svg')}/>
                    </TouchableOpacity> 
                </View>
            </View>
            <View style={styles.resultBox}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{height: '100%'}}>
                    {tok ? state.songData.length == 0 ? <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator /></View> :
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
                                            } else {
                                                addtracksong({data: item})
                                            }}}
                                            style={styles.songCover}>
                                            <SongImage url={item.attributes.artwork.url}/>
                                            { isPlayingid != item.id ? 
                                            <SvgUri width='26' height='26' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                            <SvgUri width='26' height='26' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                            {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                        </TouchableOpacity>
                                        <View style={styles.songContainer}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                {item.attributes.contentRating == "explicit" ? 
                                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                : null }
                                                <Text style={{fontSize: 16 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                            </View>
                                            <Text style={styles.artistText} numberOfLines={1}>{item.attributes.artistName}</Text>
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
                                            }}}style={styles.songCover}>
                                            <SongImage url={item.attributes.artwork.url}/>
                                            { isPlayingid != item.id ? 
                                            <SvgUri width='26' height='26' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                            <SvgUri width='26' height='26' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                            {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                        </TouchableOpacity>
                                        <View style={styles.songContainer}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                {item.attributes.contentRating == "explicit" ? 
                                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                : null }
                                                <Text style={{fontSize: 16 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                            </View>
                                            <Text style={styles.artistText}  numberOfLines={1}>{item.attributes.artistName}</Text>
                                        </View>
                                    </TouchableOpacity> }
                                </View>
                            )
                        }}
                    /> : 
                    <FlatList 
                        style={styles.hintContainer}
                        data={state.hint}
                        keyExtractor={term=>term}
                        renderItem={({item})=> {
                            return (
                                <TouchableOpacity onPress={() => {
                                    searchsong({ songname: item})
                                    setTok(true)}}>
                                    <Text style={styles.hintText}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />} 
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.selectedBox}>
                <View style={styles.selectedBoxHeader}>
                    <Text style={{fontSize: 14 * tmpWidth}}>담은 곡들</Text>
                    <TouchableOpacity onPress={async () => {
                        await TrackPlayer.reset()
                        navigate('Create', { data:songs, isEdit })}}>
                        <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(169,193,255)'}}>완료</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{marginTop: 20 * tmpWidth, paddingLeft: 33 * tmpWidth}}
                    data={songs}
                    keyExtractor={posts => posts.id}
                    renderItem={({item}) =>{
                        return (
                            <Swipeable
                                friction={2}
                                renderLeftActions={renderLeftActions}
                                onSwipeableLeftOpen={() => {
                                    if(selectedId == item.id)   setSelectedId('')
                                    deleteItem({data: item})
                                }}   
                            >
                                <View style={styles.selecetedSongBox}>
                                    <View style={styles.selectedSongCover}>
                                        <SongImage url={item.attributes.artwork.url} />
                                    </View>
                                    <View style={{marginLeft: 22.4 * tmpWidth, width: 180 * tmpWidth}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            {item.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                            : null }
                                            <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                        </View>
                                        <Text style={{fontSize: 12 * tmpWidth, color:'rgb(148,153,163)', marginTop: 6 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={{marginLeft:8*tmpWidth, width:tmpWidth*20, height:tmpWidth*20, justifyContent:'center', alignItems:'center'}}
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
        </View>
    );
};

SearchPage.navigationOptions = ()=>{
    return {
        headerShown: false    
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        alignItems: 'center',
        flex: 1,
    },
    header:{
        width: '100%',
        height: 48 * tmpWidth,
        marginTop: 44 * tmpWidth,
        flexDirection: 'row',
    },
    headerIcon:{
        marginLeft: 5 * tmpWidth,
        marginTop: 5 * tmpWidth,
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
    },
    headerTitle: {
        fontSize: 18 * tmpWidth, 
        marginTop: 18 * tmpWidth,
        width: '100%', 
        textAlign: 'center', 
        position: 'absolute',
        zIndex: -1
    },
    searchBox: {
        width : '100%', 
        height: 60 * tmpWidth, 
        backgroundColor: 'rgb(255,255,255)', 
        justifyContent: 'center'
    },
    searchIcon: {
        marginTop: 11 * tmpWidth, 
        marginLeft: 14 * tmpWidth
    },
    inputBox: {
        marginLeft: 7 * tmpWidth, 
        width: 250 * tmpWidth,
    },
    resultBox: {
        flex:1.64,
        backgroundColor: 'rgb(250,250,250)', 
        width: '100%',
    },
    eachSong: {
        width: '100%',
        height: 76 * tmpWidth,
        flexDirection: 'row',
        paddingTop: 8 * tmpWidth,
        paddingLeft: 24 * tmpWidth
    },
    selectedSong: {
        width: '100%',
        height: 76 * tmpWidth,
        flexDirection: 'row',
        paddingTop: 8 * tmpWidth,
        paddingLeft: 24 * tmpWidth,
        backgroundColor: 'rgb(238,244,255)',
    },
    songCover: {
        width: 56 * tmpWidth,
        height: 56 * tmpWidth,
    },
    songContainer: {
        marginTop: 10 * tmpWidth, 
        marginLeft: 24 * tmpWidth, 
        width: 230 * tmpWidth
    },
    artistText: {
        fontSize: 14 * tmpWidth, 
        color:'rgb(148,153,163)',
        marginTop: 8 * tmpWidth
    },
    hintContainer: {
        marginLeft: 24 * tmpWidth, 
        marginTop: 20 * tmpWidth, 
        flex: 1
    },
    hintText: {
        fontSize: 16 * tmpWidth, 
        marginBottom: 24 * tmpWidth
    },
    selectedBox:{
        width: '100%',
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: "rgb(154, 163, 201)",
        shadowOffset: {
            height: -1 * tmpWidth,
            width: 0,
        },
        shadowRadius: 8 * tmpWidth,
        shadowOpacity: 0.1,
    },
    selectedBoxHeader: {
        flexDirection: 'row', 
        marginTop: 19 * tmpWidth,
        justifyContent: 'space-between', 
        marginLeft: 37 * tmpWidth, 
        marginRight: 24 * tmpWidth
    },
    selecetedSongBox: {
        width: 308 * tmpWidth,
        height: 60 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20.7 * tmpWidth,
        marginBottom: 8 * tmpWidth,
    },
    selectedSongCover: {
        width: 44 * tmpWidth,
        height: 44 * tmpWidth,
    }
});

export default SearchPage;