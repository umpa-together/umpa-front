import React from 'react'
import { FlatList, View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import { SongImage } from 'components/SongImage'
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { useTrackPlayer } from 'providers/trackPlayer'

export default CreateSongsLists = ({ songs }) => {
    const { isPlayingId, addtracksong, stoptracksong } = useTrackPlayer()
    console.log(songs);
    const onClickPlay = (song) => {
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
                <View style={[styles.container, styles.flexRow]}>
                    <View style={styles.flexRow}>
                        <SvgUri width='24' height='25' source={require('assets/icons/profileSong.svg')} />
                        <View style={styles.textArea}>
                            <Text style={styles.text} numberOfLines={1}>{songs[0].attributes.name} - {songs[0].attributes.artistName}</Text>
                        </View>
                    </View>
                    {isPlayingId != songs[0].id ? 
                        <TouchableOpacity 
                            style={styles.iconArea}
                        >
                            <Image 
                                style={styles.icon}
                                source={require('assets/icons/profileSongPlay.png')} 
                            />
                        </TouchableOpacity>
                    :
                    <TouchableOpacity 
                        style={styles.iconArea}
                    >
                        <Text>stop</Text>
                    </TouchableOpacity>   }             
                </View>
            </> }
        </>
    )
}


const styles=StyleSheet.create({
    container: {
        paddingLeft: 18 * tmpWidth,
        paddingRight: 23 * tmpWidth,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 13 * tmpWidth,
        color: '#838383',
        marginLeft: 4 * tmpWidth
    },
    textArea: {
        width: 260 * tmpWidth,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 20 * tmpWidth,
        height: 20 * tmpWidth
    },
    iconArea: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center'
    }
})