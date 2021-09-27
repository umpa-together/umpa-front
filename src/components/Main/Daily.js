import React, { useContext } from 'react'
import { Text, FlatList, TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import { Context as DailyContext } from 'context/DailyContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'components/ProfileImage';
import { push } from 'navigationRef';
import { SongImage } from 'components/SongImage'

export default Playlists = ({ daily, isDaily }) => {
    const { getDaily } = useContext(DailyContext);

    const onClickDaily = async (id, postUser) => {
        const postUserId = postUser._id || postUser
        await getDaily({ id, postUserId })
        push('SelectedDaily', { id, postUser: postUserId })
    }

    return (
        <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}                            
            data={daily.slice(0, 10)}
            keyExtractor={item=>item._id}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => {
                const { _id: id, image, song, postUserId: postUser } = item
                const { name, artistName } = song.attributes
                return (
                    <TouchableOpacity 
                        style={styles.daily}
                        onPress={() => onClickDaily(id, postUser)}
                    >
                        {image[0] ? 
                        <Image source={{uri: image[0]}} style={styles.dailyImg} /> : 
                        <SongImage url={song.attributes.artwork.url} size={117} border={4}/> }
                        <Text style={styles.songName} numberOfLines={1}>{name}</Text>
                        <Text style={styles.artist}>{artistName}</Text>
                        { isDaily &&
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
    daily: {
        marginRight: 6 * tmpWidth,
        width: 120 * tmpWidth
    },
    dailyImg: {
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
    },
    songName: {
        fontSize: 14 * tmpWidth,
        marginTop: 8 * tmpWidth,
        width: 120 * tmpWidth,
        fontWeight: '500'
    },
    artist: {
        fontSize: 12 * tmpWidth,
        marginTop: 4 * tmpWidth,
        width: 130 * tmpWidth,
        fontWeight: '300',
        marginBottom: 3 * tmpWidth
    },
})