import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Context as SearchContext } from '../../context/SearchContext'
import HarmfulModal from '../HarmfulModal';
import { addtracksong, stoptracksong } from '../TrackPlayer'
import { SongImage } from '../SongImage'
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../FontNormalize'

export default SongResult = ({ songs, setSong }) => {
    const { state, songNext } = useContext(SearchContext);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [harmfulModal, setHarmfulModal] = useState(false);

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

    const onClickSong = (item) => {
        if(selectedId == item.id) {
            setSelectedId('')
            deleteItem({ data: item })
        } else {
            setSelectedId(item.id)
            addItem({ data: item })
        }
    }

    const onClickCover = (item) => {
        if(isPlayingid == item.id){
            stoptracksong({ setIsPlayingid })
        }else{
            addtracksong({ data: item, setIsPlayingid, setHarmfulModal })
        }
    }

    return (
        <FlatList
            data={state.songData}
            keyExtractor={song => song.id}
            onEndReached={onEndReached}
            onEndReachedThreshold={0}
            ListFooterComponent={loading && <ActivityIndicator />}
            renderItem={({item}) =>{
                const imgUrl = item.attributes.artwork.url
                return (
                    <TouchableOpacity
                        style={selectedId == item.id ? styles.selectedSong : styles.eachSong}
                        onPress={() => onClickSong(item)}
                    >
                        <TouchableOpacity onPress={() => onClickCover(item)}>
                            <SongImage url={imgUrl} size={56} border={56}/>
                            { isPlayingid != item.id ? 
                            <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalPlay.svg')} style={styles.stopAndPlay}/> :
                            <SvgUri width='26.5' height='26.5' source={require('../../assets/icons/modalStop.svg')} style={styles.stopAndPlay}/> }
                            {harmfulModal && <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> }
                        </TouchableOpacity>
                        <View style={styles.infoContainer}>
                            <View style={styles.flexRow}>
                                { item.attributes.contentRating == "explicit" &&
                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={styles.explicit}/> }
                                <Text style={styles.song} numberOfLines={1}>{item.attributes.name}</Text>
                            </View>
                            <Text style={styles.artist} numberOfLines={1}>{item.attributes.artistName}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles=StyleSheet.create({
    selectedSong: {
        width: 375 * tmpWidth,
        height: 76 * tmpWidth,
        flexDirection: 'row',
        paddingTop: 8 * tmpWidth,
        backgroundColor: 'rgb(238,244,255)',
        paddingLeft: 25 * tmpWidth,
    },
    eachSong: {
        width: 375 * tmpWidth,
        height: 76 * tmpWidth,
        flexDirection: 'row',
        paddingTop: 8 * tmpWidth,
        paddingLeft: 25 * tmpWidth
    },
    stopAndPlay: {
        position: 'absolute', 
        left: 15 * tmpWidth, 
        top: 15 * tmpWidth
    },
    infoContainer: {
        marginTop: 10 * tmpWidth, 
        marginLeft: 24 * tmpWidth
    },
    flexRow: {
        flexDirection: 'row', 
        alignItems: 'center',  
        width: 200 * tmpWidth
    },
    explicit: {
        marginRight: 5 * tmpWidth
    },
    song: {
        fontSize: 16 * tmpWidth
    },
    artist: {
        fontSize: 14 * tmpWidth, 
        color:'rgb(148,153,163)', 
        marginTop: 8 * tmpWidth
    }
})