import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,Keyboard ,TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as SearchContext } from '../../context/SearchContext'
import { Context as BoardContext } from '../../context/BoardContext'
import { tmpWidth } from '../../components/FontNormalize';
import HarmfulModal from '../../components/HarmfulModal';
import { SongImage } from '.././../components/SongImage'

import Header from '../../components/Header';
import { goBack } from '../../navigationRef';
import { useTrackPlayer } from '../../providers/trackPlayer';

const SearchMusicPage = ({ route }) => {
    const { state, searchsong, searchinit, songNext, searchHint, initHint } = useContext(SearchContext);
    const { state:boardState, addSong } = useContext(BoardContext);
    const { addtracksong, stoptracksong, isPlayingId } = useTrackPlayer()
    const [text, setText] = useState('');
    const [musicArchiveSong, setMusicArchiveSong] = useState({});
    const { setSong, isMusicArchive } = route.params
    const [loading, setLoading] = useState(false);
    const [tok, setTok]= useState(false);
    const [selectedId, setSelectedId] = useState('');
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

    const okPress = async () => {
        goBack();
        if(isMusicArchive)  await addSong({boardId: boardState.boards._id, song: musicArchiveSong});
    }

    const selectSong = ({item}) => {
        if(isMusicArchive){
            setMusicArchiveSong(item);
        }else{
            setSong(item)
        }
    };

    useEffect(() => {
        searchinit()
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
            <Header title="음악 아카이브" />
            <View style={styles.searchBox}>
                <View style ={styles.header}>
                    <View style={{flexDirection: 'row',  alignItems: 'center'}}>
                        <SvgUri width='40' height='40' source={require('../../assets/icons/boardSearch.svg')} style={styles.backIcon}/>    
                        <View style={styles.textInput}>
                            <TextInput
                                value = {text}
                                onChangeText={(text)=>{
                                    setText(text)
                                    if(text=='')    setTok(false)
                                }}
                                placeholder="공유하고 싶은 곡을 검색해주세요."
                                autoCapitalize='none'
                                autoCorrect={false}
                                autoFocus ={true}
                                onSubmitEditing= {()=> {
                                    searchsong({ songname: text})
                                    setTok(true)}}
                                placeholderTextColor= 'rgb(196,196,196)'
                                style={{fontSize: 16 * tmpWidth, width:tmpWidth*240}}
                            />
                        </View>                 
                    </View>

                    <TouchableOpacity style={styles.cancelIcon} onPress={() => {
                        if(tok) setTok(false)
                        Keyboard.dismiss();
                        setText('')
                        searchinit()
                        initHint()}}>
                        <SvgUri width='28' height='28' source={require('../../assets/icons/resultDelete.svg')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchContainer}>
                {tok ? 
                state.songData.length == 0 ? <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator /></View> :
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
                            <TouchableOpacity onPress={() => setSelectedId('')} style={styles.selectedSong}>
                                <TouchableOpacity onPress={() => {
                                    if(isPlayingId == item.id){
                                        stoptracksong()
                                    }else{
                                        addtracksong({ data: item })
                                    }
                                }}
                            >
                                    <SongImage url={item.attributes.artwork.url} size={56} border={56}/>
                                    { isPlayingId != item.id ? 
                                    <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                    <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                    <HarmfulModal />
                                </TouchableOpacity>
                                <View style={{flex: 1, flexDirection: 'row', marginRight: 26 * tmpWidth}}>
                                    <View style={styles.infoBox}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            {item.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                            : null }
                                            <Text style={styles.titleText} numberOfLines={1}>{item.attributes.name}</Text>
                                        </View>
                                        <Text style={styles.artistText} numberOfLines={1}>{item.attributes.artistName}</Text>
                                    </View>
                                    <View style={{justifyContent: 'center'}}>
                                        <TouchableOpacity style={styles.completeView} onPress={() => okPress()}>
                                            <Text style={styles.completeBox}>공유</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => {
                                setSelectedId(item.id)
                                selectSong({item})}}
                                style={styles.eachSong}>
                                <TouchableOpacity onPress={() => {
                                    if(isPlayingId == item.id){
                                        stoptracksong()
                                    }else{
                                        addtracksong({ data: item })
                                    }}}
                                >
                                    <SongImage url={item.attributes.artwork.url} size={56} border={56}/>
                                    { isPlayingId != item.id ? 
                                    <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                    <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                    <HarmfulModal />
                                </TouchableOpacity>
                                <View style={styles.infoBox}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        {item.attributes.contentRating == "explicit" ? 
                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                        : null }
                                        <Text style={styles.titleText} numberOfLines={1}>{item.attributes.name}</Text>
                                    </View>
                                    <Text style={styles.artistText} numberOfLines={1}>{item.attributes.artistName}</Text>
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
            </View>
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1,
        alignItems: 'center'
    },
    header: {
        flexDirection:'row', 
        justifyContent: 'space-between', 
        height: 60 * tmpWidth
    },
    backIcon: {
        marginLeft: 14 * tmpWidth, 
    },
    textInput: {
        marginLeft: 14 * tmpWidth, 
        width: 240 * tmpWidth,
    },
    cancelIcon: {
        marginRight: 16 * tmpWidth, 
        marginTop: 16 * tmpWidth, 
    },
    searchContainer: {
        width: '100%', 
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
    },
    completeView: {
        borderWidth: 1 * tmpWidth, 
        borderRadius: 100 * tmpWidth, 
        borderColor: 'rgb(169,193,255)',
    },
    completeBox: {
        marginLeft: 11 * tmpWidth,
        marginRight: 11 * tmpWidth,
        marginTop: 5 * tmpWidth,
        marginBottom: 5 * tmpWidth,
        fontSize: 14 * tmpWidth,
        color: 'rgb(169,193,255)'
    },
    searchBox: {
        width : '100%', 
        height: 60 * tmpWidth, 
        backgroundColor: 'rgb(255,255,255)', 
    },
    searchIcon: {
        height: 25 * tmpWidth, 
        width: 25 * tmpWidth, 
        marginTop: 14 * tmpWidth,
        backgroundColor:"rgb(0,0,0)", 
        marginLeft: 20 * tmpWidth
    },
    eachSong: {
        width: '100%',
        height: 76 * tmpWidth,
        flexDirection: 'row',
        paddingTop: 8 * tmpWidth,
        paddingLeft: 25 * tmpWidth
    },
    selectedSong: {
        width: '100%',
        height: 76 * tmpWidth,
        flexDirection: 'row',
        paddingTop: 8 * tmpWidth,
        backgroundColor: 'rgb(238,244,255)',
        paddingLeft: 25 * tmpWidth
    },
    songCover: {
        width: 56 * tmpWidth,
        height: 56 * tmpWidth,
    },
    infoBox: {
        marginTop: 10 * tmpWidth, 
        marginLeft: 24 * tmpWidth,  
        marginRight: 25 * tmpWidth, 
        width: 100 * tmpWidth,
        flex: 1
    },
    titleText: {
        fontSize: 16 * tmpWidth
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
    }
});

export default SearchMusicPage;
