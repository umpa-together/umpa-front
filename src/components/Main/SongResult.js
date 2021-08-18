import React, { useContext, useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { Context as CurationContext } from 'context/CurationContext'
import { useSearch } from 'providers/search';
import { useFocusEffect } from '@react-navigation/native';
import { SongImage } from 'components/SongImage'
import SvgUri from 'react-native-svg-uri';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import LoadingIndicator from '../LoadingIndicator'

export default SongResult = () => {
    const { state: searchState } = useContext(SearchContext);
    const { SearchSongOrArtist, initPlaylist, SearchAll } = useContext(SearchPlaylistContext);
    const { getCuration } = useContext(CurationContext);
    const { loading, onEndReached, searchOption, setIsResultClick } = useSearch()


    const onClickSong = (item) => {
        setIsResultClick(true)
        SearchAll({ id: item.id })
        //getCuration({isSong: true, object: item, id:item.id})
        //SearchSongOrArtist({ id: item.id})    
        //navigate('SelectedSong', {song: item, category: searchOption})
    }

    useFocusEffect(
        useCallback(() => {
            initPlaylist()
        }, [])
    )

    return (
        <>
            {searchState.songData.length === 0 ? <LoadingIndicator /> :
            <FlatList 
                style={styles.container}
                data={searchState.songData}
                keyExtractor={song=>song.id}
                maxToRenderPerBatch={1}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.8}
                ListFooterComponent={loading && <ActivityIndicator />}        
                renderItem={({item}) => {
                    const song = item.attributes.name
                    const artist = item.attributes.artistName
                    return (
                        <TouchableOpacity 
                            style={styles.resultBox} 
                            onPress={() => onClickSong(item)}
                        >
                            <SongImage url={item.attributes.artwork.url} size={56} border={56} />
                            <View style={styles.songBox}>
                                <View style={styles.flexRow}>
                                    {item.attributes.contentRating == "explicit" &&
                                    <SvgUri width="17" height="17" source={require('assets/icons/19.svg')} style={styles.explicit}/> }
                                    <Text numberOfLines={1} style={styles.song}>{song}</Text>
                                </View>
                                <Text numberOfLines={1} style={styles.artist}>{artist}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            /> }
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        paddingTop: 10 * tmpWidth,
    }, 
    resultBox:{
        width: 327 * tmpWidth,
        height: 70 * tmpWidth,
        marginLeft: 24 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    songBox: {
        marginLeft: 24 * tmpWidth, 
        width: 220 * tmpWidth, 
    },
    flexRow: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    explicit: {
        marginRight: 5 * tmpWidth
    },
    song: {
        fontSize: 16 * tmpWidth
    },
    artist: {
        color: '#c6c6c6',
        fontSize: 14 * tmpWidth, 
        marginTop: 3 * tmpWidth
    }
})