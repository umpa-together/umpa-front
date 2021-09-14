import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';

export default SearchBox = () => {
    return (
        <TouchableOpacity style={styles.inputbox} onPress={() => navigate('Search')}>
            <View style={styles.flexRow}>
                <Image source={require('assets/icons/mainSearch.png')} style={styles.icon} />
                <Text style={styles.placeholder}>계정, 곡, 해시태그를 입력해주세요</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    inputbox:{
        width: 339 * tmpWidth,
        height: 40 * tmpWidth,
        backgroundColor: '#ffffff',
        borderRadius: 10 * tmpWidth,
        borderWidth: 1.5 * tmpWidth,
        borderColor: '#8bc0ff',
        marginTop: 22 * tmpWidth,
        justifyContent: 'center',
        marginLeft: 18 * tmpWidth
    },
    flexRow: {
        flexDirection: 'row', 
        alignItems:'center'
    },
    placeholder: {
        color: 'rgba(139,192,255,0.5)', 
        fontSize: 14 * tmpWidth, 
        fontWeight: '400'
    },
    icon: {
        width: 34 * tmpWidth,
        height: 34 * tmpWidth,
    }
})