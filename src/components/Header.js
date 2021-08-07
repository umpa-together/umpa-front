import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { tmpWidth } from './FontNormalize'
import { StatusBarHeight } from './StatusBarHeight'
import SvgUri from 'react-native-svg-uri'
import { goBack } from '../navigationRef'

export default Header = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.back} onPress={goBack}>
                <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('../assets/icons/back.svg')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%', 
        height: 48 * tmpWidth, 
        marginTop: StatusBarHeight * tmpWidth, 
    },
    title: {
        textAlign: 'center', 
        fontSize: 18 * tmpWidth, 
        paddingTop: 18 * tmpWidth
    },
    back: {
        position: 'absolute',
        left: 5 * tmpWidth, 
        top: 2 * tmpWidth
    }
})