import React, { useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image, Button } from 'react-native'
import { Context as UserContext } from '../../context/UserContext';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { tmpWidth } from '../../components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { SongImage } from '../../components/SongImage'
import { DeletePlaylistModal } from '../../components/PlaylistModal';
import { addtracksong, stoptracksong } from '../../components/TrackPlayer'
import HarmfulModal from '../../components/HarmfulModal';

const MusicBoxScreen = ({ navigation }) => {
    const { state, getLikePlaylists, getMyInfo } = useContext(UserContext);
    const { getPlaylist } = useContext(PlaylistContext)
    const title = navigation.getParam('title')
    const [refreshing, setRefreshing] = useState(false);
    const [deletePlaylistModal, setDeletePlaylistModal] = useState(false)
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [harmfulModal, setHarmfulModal] = useState(false);
    const [time, setTime] = useState('')
    const [idx, setIdx] = useState('-1')
    const fetchData = async () => {
        setRefreshing(true);
        if(title == '좋아요한 플레이리스트'){
            await getLikePlaylists()
        }else{
            await getMyInfo()
        }
        setRefreshing(false);
    };

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }
    useEffect(() => {
        if(!deletePlaylistModal)    setIdx('-1')
    },[deletePlaylistModal])
    return (
        <View style={{flex: 1, backgroundColor: 'rgb(255,255,255)'}}>
            <View style={styles.header}>
                <TouchableOpacity  style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
                <Text style={{fontSize: 18 * tmpWidth}}>{title}</Text>
            </View>
            {title == '좋아요한 플레이리스트' ? 
            <View style={styles.playlistContainer}>
                {state.likePlaylists == null ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator /></View> : 
                <FlatList 
                    numColumns={2}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    data={state.likePlaylists}
                    keyExtractor={playlist=>playlist._id}
                    renderItem={({item}) => {
                        return (
                            <View style={{width: 161 * tmpWidth, marginRight: 14 * tmpWidth, marginBottom: 10 * tmpWidth}}>
                                <TouchableOpacity onPress={async () => {
                                    await getPlaylist({id:item._id, postUserId:item.postUserId})
                                    navigation.push('SelectedPlaylist', {id: item._id, navigation: navigation, postUser: item.postUserId})
                                }}>
                                    <View style={{width: 161 * tmpWidth, height: 157 * tmpWidth, borderRadius: 8 * tmpWidth, marginBottom: 10 * tmpWidth}}>
                                        <Image style={ {width:'100%', height:'100%', borderRadius:8 * tmpWidth}} source={{url :item.image}}/>
                                    </View>
                                    <View style={{width:161 * tmpWidth}}>
                                        <Text numberOfLines ={2} style={{fontSize: 14 * tmpWidth, color:"rgba(79,79,79,1)"}}>{item.title}</Text>
                                    </View>
                                    <View style={{width:161 * tmpWidth, flexDirection:'row', marginTop: 8 * tmpWidth}}>
                                    <Text numberOfLines ={1} style={{fontSize:12 * tmpWidth, color:'rgba(153,153,153,1)',}}>
                                    {item.hashtag.map((hashtag,index) => {
                                         return (
                                             <Text style={{fontSize:12 * tmpWidth, color:'rgba(153,153,153,1)', marginRight:6 * tmpWidth}}>{'#'+hashtag}  </Text>
                                         )})}
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                /> }
            </View> : 
            <View style={styles.songContainer}>
                {state.myPlayList == null ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator /></View> : 
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    data={state.myPlayList}
                    keyExtractor={song=>song.time}
                    contentContainerStyle={{marginTop: 8 * tmpWidth, paddingBottom: 18 * tmpWidth}}
                    renderItem={({item, index}) => {
                        console.log(idx, index)
                        return (
                            <TouchableOpacity style={idx == index ? styles.selectedSongBox: styles.eachSongBox}
                                onPress={() => {
                                    if(idx == '-1' || idx != index){
                                        setIdx(index)
                                    }else{
                                        setIdx('-1')
                                    }
                                }}
                            >
                                <TouchableOpacity onPress={() => {
                                    if(isPlayingid == item.id){
                                        stoptracksong({ setIsPlayingid })
                                    }else{
                                        addtracksong({ data: item, setIsPlayingid, setHarmfulModal })
                                    }}}
                                >
                                    <SongImage url={item.attributes.artwork.url} size={56} border={56} />
                                    { isPlayingid != item.id ? 
                                    <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                    <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                    {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                </TouchableOpacity>
                                <View style={styles.textBox}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <View style={{width: 180 * tmpWidth, flexDirection: 'row', alignItems: 'center'}}>
                                            {item.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                            : null }
                                            <Text style={styles.titleText} numberOfLines={1}>{item.attributes.name}</Text>
                                        </View>
                                    </View>
                                    <View style={{width: 180 * tmpWidth}}>
                                        <Text style={styles.artistText} numberOfLines={1}>{item.attributes.artistName}</Text>
                                    </View>
                                </View>
                                {idx == index &&
                                <TouchableOpacity style={styles.completeView} onPress={() => {
                                    setDeletePlaylistModal(true)
                                    setTime(item.time)}}>
                                    <Text style={styles.completeBox}>삭제</Text>
                                </TouchableOpacity> }
                                { deletePlaylistModal && <DeletePlaylistModal deletePlaylistModal={deletePlaylistModal} setDeletePlaylistModal={setDeletePlaylistModal} time={time}/> }
                            </TouchableOpacity>
                        )
                    }}
                /> }
            </View> }
        </View>
    )
}


MusicBoxScreen.navigationOptions = ({navigation})=>{
    return {
        headerShown: false
    };
};

const styles=StyleSheet.create({
    header:{
        height: 48  * tmpWidth,
        marginTop:44 * tmpWidth,
        width:375 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    backIcon: {
        position :"absolute", 
        left:12 * tmpWidth,
        width:40 * tmpWidth,
        height:40 * tmpWidth
    },
    playlistContainer: {
        marginTop:20 * tmpWidth,
        paddingLeft:20 * tmpWidth,
        height: '100%',
        paddingBottom: 18 * tmpWidth,
    },
    songContainer: {
        backgroundColor: 'rgb(250,250,250)',
        flex: 1,
    },
    eachSongBox: {
        height: 70 * tmpWidth,
        flexDirection: 'row',
        paddingLeft: 24 * tmpWidth,
        alignItems: 'center',
    },
    selectedSongBox: {
        height: 70 * tmpWidth,
        flexDirection: 'row',
        paddingLeft: 24 * tmpWidth,
        alignItems: 'center',
        backgroundColor: 'rgb(238,244,255)'
    },
    textBox: {
        flex: 1, 
        marginLeft: 24 * tmpWidth, 
        marginRight: 18 * tmpWidth
    },
    titleText: {
        fontSize: 16 * tmpWidth
    },
    artistText: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginTop: 8 * tmpWidth
    }, 
    completeView: {
        borderWidth: 1 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        marginRight: 24 * tmpWidth,
    },
    completeBox: {
        marginLeft: 12  * tmpWidth,
        marginRight: 12  * tmpWidth,
        marginTop: 5  * tmpWidth,
        marginBottom: 5  * tmpWidth,
        fontSize: 12 * tmpWidth,
        color: 'rgb(169,193,255)',
    },
})

export default MusicBoxScreen