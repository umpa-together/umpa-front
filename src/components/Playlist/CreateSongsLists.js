import React from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SongImage } from 'components/SongImage'
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { useTrackPlayer } from 'providers/trackPlayer'

export default CreateSongsLists = ({ songs }) => {
    const { isPlayingId, addtracksong, stoptracksong } = useTrackPlayer()

    const onClickCover = (song) => {
        if(isPlayingId === song.id) {
            stoptracksong()
        } else { 
            addtracksong({ data: song })
        }
    }

    return (
        <>
            {songs.length !== 0 &&
            <>
                <Text style={styles.title}>곡 담기</Text>
                <FlatList 
                    data={songs}
                    keyExtractor={song => song.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.container}
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
            </> }
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        paddingLeft: 18 * tmpWidth
    },
    title: {
        fontSize: 18 * tmpWidth,
        fontWeight: '500',
        marginBottom: 12 * tmpWidth,
        marginLeft: 18 * tmpWidth
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
        right: 0,
        bottom: 0
    },

})