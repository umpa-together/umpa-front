import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'components/ProfileImage'
import SvgUri from 'react-native-svg-uri';
import { usePlaylist } from 'providers/playlist';

export default PlaylistsLikes = ({ playlist }) => {
    const { likesPlaylist, unlikesPlaylist } = useContext(PlaylistContext);
    const { state: userState } = useContext(UserContext);
    const { postUserId: postUser, likes } = playlist
    const { onClickProfile } = usePlaylist()

    const onClickLikes = () => {
        if(likes.includes(userState.myInfo._id)) {
            unlikesPlaylist({ id: playlist._id })
        } else {
            likesPlaylist({ id: playlist._id })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <TouchableOpacity 
                    onPress={() => onClickProfile(postUser._id)}
                >
                    <ProfileImage img={postUser.profileImage} imgStyle={styles.img} />
                </TouchableOpacity>
                <Text style={styles.name}>{postUser.name}</Text>
            </View>
            <TouchableOpacity onPress={onClickLikes}>
                <SvgUri 
                    width={40} height={40} 
                    source={likes.includes(userState.myInfo._id) ? require('assets/icons/playlistHearto.svg') : require('assets/icons/playlistHeart.svg')}
                /> 
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 18 * tmpWidth,
        paddingRight: 10 * tmpWidth
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        borderRadius: 40 * tmpWidth
    },
    name: {
        fontSize: 14 * tmpWidth,
        marginLeft: 11 * tmpWidth
    }
})