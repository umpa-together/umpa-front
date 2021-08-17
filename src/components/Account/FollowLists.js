import React, { useContext } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext'
import { Context as DJContext } from 'context/DJContext'
import { navigate, push } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'components/ProfileImage';

export default FollowLists = ({ result }) => {
    const { state, getOtheruser, follow, unfollow, getMyInfo } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);

    const followCheck = ({id}) => {
        for(let key in state.myInfo.following){
            if(state.myInfo.following[key]._id == id)   return true;
        }
        return false;
    }

    const onClickProfile = async (id) => {
        if(id == state.myInfo._id) {
            navigate('Account')
        }else{
            await Promise.all([
                getOtheruser({ id }),
                getSongs({ id })
            ]);
            push('OtherAccount', {otherUserId: id})
        }
    }

    const onClickFollow = async (id) => {
        await follow({ id })
        getMyInfo();
    }

    const onClickUnFollow = async (id) => {
        await unfollow({ id });
        getMyInfo();
    }

    return (
        <FlatList
            keyboardShouldPersistTaps="handled"
            data={result}
            keyExtractor={dj=>dj._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item })=> {
                return (
                    <TouchableOpacity 
                        style={styles.userBox} 
                        onPress={() => onClickProfile(item._id)}
                    >
                        <ProfileImage img={item.profileImage} imgStyle={styles.profile}/>
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={styles.songContainer}>
                                <View style={styles.representSongBox}>
                                    <Text style={styles.title}>대표곡</Text>
                                </View>
                                <View style={styles.songArea}>
                                    <Text style={styles.song} numberOfLines={1}>{item.songs[0].attributes.name}</Text>
                                </View>
                                <View style={styles.artistArea}>
                                    <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">{item.songs[0].attributes.artistName}</Text>
                                </View>
                            </View>
                        </View>
                        { followCheck({id: item._id}) ?
                        item._id == state.myInfo._id ? <View style={styles.myArea} /> :
                        <TouchableOpacity 
                            style={styles.followingBox} 
                            onPress={() => onClickUnFollow(item._id)}>
                            <Text style={styles.followingText}>팔로잉</Text>
                        </TouchableOpacity> :
                        item._id == state.myInfo._id ? <View style={styles.myArea}></View>:
                        <TouchableOpacity 
                            style={styles.followBox} 
                            onPress={() => onClickFollow(item._id)}
                        >
                            <Text style={styles.followText}>팔로우 +</Text>
                        </TouchableOpacity> }
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles=StyleSheet.create({
    userBox: {
        height: 70 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 22 * tmpWidth,
        paddingRight: 18 * tmpWidth,
        justifyContent: 'space-between',
    },
    profile: {
        width: 56 * tmpWidth,
        height: 56 * tmpWidth,
        borderRadius: 56 * tmpWidth,
    },
    name: {
        fontSize: 16 * tmpWidth
    },
    songContainer: {
        flexDirection: 'row',
        marginTop: 7.3 * tmpWidth, 
        alignItems:'flex-end'
    },
    representSongBox: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 41 * tmpWidth,
        height: 16 * tmpWidth,
        borderWidth: 0.8 * tmpWidth,
        borderColor: 'rgba(148,153,163,0.5)',
        borderRadius: 30 * tmpWidth
    },
    title: {
        fontSize: 11 * tmpWidth, 
        color: 'rgba(148,153,163,1)'
    },
    songArea: {
        width: 90 * tmpWidth
    },
    song:{
        marginLeft: 6 * tmpWidth,
        fontSize: 14 * tmpWidth,
        color: 'rgba(148,153,163,1)',
        fontWeight: 'bold'
    },
    artistArea: {
        width:50 * tmpWidth
    },
    artist: {
        marginLeft: 4 * tmpWidth,
        fontSize: 11 * tmpWidth, 
        color: 'rgba(148,153,163,1)'
    },
    followBox: {
        width: 64 * tmpWidth,
        height: 25 * tmpWidth,
        borderRadius: 30 * tmpWidth,
        backgroundColor: 'rgb(169,193,255)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    followingBox: {
        width: 64 * tmpWidth,
        height: 25 * tmpWidth,
        borderRadius: 30 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8 * tmpWidth,
        borderColor: 'rgb(169,193,255)'
    },
    myArea: {
        width: 64 * tmpWidth
    },
    followingText: {
        fontSize: 12 * tmpWidth,
        color: 'rgb(169,193,255)'
    },
    followText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(255,255,255)'
    }
})