import React, { useContext } from 'react';
import { Text, View, StyleSheet,  FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';
import { Context as PlaylistContext } from '../../context/PlaylistContext';

const SelectedHashtagScreen = ({navigation}) => {
    const { getPlaylist } = useContext(PlaylistContext);
    const searchOption = navigation.getParam('searchOption');
    const data = navigation.getParam('data');
    const hashtag = navigation.getParam('text')
    return (
        <SafeAreaView style={{height:812 * tmpHeight, backgroundColor:"#fff"}}>
        {searchOption =='Hashtag' ?
            <View>
                <View style={styles.header}>
                    <View style={{ height:40 * tmpWidth, width:375/4 * tmpWidth,}}>
                        <TouchableOpacity style={styles.backicon} onPress={()=>navigation.pop()}>
                            <View style={{height:'100%', width:'100%', }}>
                                <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('../../assets/icons/back.svg')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: 375/2 * tmpWidth, height:50 * tmpWidth,justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:18 * tmpWidth}}>{'#'+hashtag}</Text>
                    </View>
              </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginTop:2 * tmpWidth, color:'rgba(93,93,93,1)',fontSize:14 * tmpWidth}}>플레이리스트</Text>
                </View>
                <View style={styles.result}>
                    <FlatList
                        contentContainerStyle={{paddingBottom: 30 * tmpWidth}}
                        numColumns={2}
                        data ={data.playlistId}
                        keyExtractor = {playlist => playlist._id}
                        renderItem = {({item}) => {
                            return (
                                <View style={{width:161 * tmpWidth, marginRight:14 * tmpWidth, marginBottom:10 * tmpWidth}}>
                                    <TouchableOpacity onPress={async () => {
                                        await getPlaylist({id:item._id, postUserId:item.postUserId})
                                        navigation.push('SelectedPlaylist', {id: item._id, navigation: navigation, postUser: item.postUserId})
                                    }}>
                                        <View style={{width: 161 * tmpWidth, height: 157 * tmpWidth, borderRadius:8 * tmpWidth, marginBottom: 10 * tmpWidth}}>
                                            <Image style={ {width:'100%', height:'100%', borderRadius:8 * tmpWidth}} source={{url :item.image}}/>
                                        </View>
                                        <View style={{width:161 * tmpWidth}}>
                                            <Text numberOfLines ={2} style={{fontSize: 14 * tmpWidth, color:"rgba(79,79,79,1)"}}>{item.title}</Text>
                                        </View>
                                        <View style={{width:161 * tmpWidth, flexDirection:'row', marginTop: 8 * tmpWidth}}>
                                        <Text numberOfLines ={1} style={{fontSize:12 * tmpWidth, color:'rgba(153,153,153,1)',}}>
                                        {item.hashtag.map((hashtag,index) => {
                                             return (
                                                 <Text style={{fontSize:12 * tmpWidth, color:'rgba(153,153,153,1)', marginRight:6 * tmpWidth}}>{'#'+hashtag}  </Text>
                                             )})}
                                        </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </View> : null }
        </SafeAreaView>
    )
};
SelectedHashtagScreen.navigationOptions = () =>{
    return {
            headerShown: false,

    };
};


const styles=StyleSheet.create({
    header:{
        alignItems:'center',
        width : 375 * tmpWidth,
        backgroundColor:'rgba(255,255,255,0)',
        flexDirection:'row',
    },
    backicon:{
        zIndex:2,
        height:40 * tmpWidth,
        width:40 * tmpWidth,
        marginLeft: 20 * tmpWidth
    },
    result:{
        width:375 * tmpWidth,
        height:700 * tmpHeight,
        marginTop:18 * tmpWidth,
        marginLeft:20 * tmpWidth,
    }
});


export default SelectedHashtagScreen;