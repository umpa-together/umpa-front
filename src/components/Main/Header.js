import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { StatusBarHeight } from 'components/StatusBarHeight'
import { tmpWidth } from 'components/FontNormalize';
import { navigate } from 'navigationRef'

export default Header = () => {
    
    const onClickNotice = () => {
        navigate('Notice')
    }

    const onClickChat = () => {

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>환영합니다</Text>
            <View style={styles.flexRow}>
                <TouchableOpacity 
                    style={styles.icon}
                    onPress={onClickNotice}
                >
                    <Text>알림</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Text>chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container: {
        width: '100%', 
        height: (46 + StatusBarHeight) * tmpWidth, 
        paddingTop: StatusBarHeight * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24 * tmpWidth,
        marginTop: 8 * tmpWidth,
        paddingLeft: 18 * tmpWidth
    },
    icon: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        borderWidth: 1,
        marginRight: 8 * tmpWidth
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})