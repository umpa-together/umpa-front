import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Context as SearchContext } from '../../context/SearchContext'
import { Context as UserContext } from '../../context/UserContext'
import { Context as DJContext } from '../../context/DJContext'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';

const SongImage = ({url}) => {
    url =url.replace('{w}', '1000');
    url = url.replace('{h}', '1000');
    return <Image style ={{height:'100%', width:'100%', borderRadius: 100 * tmpWidth}} source ={{url:url}}/>
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
    const currentplayList = navigation.getParam('data');
    const getData = async () => {
        setLoading(true);
        await songNext({ next: state.songNext.substr(22) });
        setLoading(false);
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
            <View style={{width: '100%', height: '90%', backgroundColor:'#fff'}}/>
        )
    }
    const okPress = async () => {
        if(songs.length >= 5){
            setIsEdit(true);
            await editSongs({ songs: songs });
            getMyInfo();
            navigation.goBack();
        }else{
            setIsEdit(false);
            return;
        }
    }

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
                            keyboardType = "email-address"
                            placeholderTextColor= 'rgb(196,196,196)'
                            style={{fontSize: 16 * tmpWidth}}
                        />
                    </View>
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
                            >
                                <View style={styles.selectedSong}>
                                    <View style={styles.songCover}>
                                        <SongImage url={item.attributes.artwork.url}/>
                                    </View>
                                    <View style={{marginTop: 10  * tmpWidth , marginLeft: 24  * tmpWidth }}>
                                        <Text style={{fontSize: 16 * tmpWidth}}>{item.attributes.name}</Text>
                                        <Text style={{fontSize: 14 * tmpWidth, color:'rgb(148,153,163)', marginTop: 8 * tmpWidth  }}>{item.attributes.artistName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => {
                                setSelectedId(item.id)
                                addItem({ data: item })}}
                            >
                                <View style={styles.eachSong}>
                                    <View style={styles.songCover}>
                                        <SongImage url={item.attributes.artwork.url}/>
                                    </View>
                                    <View style={{marginTop: 10 * tmpWidth, marginLeft: 24 * tmpWidth  }}>
                                        <Text style={{fontSize: 16 * tmpWidth}}>{item.attributes.name}</Text>
                                        <Text style={{fontSize: 14 * tmpWidth, color:'rgb(148,153,163)', marginTop: 8 * tmpWidth  }}>{item.attributes.artistName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity> }
                        </View>
                    )
                }}
            />
            </View>}
            <View style={styles.selectedBox}>
                <View style={styles.mysong}>
                    <Text style={{fontSize: 14 * tmpWidth}}>내 대표곡</Text>
                    <TouchableOpacity onPress={() => okPress()}>
                        <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(169,193,255)'}}>완료</Text>
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
                                        <SongImage url={item.attributes.artwork.url} />
                                    </View>
                                    <View style={{marginLeft: 22.4 * tmpWidth  , flex: 1}}>
                                        <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                        <Text style={{fontSize: 12 * tmpWidth, color:'rgb(148,153,163)', marginTop: 6 * tmpWidth  }} numberOfLines={1}>{item.attributes.artistName}</Text>
                                    </View>
                                </View>
                            </Swipeable>
                        )
                    }}
                />
            </View>
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