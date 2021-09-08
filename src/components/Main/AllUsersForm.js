import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as WeeklyContext } from 'context/WeeklyContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from '../ProfileImage'
import { SongImage } from 'components/SongImage'
import { useTrackPlayer } from 'providers/trackPlayer';
import HarmfulModal from 'components/HarmfulModal';

export default AllUsersForm = () => {
    const { state } = useContext(WeeklyContext);
    const { addtracksong, stoptracksong, isPlayingId } = useTrackPlayer()
    const onClickSong = (item) => {
        if(isPlayingId !== item.id) {
            addtracksong({data: item})
        } else {
            stoptracksong()
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyboardShouldPersistTaps="handled"
                data={state.weeklyDJ}
                keyExtractor={dj=>dj._id}
                renderItem={({item})=> {
                    const { profileImage, songs, name, introduction } = item
                    return (
                        <View style={styles.box}>
                            <View style={styles.spaceBetween}>
                                <TouchableOpacity 
                                    onPress={async () => {
                                        //await Promise.all([getOtheruser({id:item._id}),
                                        //getSongs({id:item._id})]);
                                        //push('OtherAccount', {otherUserId:item._id});
                                    }
                                }>
                                    <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
                                </TouchableOpacity>
                                <View style={styles.flexRow}>
                                    {songs.slice(0, 3).map((item) => {
                                        const url = item.attributes.artwork.url
                                        return (
                                            <TouchableOpacity 
                                                onPress={() => onClickSong(item)}
                                                style={styles.songmargin}
                                            >
                                                {isPlayingId !== item.id ? 
                                                <SongImage url={url} size={80} border={4}  /> : 
                                                <SongImage url={url} size={80} border={80} /> }
                                                <HarmfulModal />
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={styles.spaceBetween}>
                                <View>
                                    <Text style={styles.name}>{name}</Text>
                                    <Text style={styles.introduction}>{introduction}</Text>
                                </View>
                                <TouchableOpacity style={styles.followBox}>
                                    <Text style={styles.follow}>팔로우</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        borderTopColor: '#dcdcdc',
        borderTopWidth: 0.5 * tmpWidth
    },
    box: {
        height: 155 * tmpWidth,
        borderBottomWidth: 0.5 * tmpWidth,
        borderBottomColor: '#dcdcdc',
        paddingLeft: 18 * tmpWidth, 
        paddingRight: 18 * tmpWidth,
        paddingTop: 16 * tmpWidth,
    },
    profileImg: {
        width: 70 * tmpWidth,
        height: 70 * tmpWidth,
        borderRadius: 70 * tmpWidth,
        marginTop: 5 * tmpWidth
    },
    songsImg: {
        width: 80 * tmpWidth,
        height: 80 * tmpWidth,
        borderRadius: 4 * tmpWidth
    },
    playingImg: {
        width: 80 * tmpWidth,
        height: 80 * tmpWidth,
        borderRadius: 80 * tmpWidth
    },
    songmargin: {
        marginLeft: 4 * tmpWidth
    }, 
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexRow: {
        flexDirection: 'row'
    },
    name: {
        fontSize: 13 * tmpWidth,
        marginTop: 8 * tmpWidth,
        lineHeight: 19 * tmpWidth
    },
    introduction: {
        fontSize: 12 * tmpWidth,
        color: '#686868',
    },
    followBox: {
        borderWidth: 1 * tmpWidth,
        borderColor: '#8bc0ff',
        borderRadius: 100 * tmpWidth,
        width: 80 * tmpWidth,
        height: 25 * tmpWidth,
        marginTop: 15 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    follow: {
        fontSize: 12 * tmpWidth,
        color: '#8bc0ff'
    }
})