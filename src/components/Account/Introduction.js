import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { tmpWidth } from '../FontNormalize'

export default Introduction = ({ user }) => {
    return (
        <>
            {user.introduction != '' &&
            <View style={styles.container}>
                <View style={styles.infoBox}>
                    <Text>{user.introduction}</Text>
                </View>
            </View> }   
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    infoBox: {
        width: 334 * tmpWidth ,
        marginTop: 15 * tmpWidth ,
    },
})