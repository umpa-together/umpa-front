import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { tmpWidth } from '../FontNormalize'

export default Menu = ({ user, menu, setMenu }) => {
    const onClickPlaylist = () => {
        setMenu('playlist')
    }
    const onClickCuration = () => {
        setMenu('curating')    
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={menu=='playlist' ? styles.selectedMenu : styles.notselectedMenu} 
                onPress={onClickPlaylist}
            >
                <Text style={menu=='playlist' ? styles.selectedText : styles.notSelectedText}>플레이리스트 {user.playlists.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={menu=='curating' ? styles.selectedMenu : styles.notselectedMenu} 
                onPress={onClickCuration}
            >
                <Text style={menu=='curating' ? styles.selectedText : styles.notSelectedText}>큐레이션 {user.curationposts.length}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: 20 * tmpWidth,
        paddingRight: 20 * tmpWidth,
        height: 44 * tmpWidth,
        backgroundColor: 'rgb(250,250,250)',
        borderBottomWidth : 1 * tmpWidth,
        borderColor: 'rgba(153,153,153,0.2)',
    },
    selectedMenu: {
        height: 28 * tmpWidth,
        borderBottomWidth: 1.4 * tmpWidth,
        borderBottomColor: 'rgba(25,25,25,1)',
        width: 160 * tmpWidth,
    },
    notselectedMenu: {
        height: 28 * tmpWidth,
        width: 160 * tmpWidth
    },
    selectedText: {
        fontWeight: '500',
        fontSize: 14 * tmpWidth,
        color: '#000', 
        textAlign: 'center'
    },
    notSelectedText: {
        fontSize: 14 * tmpWidth,
        color: 'rgba(25,25,25,0.5)', 
        textAlign: 'center'
    }
})