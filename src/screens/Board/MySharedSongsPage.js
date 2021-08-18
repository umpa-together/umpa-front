import React, { useCallback, useContext } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import TrackPlayer from 'react-native-track-player';
import { Context as UserContext } from 'context/UserContext';
import { Context as BoardContext } from 'context/BoardContext';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { SongImage } from 'components/SongImage'
import { NavHeader } from 'components/Header';
import { useFocusEffect } from '@react-navigation/native';

const MySharedSongsPage = () => {
    const { state } = useContext(UserContext);
    const { getCurrentBoard, getSelectedBoard, initMusic } = useContext(BoardContext);

    useFocusEffect(
        useCallback(() => {
            initMusic()
        }, [])
    )
    return (
        <View style={styles.container}>
            <NavHeader title="공유한 음악" isBack={true} />
            {state.myBoardSongs == null ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View> :
            <FlatList 
                data={state.myBoardSongs}
                keyExtractor={(song)=>song._id}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.songBox} onPress={async () => {
                            getCurrentBoard({boardId:item.boardId._id})
                            await getSelectedBoard({id: item.boardId._id})
                            navigate('MusicArchive', {name:item.boardId.name})}}>
                            <View style={styles.songCover}>
                                <SongImage url={item.song.attributes.artwork.url} size={56} border={56}/>
                            </View>
                            <View style={styles.textBox}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{width: 130 * tmpWidth, flexDirection: 'row', alignItems: 'center'}}>
                                        {item.song.attributes.contentRating == "explicit" ? 
                                        <SvgUri width="17" height="17" source={require('assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                        : null }
                                        <Text style={styles.titleText} numberOfLines={1}>{item.song.attributes.name}</Text>
                                    </View>
                                    <View style={{width: 100 * tmpWidth, alignItems: 'flex-end'}}>
                                        <Text style={styles.boardText} numberOfLines={1}>{item.boardId.name}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{width: 120 * tmpWidth}}>
                                        <Text style={styles.artistText} numberOfLines={1}>{item.song.attributes.artistName}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 8 * tmpWidth}}>
                                        <Text style={styles.viewText}>조회수 {item.views}</Text>
                                        <Text style={styles.likeText}>좋아요 {item.likes.length}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            /> }
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)', 
        flex: 1,
    },
    songBox: {
        width: '100%',
        height: 96 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(229,231,239)'
    },
    songCover: {
        width: 56 * tmpWidth,
        height: 56 * tmpWidth,
        marginLeft: 24 * tmpWidth
    },
    textBox: {
        flex: 1, 
        marginLeft: 24 * tmpWidth, 
        marginRight: 18 * tmpWidth
    },
    titleText: {
        fontSize: 16 * tmpWidth
    },
    boardText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(148,153,163)'
    },
    artistText: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginTop: 8 * tmpWidth
    }, 
    viewText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(79,79,79)', 
    },
    likeText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(79,79,79)', 
        marginLeft: 12 * tmpWidth
    }
});

export default MySharedSongsPage;