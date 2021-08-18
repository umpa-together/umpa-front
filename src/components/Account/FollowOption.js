import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';

export default FollowOption = ({ type, setType, user }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.flexBox}>
                    <TouchableOpacity 
                        onPress={() => setType('following')} 
                        style={type == 'following' ? styles.selectedFollowContainer : styles.followContainer}
                    >
                        <Text style={type == 'following' ? styles.selectedType : styles.notSelectedType}>
                            팔로잉 {user.following.length}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setType('follower')} 
                        style={type == 'follower' ? styles.selectedFollowContainer : styles.followContainer}
                    >
                        <Text style={type == 'follower' ? styles.selectedType : styles.notSelectedType}>
                            팔로워 {user.follower.length}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback> 
    )
}

const styles=StyleSheet.create({
    container:{
        width: '100%',
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgba(153,153,153,0.2)',
        marginTop: 26  * tmpWidth,
        flexDirection: 'row',
    },
    selectedFollowContainer: {
        paddingLeft: 18 * tmpWidth,
        paddingRight: 18  * tmpWidth,
        paddingBottom: 10  * tmpWidth,
        borderBottomWidth: 2 * tmpWidth,
        borderBottomColor: 'rgb(169,193,255)'
    },
    followContainer: {
        paddingLeft: 18 * tmpWidth,
        paddingRight: 18 * tmpWidth,
        paddingBottom: 10 * tmpWidth
    },
    flexBox: {
        marginLeft: 12 * tmpWidth,
        flexDirection: 'row'
    },
    selectedType: {
        fontSize: 14 * tmpWidth,
    },
    notSelectedType: {
        fontSize: 14 * tmpWidth,
        color: 'rgba(153,153,153,0.4)'
    },
})