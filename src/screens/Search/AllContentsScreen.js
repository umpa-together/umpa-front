import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { tmpWidth } from '../../components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import AllPlaylistForm from '../../components/Search/AllPlaylistForm';
import AllCurationForm from '../../components/Search/AllCurationForm';

const AllContentsScreen = ({navigation}) => {
    const type = navigation.getParam('type')
    return (
        <View style={styles.container}> 
            <View style={styles.headerContainer}>
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth}} onPress={() => navigation.goBack()}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
                <View style={{paddingTop: 10 * tmpWidth}}>
                    <Text style={{fontSize: 16 * tmpWidth, fontWeight: '400'}} numberOfLines={1}>{type} 둘러보기</Text>
                </View>
                <View style={{width: 40 * tmpWidth, height: 40 * tmpWidth, marginRight: 5 * tmpWidth}}/>
            </View>
            <View style={{backgroundColor: 'rgb(255,255,255)', flex: 1 }}>
                {type == '플레이리스트' ? <AllPlaylistForm navigation={navigation}/> : <AllCurationForm navigation={navigation}/>}
            </View>
        </View>
    )
}

AllContentsScreen.navigationOptions = () =>{
    return {
        headerShown: false,
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1
    },
    headerContainer: {
        backgroundColor: 'rgb(255,255,255)',
        height: 48 * tmpWidth,
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 44 * tmpWidth : StatusBar.currentHeight * tmpWidth,
        justifyContent: 'space-between'
    },
})

export default AllContentsScreen;