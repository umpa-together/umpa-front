import React, { useState, useContext, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize'
import { navigate, push } from 'navigationRef';

export default FollowBox = ({ user, isMyAccount }) => {
    const { state: userState, follow, unfollow, getMyInfo } = useContext(UserContext);

    const [followerNum , setFollowerNum] = useState(0);
    const [isFollow, setIsFollow] = useState(false);

    const followCheck = ({id}) => {
        if(user != null) {
            for(let key in user.follower){
                if(user.follower[key]._id == id)   return true;
            }
        }
        return false;
    }

    const onClickEdit = () => {
        navigate('ProfileEdit')
    }

    const onClickUnFollow = async () => {
        setIsFollow(false);
        await unfollow({id:user._id})
        getMyInfo();
        setFollowerNum(prev => prev-1)
    }

    const onClickFollow = async () => {
        setIsFollow(true);
        await follow({id:user._id})
        getMyInfo();
        setFollowerNum(prev => prev+1)
    }

    useEffect(() => {
        setIsFollow(followCheck({id: userState.myInfo._id}))
        setFollowerNum(user.follower.length);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.flexBox}>
                <View style={styles.followContainer}>
                    <TouchableOpacity style={styles.rowBox} onPress={() => {
                        push('Follow', {name: user.name, type: 'following'})
                    }}>
                        <Text style={styles.title}>팔로잉 </Text>
                        <Text style={styles.number}>{user.following.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowBox} onPress={() => {
                        push('Follow', {name: user.name, type: 'follower'})
                    }}>
                        <Text style={styles.title}>팔로워 </Text>
                        <Text style={styles.number}>{isMyAccount ? user.follower.length : followerNum}</Text>
                    </TouchableOpacity>
                </View>
                {isMyAccount ? 
                <View style={styles.profileContainer}>
                    <TouchableOpacity style={styles.profileEditBox} onPress={onClickEdit}>
                        <Text style={styles.profileText}>프로필 편집</Text>
                    </TouchableOpacity>
                </View> : 
                <>
                    {isFollow ?
                    <TouchableOpacity 
                        style={styles.followingBox} 
                        onPress={onClickUnFollow}
                    >
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(154,188,255)'}}>팔로잉</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity 
                        style={styles.followBox} 
                        onPress={onClickFollow}
                    >
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(255,255,255)'}}>팔로우 +</Text>
                    </TouchableOpacity> }
                </> }
            </View>
        </View>   
    )
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 25 * tmpWidth ,
        alignItems: 'center',
        paddingLeft: 20  * tmpWidth,
        paddingRight: 16 * tmpWidth,
        marginTop: 25 * tmpWidth,
    },
    flexBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flex: 1
    },
    followContainer: {
        flexDirection: 'row', 
        width: 200 * tmpWidth, 
    },
    rowBox: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginRight: 12 * tmpWidth
    },
    title: {
        fontSize: 12 * tmpWidth
    },
    number: {
        fontSize: 14 * tmpWidth, 
        fontWeight: '600'
    },
    profileContainer: {
        width: 155 * tmpWidth, 
        alignItems: 'flex-end'
    },
    profileEditBox: {
        width: 87 * tmpWidth,
        height: 25 * tmpWidth,
        borderRadius: 30 * tmpWidth,
        borderWidth: 0.8 * tmpWidth,
        marginRight: 24 * tmpWidth,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderColor: 'rgba(169,193,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    profileText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(169,193,255)'
    },
    followBox: {
        width: 64 * tmpWidth ,
        height: 25 * tmpWidth ,
        borderRadius: 30 * tmpWidth,
        backgroundColor: 'rgb(169,193,255)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    followingBox: {
        width: 64 * tmpWidth ,
        height: 25  * tmpWidth,
        borderRadius: 30 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8 * tmpWidth,
        borderColor: 'rgba(169,193,255,0.5)'
    },
})