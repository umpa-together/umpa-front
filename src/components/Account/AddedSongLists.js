import React, { useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Context as UserContext } from '../../context/UserContext';
import { tmpWidth } from '../FontNormalize';
import { SongImage } from '../SongImage';
import SvgUri from 'react-native-svg-uri';
import LoadingIndicator from '../LoadingIndicator';
import { useTrackPlayer } from '../../providers/trackPlayer';
import { DeletePlaylistModal } from '../PlaylistModal';
import HarmfulModal from '../HarmfulModal';

export default AddedSongLists = () => {
    const { state, getMyInfo } = useContext(UserContext);
    const { addtracksong, stoptracksong, isPlayingId } = useTrackPlayer()

    const [refreshing, setRefreshing] = useState(false);
    const [deletePlaylistModal, setDeletePlaylistModal] = useState(false)
    const [time, setTime] = useState('')
    const [idx, setIdx] = useState('-1')

    const fetchData = async () => {
        setRefreshing(true);
        await getMyInfo()
        setRefreshing(false);
    }

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }

    const onClickSong = (index) => {
        if(idx == '-1' || idx != index){
            setIdx(index)
        }else{
            setIdx('-1')
        }
    }

    const onClickSongCover = (item) => {
        if(isPlayingId == item.id){
            stoptracksong()
        }else{
            addtracksong({ data: item })
        }
    }

    const onClickDelete = (time) => {
        setDeletePlaylistModal(true)
        setTime(time)
    }
    
    useEffect(() => {
        if(!deletePlaylistModal)    setIdx('-1')
    },[deletePlaylistModal])
    
    return (
        <View style={styles.container}>
            {state.myPlayList === null ? <LoadingIndicator /> : 
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={state.myPlayList}
                keyExtractor={song=>song.time}
                contentContainerStyle={styles.contentStyle}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity 
                            style={idx == index ? styles.selectedSongBox: styles.eachSongBox}
                            onPress={() => onClickSong(index)}
                        >
                            <TouchableOpacity onPress={() => onClickSongCover(item)}>
                                <SongImage url={item.attributes.artwork.url} size={56} border={56} />
                                { isPlayingId != item.id ? 
                                <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalPlay.svg')} style={styles.stopAndPlay}/> :
                                <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalStop.svg')} style={styles.stopAndPlay}/> }
                                <HarmfulModal />
                            </TouchableOpacity>
                            <View style={styles.textBox}>
                                <View style={styles.flexRowContainer}>
                                    <View style={styles.song}>
                                        {item.attributes.contentRating == "explicit" && 
                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={styles.explicit}/> }
                                        <Text style={styles.titleText} numberOfLines={1}>{item.attributes.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.artistArea}>
                                    <Text style={styles.artistText} numberOfLines={1}>{item.attributes.artistName}</Text>
                                </View>
                            </View>
                            {idx == index &&
                            <TouchableOpacity 
                                style={styles.completeView} 
                                onPress={() => onClickDelete(item.time)}
                            >
                                <Text style={styles.completeBox}>삭제</Text>
                            </TouchableOpacity> }
                            { deletePlaylistModal && <DeletePlaylistModal deletePlaylistModal={deletePlaylistModal} setDeletePlaylistModal={setDeletePlaylistModal} time={time}/> }
                        </TouchableOpacity>
                    )
                }}
            /> }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(250,250,250)',
        flex: 1,
    },
    contentStyle: {
        marginTop: 8 * tmpWidth, 
        paddingBottom: 18 * tmpWidth
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
    stopAndPlay: {
        position: 'absolute', 
        left: 15 * tmpWidth, 
        top: 15 * tmpWidth
    },
    textBox: {
        flex: 1, 
        marginLeft: 24 * tmpWidth, 
        marginRight: 18 * tmpWidth
    },
    flexRowContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    song: {
        width: 180 * tmpWidth, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    explicit: {
        marginRight: 5 * tmpWidth
    },
    titleText: {
        fontSize: 16 * tmpWidth
    },
    artistArea: {
        width: 180 * tmpWidth
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