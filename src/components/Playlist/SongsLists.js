import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { SongImage } from 'components/SongImage'
import HarmfulModal from 'components/HarmfulModal';
import { useTrackPlayer } from 'providers/trackPlayer';
import SvgUri from 'react-native-svg-uri';
import MoveText from 'components/MoveText'

export default SongsLists = ({ songs }) => {
    const { isPlayingId, addtracksong, stoptracksong } = useTrackPlayer()
    
    const onClickCover = (preview) => {
        if(isPlayingId === preview.id) {
            stoptracksong()
        }else{
            addtracksong({ data: preview })
        }
    }

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={songs}
            keyExtractor={playlist=>playlist.id}
            horizontal = {true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                const { attributes, id } = item
                const url = item.attributes.artwork.url
                const { contentRating, name, artistName } = attributes
                return (
                    <View>
                        <TouchableOpacity 
                            onPress={() => onClickCover(item)}
                            style={styles.playlistsImg}
                        >
                            <SongImage url={url} size={117} border={4}/>
                            <SvgUri 
                                width='30' height='30' 
                                source={isPlayingId !== id ? require('assets/icons/modalPlay.svg') : require('assets/icons/modalStop.svg')} 
                                style={styles.playIcon}
                            />
                        </TouchableOpacity>
                        <HarmfulModal />
                        <MoveText 
                            container={contentRating === 'explicit' ? styles.explicitName : styles.nameBox} 
                            text={name} 
                            isMove={id === isPlayingId} 
                            isExplicit={contentRating === 'explicit'} 
                            textStyles={styles.name} 
                        />
                        <MoveText 
                            container={styles.artistBox} 
                            text={artistName} 
                            isMove={id === isPlayingId} 
                            isExplicit={false} 
                            textStyles={styles.artist} 
                        />
                    </View>
                )
            }}
        >
        </FlatList>
    )
}

const styles=StyleSheet.create({
    container: { 
        paddingLeft: 18 * tmpWidth, 
        marginTop: 16 * tmpWidth,
    },
    playlistsImg: {
        width: 117 * tmpWidth,
        height: 117 * tmpWidth,
        borderRadius: 4 * tmpWidth,
        borderWidth: 0.7 * tmpWidth,
        borderColor: '#cccccc',
        marginRight: 8 * tmpWidth
    },
    nameBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 9 * tmpWidth,
        width: 117 * tmpWidth,
    },
    explicitName: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 9 * tmpWidth,
        width: 95 * tmpWidth,
    },
    artistBox: {
        width: 110 * tmpWidth
    },
    name: {
        fontSize: 14 * tmpWidth,
        lineHeight: 16 * tmpWidth,
    },
    artist: {
        fontSize: 13 * tmpWidth,
        color: '#838383',
        marginTop: 4 * tmpWidth
    },
    playIcon: {
        position: 'absolute', 
        right: 6 * tmpWidth, 
        bottom: 6 * tmpWidth
    }
})