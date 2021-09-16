import React, { useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { usePlaylist } from 'providers/playlist';
import { SongImage } from 'components/SongImage'
import SvgUri from 'react-native-svg-uri';
import { useTrackPlayer } from 'providers/trackPlayer'

export default AddedSongLists = ({ addedSongs }) => {
    const { setSongs, songs, onClickDeleteSong, validity } = usePlaylist()
    const { isPlayingId, addtracksong, stoptracksong } = useTrackPlayer()

    const onClickCover = (song) => {
        if(isPlayingId === song.id) {
            stoptracksong()
        } else { 
            addtracksong({ data: song })
        }
    }
    
    useEffect(() => {
        setSongs(addedSongs)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.divider} />
            <View style={styles.flexRow}>
                <Text style={styles.title}>담은 곡들</Text>
                <Text style={validity.song ? styles.subTitle : styles.warning}>(최소 3개, 최대 7개)</Text>
            </View>
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={songs}
                keyExtractor={song => song.id}
                renderItem={({item}) => {
                    const img = item.attributes.artwork.url
                    const { name, artistName, contentRating } = item.attributes
                    const { id } = item
                    return (
                        <View style={styles.box}>
                            <TouchableOpacity
                                onPress={() => onClickCover(item)}
                            >
                                <SongImage url={img} size={90} border={4}/>
                                <TouchableOpacity 
                                    onPress={() => onClickDeleteSong(item)}
                                    style={styles.deleteIcon}
                                >
                                    <SvgUri width='15' height='15' source={require('assets/icons/addedSongDelete.svg')} />
                                </TouchableOpacity>
                                <SvgUri 
                                    width='24' height='24' 
                                    source={isPlayingId !== id ? require('assets/icons/modalPlay.svg') : require('assets/icons/modalStop.svg')} 
                                    style={styles.playIcon}
                                />
                            </TouchableOpacity>
                            <View style={[styles.flexRow, contentRating==='explicit' && styles.area]}>
                                { contentRating == "explicit" &&
                                <SvgUri width="17" height="17" source={require('assets/icons/19.svg')} style={styles.explicit}/> }
                                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                            </View>
                            <Text style={styles.artist} numberOfLines={1}>{artistName}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        paddingLeft: 18 * tmpWidth
    },
    divider: {
        borderColor: '#b4b4b4',
        borderWidth: 0.5 * tmpWidth,
        marginRight: 18 * tmpWidth
    },
    title: {
        fontSize: 18 * tmpWidth,
        fontWeight: '500',
        marginTop: 14 * tmpWidth,
        marginBottom: 12 * tmpWidth
    },
    box: {
        width: 90 * tmpWidth,
        marginRight: 6 * tmpWidth
    },
    name: {
        fontSize: 14 * tmpWidth,
        fontWeight: '400',
        marginTop: 8 * tmpWidth,
        marginBottom: 4 * tmpWidth,
    },
    artist: {
        fontSize: 12 * tmpWidth,
        fontWeight: '400',
        color: '#838383'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    explicit: {
        marginRight: 5 * tmpWidth
    },
    area: {
        width: 68 * tmpWidth
    },
    playIcon: {
        position: 'absolute', 
        left: 0,
        bottom: 0
    },
    deleteIcon: {
        width: 15 * tmpWidth,
        height: 15 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 4 * tmpWidth,
        right: 4 * tmpWidth
    },
    warning: {
        fontSize: 12 * tmpWidth,
        fontWeight: '500',
        marginLeft: 12 * tmpWidth,
        color: 'rgb(238, 98, 92)'
    },
    subTitle: {
        fontSize: 12 * tmpWidth,
        fontWeight: '500',
        marginLeft: 12 * tmpWidth,
        color: '#c4c4c4'
    }
})