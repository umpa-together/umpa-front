import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { tmpWidth } from 'components/FontNormalize'
import { push } from 'navigationRef';

export default Information = ({ user, followerNum }) => {
    const { name, introduction, following, follower, realName } = user
    const onClickFollowing = () => {
        push('Follow', {name, type: 'following'})
    }

    const onClickFollower = () => {
        push('Follow', {name, type: 'follower'})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            { realName &&
            <Text style={styles.realName}>{realName}</Text> }
            <Text style={styles.introduction}>{introduction}</Text>
            <View style={styles.flexRow}>
                <TouchableOpacity 
                    style={styles.flexRow}
                    onPress={onClickFollowing}
                >
                    <Text style={styles.follow}>팔로잉</Text>
                    <Text style={styles.number}>{following.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.flexRow}
                    onPress={onClickFollower}
                >
                    <Text style={styles.follow}>팔로워</Text>
                    <Text style={styles.number}>{followerNum !== undefined ? followerNum : follower.length}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginLeft: 27 * tmpWidth,
        marginTop: 13 * tmpWidth
    },
    name: {
        fontSize: 16 * tmpWidth,
        marginBottom: 8 * tmpWidth
    },
    introduction: {
        fontSize: 13 * tmpWidth,
        fontWeight: '400',
        color: '#686868',
        lineHeight: 18 * tmpWidth,
        marginBottom: 12 * tmpWidth
    },
    follow: {
        fontSize: 13 * tmpWidth,
        fontWeight: '400',
        color: '#191919'
    },
    number: {
        marginLeft: 4 * tmpWidth,
        marginRight: 16 * tmpWidth,
        fontSize: 14 * tmpWidth,
        fontWeight: '700',
        color: '#191919',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    realName: {
        fontWeight: '400',
        fontSize: 13 * tmpWidth,
        marginBottom: 8 * tmpWidth
    }
})