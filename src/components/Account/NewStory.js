import React, { useContext, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Keyboard, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../FontNormalize';
import { Context as UserContext } from '../../context/UserContext';
import { Context as SearchContext } from '../../context/SearchContext';
import LoadingIndicator from '../LoadingIndicator';
import { SongImage } from '../SongImage';
import HarmfulModal from '../../components/HarmfulModal';
import { useTrackPlayer } from '../../providers/trackPlayer';

export default NewStory = ({ newStory, setNewStory }) => {
    const { postStory, getMyStory, getOtherStory } = useContext(UserContext);
    const { state: searchState, searchsong, searchinit, searchHint, initHint, songNext } = useContext(SearchContext);
    const { addtracksong, stoptracksong, isPlayingId } = useTrackPlayer()
    const [text, setText] = useState('');
    const [tok, setTok] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');

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
        setText('');
        setSelectedId('');
        setNewStory(false);
        setTok(false);
        initHint();
        searchinit();
        stoptracksong()
    }

    const onClickCancel = () => {
        Keyboard.dismiss()
        setText('')
        setTok(false)
    }

    const onChange = (text) => {
        setText(text)
        if(text=='')  setTok(false)
    }

    const onSubmit = () => {
        searchsong({ songname: text})
        setTok(true)
    }

    const onClickSong = (id) => {
        if(selectedId !== id ) {
            setSelectedId(id)
        } else {
            setSelectedId('')
        }
    }

    const onClickCover = (item) => {
        if(isPlayingId == item.id){
            stoptracksong()
        }else{
            addtracksong({ data: item })
        }
    }

    const onClickShare = async (song) => {
        await postStory({song})
        await getOtherStory()
        getMyStory()
        onClose()
    }

    const onClickHint = (item) => {
        searchsong({ songname: item })
        setTok(true)
    }

    useEffect(() => {
        if(text == ''){
            initHint();
        }else{
            searchHint({term: text});
        }
    }, [text]);

    return (
        <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={newStory}
            onBackdropPress={onClose}
            backdropOpacity={0.5}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>오늘의 곡</Text>
                    <TouchableOpacity style={styles.exit} onPress={() => onClose()}>
                        <SvgUri source={require('../../assets/icons/modalexit.svg')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchBox}>
                    <SvgUri source={require('../../assets/icons/storySearch.svg')} style={styles.searchIcon} />
                    <TextInput
                        value={text}
                        onChangeText={(text)=> onChange(text)}
                        placeholder="오늘의 곡을 검색해주세요."
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing= {onSubmit}
                        placeholderTextColor= 'rgb(211,211,211)'
                        style={styles.searchArea}
                    />
                        <TouchableOpacity 
                            style={styles.searchRemove}
                            onPress={onClickCancel}
                        >
                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/cancel.svg')} />
                        </TouchableOpacity>  
                </View>
                <View style={styles.result}>
                    { tok ?
                    searchState.songData.length == 0 ? <LoadingIndicator /> :
                    <FlatList
                        contentContainerStyle={{paddingTop: 14 * tmpWidth}}
                        data={searchState.songData}
                        keyExtractor={song=>song.id}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0}
                        ListFooterComponent={loading && <ActivityIndicator />}
                        renderItem={({item})=> {
                            const isExplicit = item.attributes.contentRating == "explicit"
                            return (
                                <View>
                                    <TouchableOpacity 
                                        style={selectedId !== item.id ? styles.notSelectedBox : styles.selectedBox}
                                        onPress={() => onClickSong(item.id)}
                                    >
                                        <TouchableOpacity onPress={() => onClickCover(item)}>
                                            <SongImage url={item.attributes.artwork.url} size={50} border={50}/>
                                            { isPlayingId != item.id ? 
                                            <SvgUri width='24' height='24' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 13 * tmpWidth, top: 13 * tmpWidth}}/> :
                                            <SvgUri width='24' height='24' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 13 * tmpWidth, top: 13 * tmpWidth}}/> }
                                        </TouchableOpacity>
                                        <HarmfulModal />
                                        <View style={styles.songBox}>
                                            <View>
                                                <View style={selectedId !== item.id ? styles.notSelectedName : styles.selectedName}>
                                                    { isExplicit && <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> }
                                                    <Text style={styles.songText} numberOfLines={1}>{item.attributes.name}</Text>
                                                </View>
                                                <View style={selectedId !== item.id ? styles.notSelectedArtist : styles.selectedArtist}>
                                                    <Text style={styles.artistText} numberOfLines={1}>{item.attributes.artistName}</Text>
                                                </View>
                                            </View>
                                            { selectedId === item.id &&
                                            <TouchableOpacity 
                                                style={styles.completeView} 
                                                onPress={() => onClickShare(item)}
                                            >
                                                <Text style={styles.completeBox}>공유</Text>
                                            </TouchableOpacity> }
                                        </View>  
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    /> :
                    <FlatList
                        style={styles.hintContainer}
                        data={searchState.hint}
                        keyExtractor={term=>term}
                        renderItem={({item})=> {
                            return (
                                <TouchableOpacity onPress={() => onClickHint(item)}>
                                    <Text style={styles.hintText}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    /> }
                </View>
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    container: {
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
    header:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 5  * tmpWidth,
        marginLeft: 5  * tmpWidth,
        height: 56 * tmpWidth,
    },
    title: {
        fontSize: 16 * tmpWidth, 
        color: 'rgb(80,80,80)', 
        marginTop: 24 * tmpWidth
    },
    exit: {
        width: 32 * tmpWidth,
        height: 32 * tmpWidth,
        position: 'absolute',
        top: 5 * tmpWidth,
        right: 0
    },
    searchBox: {
        height: 53  * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        width: 40  * tmpWidth, 
        height: 40 * tmpWidth,
        marginLeft: 14 * tmpWidth, 
        marginRight: 7 * tmpWidth
    },
    searchRemove: {
        width:40 * tmpWidth, 
        height:40 * tmpWidth,
        marginLeft:10 * tmpWidth, 
    },
    searchArea: {
        fontSize: 16 * tmpWidth, 
        width: 200 * tmpWidth,
    },
    result:{
        backgroundColor: 'rgb(250,250,250)',
        flex: 1,
        borderBottomLeftRadius:10 * tmpWidth,
        borderBottomRightRadius:10 * tmpWidth,
    },
    notSelectedBox:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2  * tmpWidth,
        paddingLeft: 20  * tmpWidth,
        height: 61 * tmpWidth
    },
    selectedBox:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2  * tmpWidth,
        backgroundColor:'rgb(238,244,255)',
        paddingLeft: 20  * tmpWidth,
        height: 61 * tmpWidth
    },
    notSelectedName: {
        width: 180 * tmpWidth, 
        flexDirection: 'row', 
        alignItems: 'center',
        borderColor: 'blue',
    },
    selectedName: {
        width: 150 * tmpWidth, 
        flexDirection: 'row', 
        alignItems: 'center',
    },
    notSelectedArtist: {
        width: 200 * tmpWidth,
    },
    selectedArtist: {
        width: 180 * tmpWidth
    },
    songText: {
        fontSize: 14 * tmpWidth
    },
    artistText: {
        fontSize:12 * tmpWidth, 
        color: 'rgb(148,153,163)', 
        marginTop: 4 * tmpWidth
    },
    songBox:{
        marginLeft: 19  * tmpWidth,
        flexDirection: 'row',
        marginRight: 20  * tmpWidth,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    hintContainer: {
        paddingLeft: 24 * tmpWidth, 
        paddingTop: 20 * tmpWidth,
    },
    hintText: {
        fontSize: 16 * tmpWidth, 
        marginBottom: 24 * tmpWidth
    }
})