import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
import { navigate } from '../../navigationRef';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import MainSongForm from '../../components/Search/MainSongForm';
import MainDJForm from '../../components/Search/MainDJForm';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';

const MainSearchScreen = ({navigation}) => {
    const [category, setCategory] = useState('Song');

    return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
        <View >
            <View style={styles.searchopt}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setCategory('Song')}>
                        {category == 'Song' ? <Text style={{fontSize: 22 * tmpWidth, marginRight: 18 * tmpWidth,color:'rgb(0,0,0)'}}>SONG</Text>
                        : <Text style={{fontSize: 24 * tmpWidth, marginRight: 18 * tmpWidth, color: '#C1C3D1'}}>SONG</Text> }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCategory('DJSong')}>
                        {category == 'DJSong' ? <Text style={{fontSize: 22 * tmpWidth, color:'rgb(0,0,0)'}}>DJ</Text>
                        : <Text style={{fontSize: 24 * tmpWidth, color: '#c6c6c6'}}>DJ</Text> }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{alignItems: 'center',width: 375 * tmpWidth, height: 64 * tmpWidth, }}>
                <TouchableOpacity style={styles.inputbox} onPress={() => navigate('Search', { searchOption: category})}>
                    <View style={{flexDirection: 'row', alignItems:'center',}}>
                        <FontAwesome style={{fontSize: 18 * tmpWidth, color:'#c6c6c6',marginTop:14 * tmpWidth,marginLeft:12 * tmpWidth, marginRight:12 * tmpWidth}} name="search"/>
                        {category == 'Song' ? <Text style={{color:'#c6c6c6', fontSize: 16 * tmpWidth, marginTop:14 * tmpWidth,}}>곡, 아티스트 또는 해시태그를 검색해주세요</Text>
                        : <Text style={{color:'#c6c6c6', fontSize: 16 * tmpWidth,marginTop:14 * tmpWidth, }}>곡, 아티스트 또는 DJ를 검색해주세요</Text>}
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{height:590 * tmpHeight}}>
            {category == 'Song' ? <MainSongForm /> : <MainDJForm navigation={navigation}/> }
            </View>
        </View>
    </SafeAreaView>
    )
}

MainSearchScreen.navigationOptions = () =>{
    return {
        headerShown: false,
    };
};

const styles=StyleSheet.create({
    searchopt:{
        marginTop : tmpWidth*20,
        flexDirection: 'row',
        width:100* tmpWidth,
        height:22 * tmpWidth,
        marginBottom:13 * tmpWidth,
        marginLeft:24 * tmpWidth
    },
    inputbox:{
        width: 325 * tmpWidth,
        height: 44 * tmpWidth,
        backgroundColor: '#F5F5F5',
        borderRadius: 10 * tmpWidth
    },
});

export default MainSearchScreen;