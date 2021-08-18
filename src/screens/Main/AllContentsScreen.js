import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import AllPlaylistForm from 'components/Main/AllPlaylistForm';
import AllCurationForm from 'components/Main/AllCurationForm';
import { goBack } from 'navigationRef';

const AllContentsScreen = ({ route }) => {
    const { type } = route.params
    return (
        <View style={styles.container}> 
            <View style={styles.headerContainer}>
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth}} onPress={goBack}>
                    <SvgUri width='40' height='40' source={require('assets/icons/back.svg')}/>
                </TouchableOpacity>
                <View style={{paddingTop: 10 * tmpWidth}}>
                    <Text style={{fontSize: 16 * tmpWidth, fontWeight: '400'}} numberOfLines={1}>{type} 둘러보기</Text>
                </View>
                <View style={{width: 40 * tmpWidth, height: 40 * tmpWidth, marginRight: 5 * tmpWidth}}/>
            </View>
            <View style={{backgroundColor: 'rgb(255,255,255)', flex: 1 }}>
                {type == '플레이리스트' ? <AllPlaylistForm /> : <AllCurationForm />}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1
    },
    headerContainer: {
        backgroundColor: 'rgb(255,255,255)',
        height: 92 * tmpWidth,
        flexDirection: 'row',
        paddingTop: 44 * tmpWidth,
        justifyContent: 'space-between'
    },
})

export default AllContentsScreen;