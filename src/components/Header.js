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

export const NavHeader = ({ title, isBack = false }) => {
    return (
        <View style={styles.navContainer}>
            <Text style={styles.title}>{title}</Text>
            {isBack &&
            <TouchableOpacity style={styles.back} onPress={goBack}>
                <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('../assets/icons/back.svg')}/>
            </TouchableOpacity>}
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%', 
        height: (48 + StatusBarHeight) * tmpWidth, 
        paddingTop: StatusBarHeight * tmpWidth,
        backgroundColor: 'rgb(254,254,254)' 
    },
    navContainer: {
        width: '100%',
        height: (48 + StatusBarHeight) * tmpWidth, 
        paddingTop: StatusBarHeight * tmpWidth,
        backgroundColor: 'rgb(255, 255, 255)',
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: 3  * tmpWidth,
            width: 0,
        },
        shadowRadius: 8  * tmpWidth,
        shadowOpacity: 0.07,
    },
    title: {
        textAlign: 'center', 
        fontSize: 18 * tmpWidth, 
        paddingTop: 18 * tmpWidth
    },
    back: {
        position: 'absolute',
        left: 5 * tmpWidth, 
        top: (2 + StatusBarHeight) * tmpWidth
    }
})