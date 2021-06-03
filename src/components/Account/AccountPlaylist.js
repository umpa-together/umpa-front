import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { tmpWidth, tmpHeight } from '../FontNormalize';

const AccountPlaylist = ({ playList, myAccount, navigation }) => {
    playList.sort(function(a,b){
        if(a.time > b.time)  return -1;
        if(a.time  < b.time) return 1;
        return 0;           

    });
    return (
        <View style={myAccount ? styles.myAccount : styles.otherAccount}>
            <FlatList
                numColumns={2}
                data ={playList}
                keyExtractor = {playlist => playlist._id}
                renderItem = {({item}) => {
                    return (
                        <View style={{ height:223*tmpWidth, width:161*tmpWidth, marginRight: 14* tmpWidth , marginTop: 14 * tmpWidth }}>
                            <TouchableOpacity onPress={()=>{ 
                                navigation.push('SelectedPlaylist', {id: item._id , postUser: item.postUserId})
                            }}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={styles.thumbnail}>
                                    <Image  style={{height:'100%', width:'100%', borderRadius: 4 * tmpWidth}} source={{url:item.image}} />
                                    </View>
                                    <View style={styles.titleBox}>
                                        <Text numberOfLines={2} style={{fontSize: 14 * tmpWidth, color: 'rgb(79,79,79)'}}>{item.title}</Text>
                                    </View>
                                    <View style={styles.hashtagBox}>
                                        { item.hashtag != undefined ? 
                                        <Text numberOfLines={1} style={{fontSize: 12 * tmpWidth, color:'rgb(153,153,153)', paddingRight: 6 * tmpWidth}}>{item.hashtag.map(item => {
                                            return '#'+item+'   '
                                        })}</Text> : null }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles=StyleSheet.create({
    myAccount: {
        height:600 * tmpHeight, 
        paddingLeft:20*tmpWidth, 
    },
    otherAccount: {
        height:660 * tmpHeight, 
        paddingLeft:20*tmpWidth, 
    },
    thumbnail: {
        width: 161 * tmpWidth ,
        height: 157 * tmpWidth,
        borderRadius: 4 * tmpWidth
    },
    titleBox: {
        width: 161 * tmpWidth ,
        marginTop: 10 * tmpWidth,
    },
    hashtagBox: {
        width: 161 * tmpWidth,
        marginTop: 8  * tmpWidth,
        flexDirection: 'row',
    }
});

export default AccountPlaylist;