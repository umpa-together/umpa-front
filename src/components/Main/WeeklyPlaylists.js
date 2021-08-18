import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { navigate, push } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import LinearGradient from 'react-native-linear-gradient';
import ProfileImage from 'components/ProfileImage';

export default WeeklyPlaylists = ({ playlists }) => {
    const { getPlaylist, getAllPlaylists } = useContext(PlaylistContext);
    const scrollX = useRef(new Animated.Value(0)).current;
    
    const onClickAll = async () => {
        await getAllPlaylists()
        navigate('AllContents', {type: '플레이리스트'})
    }

    const onClickPlaylist = async (id, postUserId) => {
        await getPlaylist({id:id, postUserId:postUserId})
        push('SelectedPlaylist', {id: id, postUser: postUserId})
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>위클리 플레이리스트</Text>
                <TouchableOpacity onPress={onClickAll}>
                    <Text style={styles.subheader}>플레이리스트 둘러보기 {'>'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Animated.FlatList
                    data={playlists}
                    keyExtractor = {playlists => playlists._id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={344 * tmpWidth}
                    decelerationRate={0}
                    bounces={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.contentContainer}
                    onScroll = {Animated.event(
                        [{ nativeEvent: {contentOffset: {x: scrollX } } }],
                        {useNativeDriver: false}
                    )}
                    renderItem={({item})=> {
                        const { image, _id, hashtag, title, postUserId: postUser } = item
                        return (
                            <TouchableOpacity 
                                activeOpacity={1}
                                style={styles.playlistitem} 
                                onPress={() => onClickPlaylist(_id, postUser._id)}
                            >
                                <Image style ={styles.background} source ={{url:image}} />
                                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)','rgba(0,0,0,0.1)' ]} style={styles.linearContainer}>
                                <View style={styles.playlistHeder}>
                                    <ProfileImage img={postUser.profileImage} imgStyle={styles.playlistprofile} />
                                    <Text style={styles.user}>{postUser.name}</Text>
                                </View>
                                <View style={styles.playlistinfo}>
                                    <Text style={styles.title}>{title}</Text>
                                    <Text style={styles.hashtag}>{hashtag.map(hashtag => ' #'+hashtag+'')}</Text>
                                </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
    </View>
    )
}

const styles=StyleSheet.create({
    headerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 8 * tmpWidth, 
        marginBottom: 18 * tmpWidth, 
        alignItems: 'center'
    },
    header:{
        marginLeft: 24 * tmpWidth,
        fontSize: 16 * tmpWidth,
        fontWeight: '500'
    },
    subheader: {
        marginRight: 12 * tmpWidth,
        color: 'rgb(153,153,153)'
    },
    container: {
        width: '100%', 
        height: 240 * tmpWidth
    },
    contentContainer: {
        paddingLeft: 18 * tmpWidth, 
        paddingRight: 6 * tmpWidth
    },
    playlistitem:{
        width: 331 * tmpWidth,
        height: 224 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        backgroundColor: '#aaa',
        marginLeft: 6 * tmpWidth,
        marginRight: 6 * tmpWidth,
        shadowColor: "rgb(99, 99, 99)",
        shadowOffset: {
            height: 2 * tmpWidth,
            width: 2 * tmpWidth,
        },
        shadowRadius: 2 * tmpWidth,
        shadowOpacity: 0.3,
    },
    background: {
        position: 'absolute', 
        width: '100%', 
        height: '100%',
        borderRadius: 8 * tmpWidth,
    },
    linearContainer:{
        width: 331* tmpWidth,
        height: 224 * tmpWidth,
        borderRadius: 8 * tmpWidth,
    },
    playlistprofile:{
        marginLeft: 12 * tmpWidth,
        width: 20 * tmpWidth,
        height: 20 * tmpWidth,
        borderRadius: 12 * tmpWidth
    },
    user:{
        fontSize: 14 * tmpWidth,
        marginLeft: 8 * tmpWidth,
        color: 'rgba(255,255,255,0.72)',
        opacity: 0.72
    },
    playlistHeder: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 331 * tmpWidth, 
        height: 40 * tmpWidth,
    },
    playlistinfo:{
        width: 331 * tmpWidth,
        height: 184 * tmpWidth,
        marginBottom: 6 * tmpWidth,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 14 * tmpWidth,
        color: "#fff", 
        marginRight: 12 * tmpWidth,
        fontWeight: 'bold',
        marginBottom: 4 * tmpWidth
    },
    hashtag: {
        fontSize: 12 *tmpWidth, 
        color: 'rgba(255,255,255,0.8)',
        marginRight: 12 * tmpWidth, 
        marginBottom: 8 * tmpWidth,
    }
})