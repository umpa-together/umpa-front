import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Context as DJContext } from 'context/DJContext';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from '../ProfileImage'
import LoadingIndicator from 'components/LoadingIndicator'
import { push } from 'navigationRef';
import SvgUri from 'react-native-svg-uri';

export default AllUsersForm = () => {
    const { state, getSongs } = useContext(DJContext);
    const { getPlaylist } = useContext(PlaylistContext)
    const { getOtheruser, follow, unfollow } = useContext(UserContext);
    const [userPage, setUserPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [isFollow, setIsFollow] = useState([])

    const getData = async () => {
        if(state.mainRecommendDJ.length / 20 > userPage) {
            //setLoading(true);
            setUserPage((prev) => prev + 1)
            //setLoading(false);
        }
    };

    const onEndReached = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };

    const onClickPlaylist = async (playlist) => {
        const { _id: id, postUserId: postUser } = playlist
        await getPlaylist({ id, postUserId: postUser })
        push('SelectedPlaylist', { id, postUser })
    }

    const onClickProfile = async (id) => {
        await Promise.all([
            getOtheruser({ id }),
            getSongs({ id })
        ]);
        push('OtherAccount', { otherUserId: id });
    }

    const onClickFollow = (id) => {
        if(isFollow.includes(id)) {
            unfollow({ id })
            setIsFollow(isFollow.filter((item) => item !== id))
        } else {
            follow({ id })
            setIsFollow((prev) => [...prev, id])
        }
    }
    
    return (
        <View style={styles.container}>
            {state.mainRecommendDJ === null ? <LoadingIndicator /> :
            <FlatList
                keyboardShouldPersistTaps="handled"
                data={state.mainRecommendDJ.slice(0, 20 * userPage)}
                keyExtractor={dj=>dj._id}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                renderItem={({ item })=> {
                    const { profileImage, playlists, name, introduction, id } = item
                    const length = 3 - playlists.length
                    return (
                        <View style={styles.box}>
                            <View style={styles.flexRow}>
                                <TouchableOpacity 
                                    onPress={() => onClickProfile(id)}
                                >
                                    <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
                                </TouchableOpacity>
                                <View style={styles.flexRow}>
                                    {playlists.slice(0, 3).map((item) => {
                                        const { image } = item
                                        return (
                                            <TouchableOpacity 
                                                onPress={() => onClickPlaylist(item)}
                                                style={styles.songmargin}
                                                key={image}
                                            >
                                                <Image style={styles.playlistImg} source={{uri: image}} />
                                            </TouchableOpacity>
                                        )
                                    })}
                                    {length > 0 && [...Array(length)].map(() => {
                                        return (
                                            <View
                                                style={[styles.songmargin, styles.playlistImg]}
                                                key={Math.random()}
                                            />
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={styles.spaceBetween}>
                                <View>
                                    <Text style={styles.name}>{name}</Text>
                                    <Text style={styles.introduction}>{introduction}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={isFollow.includes(id) ? styles.followBox : styles.followingBox}
                                    onPress={() => onClickFollow(id)}
                                >
                                    { isFollow.includes(id) ? 
                                    <View style={styles.flexRow}>
                                        <Text style={styles.follow}>
                                            팔로우
                                        </Text>
                                        <SvgUri width='10' height='10' source={require('assets/icons/followCheck.svg')} style={styles.icon} /> 
                                    </View> :
                                    <Text style={styles.following}>
                                        팔로우
                                    </Text> }
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            /> }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        borderTopColor: '#dcdcdc',
        borderTopWidth: 0.5 * tmpWidth,
        flex: 1,
    },
    box: {
        borderBottomWidth: 0.5 * tmpWidth,
        borderBottomColor: '#dcdcdc',
        paddingLeft: 18 * tmpWidth, 
        paddingRight: 18 * tmpWidth,
        paddingTop: 16 * tmpWidth,
        paddingBottom: 14 * tmpWidth
    },
    profileImg: {
        width: 70 * tmpWidth,
        height: 70 * tmpWidth,
        borderRadius: 70 * tmpWidth,
        marginTop: 5 * tmpWidth,
        marginRight: 21 * tmpWidth
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 13 * tmpWidth,
        marginTop: 13 * tmpWidth,
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
        height: 26 * tmpWidth,
        marginTop: 16 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    follow: {
        fontSize: 12 * tmpWidth,
        color: '#8bc0ff'
    },
    followingBox: {
        backgroundColor: '#8bc0ff',
        borderRadius: 100 * tmpWidth,
        width: 80 * tmpWidth,
        height: 26 * tmpWidth,
        marginTop: 16 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    following: {
        fontSize: 12 * tmpWidth,
        color: '#ffffff'
    },
    playlistImg: {
        width: 80 * tmpWidth,
        height: 80 * tmpWidth,
        borderRadius: 4 * tmpWidth,
        borderWidth: 0.5 * tmpWidth,
        borderColor: '#e3e3e3',
        backgroundColor: '#e8e8e8'
    },
    icon: {
        width: 15 * tmpWidth,
        height: 15 * tmpWidth,
        alignItems: 'center',
        justifyContent: 'center'
    }
})