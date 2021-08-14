import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';
import SvgUri from 'react-native-svg-uri';

export default SearchBar = () => {
    return (
        <TouchableOpacity style={styles.inputbox} onPress={() => navigate('Search', { searchOption: 'Song' })}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <SvgUri width='16' height='15' source={require('../../assets/icons/mainSearch.svg')} style={styles.icon}/>
                <Text style={{color:'#c6c6c6', fontSize: 14 * tmpWidth}}>곡, 아티스트 또는 해시태그를 검색해주세요</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    inputbox:{
        width: 325 * tmpWidth,
        height: 44 * tmpWidth,
        backgroundColor: '#F5F5F5',
        borderRadius: 10 * tmpWidth,
        paddingTop: 14 * tmpWidth
    },
    icon: {
        marginRight: 12 * tmpWidth,
        marginLeft: 12 * tmpWidth
    }
})