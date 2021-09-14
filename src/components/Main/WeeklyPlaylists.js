import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { navigate, push } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import LinearGradient from 'react-native-linear-gradient';
import ProfileImage from 'components/ProfileImage';

export default WeeklyPlaylists = ({ playlists }) => {
    const { getPlaylist } = useContext(PlaylistContext);
    
    const onClickAll = async () => {
        navigate('AllContents', {type: '플레이리스트'})
    }

    const onClickPlaylist = async (id, postUserId) => {
        await getPlaylist({id:id, postUserId:postUserId})
        push('SelectedPlaylist', {id: id, postUser: postUserId})
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>새로운 플레이리스트를 구경해보세요</Text>
                <TouchableOpacity onPress={onClickAll} style={styles.allBox}>
                    <Text style={styles.subheader}>전체보기</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={playlists}
                keyExtractor = {playlists => playlists._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.container}
                renderItem={({item})=> {
                    const { image, _id, hashtag, title, postUserId: postUser } = item
                    return (
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => onClickPlaylist(_id, postUser._id)}
                        >
                            <Image style={styles.playlistImg} source={{ uri: image }} />
                            <Text style={styles.title} numberOfLines={2}>{title}</Text>
                            { hashtag.length !== 0 && <Text style={styles.hashtag}>{hashtag.map(hashtag => ' #'+hashtag+'')}</Text> }
                            <View style={styles.flexRow}>
                                <ProfileImage img={postUser.profileImage} imgStyle={styles.profileImg} />
                                <Text style={styles.user} numberOfLines={1}>{postUser.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </>
    )
}

const styles=StyleSheet.create({
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: 30 * tmpWidth, 
        marginBottom: 20 * tmpWidth, 
        paddingLeft: 18 * tmpWidth,
        paddingRight: 18 * tmpWidth
    },
    header:{
        fontSize: 16 * tmpWidth,
        fontWeight: '700'
    },
    container: {
        paddingLeft: 18 * tmpWidth,
        paddingRight: 18 * tmpWidth
    },
    allBox: {
        width: 64 * tmpWidth,
        height: 24 * tmpWidth,
        backgroundColor: '#8bc0ff',
        borderRadius: 6 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subheader: {
        color: '#ffffff',
        fontSize: 12 * tmpWidth,
        fontWeight: '400'
    },
    playlistImg: {
        width: 130 * tmpWidth,
        height: 130 * tmpWidth,
        borderRadius: 4 * tmpWidth,
        marginRight: 6 * tmpWidth
    },
    title: {
        fontSize: 14 * tmpWidth,
        marginTop: 8 * tmpWidth,
        width: 130 * tmpWidth,
    },
    profileImg: {
        width: 20 * tmpWidth,
        height: 20 * tmpWidth,
        marginRight: 4 * tmpWidth,
        borderRadius: 20 * tmpWidth
    },
    user:{
        fontSize: 12 * tmpWidth,
        fontWeight: '400',
    },
    hashtag: {
        fontSize: 12 * tmpWidth, 
        fontWeight: '300',
        color: '#505050',
        marginTop: 5 * tmpWidth, 
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5 * tmpWidth, 
    }
})