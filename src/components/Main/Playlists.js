import React, { useContext } from 'react'
import { Text, FlatList, TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'components/ProfileImage';
import { push } from 'navigationRef';

export default Playlists = ({ playlists, isPlaylist }) => {
    const { getPlaylist } = useContext(PlaylistContext);

    const onClickPlaylist = async (id, postUser) => {
        const postUserId = postUser._id || postUser
        await getPlaylist({ id, postUserId })
        push('SelectedPlaylist', { id, postUser: postUserId })
    }

    return (
        <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}                            
            data={playlists.slice(0, 10)}
            keyExtractor={item=>item._id}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => {
                const { _id: id, image, title, hashtag, postUserId: postUser } = item
                return (
                    <TouchableOpacity 
                        style={styles.playlist}
                        onPress={() => onClickPlaylist(id, postUser)}
                    >
                        <Image source={{uri: image}} style={styles.playlistImg} />
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        <Text style={styles.hashtag} numberOfLines={1}>{hashtag.map((item) => '#'+item+' ')}</Text>
                        { isPlaylist && 
                        <View style={styles.flexRow}>
                            <ProfileImage img={postUser.profileImage} imgStyle={styles.profileImg} />
                            <Text style={styles.name}>{postUser.name}</Text>
                        </View> }
                    </TouchableOpacity>
                )
            }}
        /> 
    )
}

const styles=StyleSheet.create({
    container: {
        paddingLeft: 18 * tmpWidth
    },
    playlist: {
        marginRight: 6 * tmpWidth,
        width: 120 * tmpWidth
    },
    playlistImg: {
        width: 120 * tmpWidth,
        height: 120 * tmpWidth,
        borderRadius: 4 * tmpWidth
    },
    title: {
        fontSize: 14 * tmpWidth,
        marginTop: 8 * tmpWidth,
        marginBottom: 2 * tmpWidth
    },
    hashtag: {
        fontWeight: '300',
        fontSize: 12 * tmpWidth,
        color: '#505050'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8 * tmpWidth
    },
    profileImg: {
        width: 20 * tmpWidth,
        height: 20 * tmpWidth,
        borderRadius: 20 * tmpWidth,
        marginRight: 4 * tmpWidth
    },
    name: {
        fontSize: 12 * tmpWidth,
        fontWeight: '400'
    }
})