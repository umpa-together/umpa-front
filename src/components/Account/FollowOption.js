import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';

export default FollowOption = ({ type, setType, user }) => {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => setType('following')} 
                style={type == 'following' ? 
                [styles.option, styles.activeOption] : styles.option}
            >
                <Text 
                    style={type == 'following' ? 
                    [styles.text, styles.active] : styles.text}
                >
                    팔로잉 {user.following.length}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => setType('follower')} 
                style={type == 'follower' ? 
                [styles.option, styles.activeOption] : styles.option}
            >
                <Text 
                    style={type == 'follower' ? 
                    [styles.text, styles.active] : styles.text}
                >
                    팔로워 {user.follower.length}
                </Text>
            </TouchableOpacity>
        </View> 
    )
}

const styles=StyleSheet.create({
    container:{
        width: '100%',
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: '#ececec',
        flexDirection: 'row',
        height: 44 * tmpWidth,
    },
    active: {
        color: '#8bc0ff', 
        marginBottom: -2 * tmpWidth
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeOption: {
        borderBottomColor: '#8bc0ff',
        borderBottomWidth: 2 * tmpWidth,
    },
    text: {
        fontSize: 14 * tmpWidth,
        color: '#aaaaaa'
    }
})