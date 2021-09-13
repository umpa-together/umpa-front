import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { tmpWidth } from 'components/FontNormalize'

export default Menu = ({ menu, setMenu }) => {

    const onClickPlaylist = () => {
        setMenu('playlist')
    }
    const onClickDaily = () => {
        setMenu('daily')    
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={menu=='playlist' ? styles.activeMenu : styles.menu} 
                onPress={onClickPlaylist}
            >
                <Text 
                    style={[ styles.playlist, menu=='playlist' && styles.active ]}
                >
                    플레이리스트
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={menu=='daily' ? styles.activeMenu : styles.menu} 
                onPress={onClickDaily}
            >
                <Text 
                    style={[ styles.daily, menu=='daily' && styles.active ]}
                >
                    데일리
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#ffffff',
        borderBottomWidth : 1 * tmpWidth,
        borderColor: '#ececec',
        flex: 1
    },
    active: {
        color: '#8bc0ff', 
    },
    playlist: {
        fontWeight: '400',
        fontSize: 16 * tmpWidth,
        textAlign: 'center',
        color: '#aaaaaa', 
    },
    daily: {
        fontWeight: '500',
        fontSize: 16 * tmpWidth,
        textAlign: 'center',
        color: '#aaaaaa', 
    },
    activeMenu: {
        height: 36 * tmpWidth,
        borderBottomWidth: 2 * tmpWidth,
        borderBottomColor: '#8bc0ff',
        flex: 1,
        justifyContent: 'center',
    },
    menu: {
        height: 36 * tmpWidth,
        flex: 1,
        justifyContent: 'center',
    },
})