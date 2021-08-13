import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { tmpWidth } from '../FontNormalize';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { push } from '../../navigationRef';
const AccountPlaylist = ({ playList }) => {
    playList.sort(function(a,b){
        if(a.time > b.time)  return -1;
        if(a.time  < b.time) return 1;
        return 0;           

    });
    const { getPlaylist } = useContext(PlaylistContext);

    return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 20 * tmpWidth}}>
            {playList.map((item) => {
                return (
                    <TouchableOpacity 
                        style={styles.postBox}
                        onPress={async ()=>{ 
                            await getPlaylist({id:item._id, postUserId:item.postUserId})
                            push('SelectedPlaylist', {id: item._id , postUser: item.postUserId})
                        }}
                        key={item._id}
                    >
                        <View style={{alignItems: 'center'}}>
                            <View style={styles.thumbnail}>
                                <Image  style={{height:'100%', width:'100%', borderRadius: 8 * tmpWidth}} source={{url:item.image}} />
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
                )
           })}
         </View>

    );
};

const styles=StyleSheet.create({
    postBox: {
        height:223*tmpWidth, 
        width:161*tmpWidth, 
        marginTop: 14 * tmpWidth,
        marginRight: 12 * tmpWidth
    },
    thumbnail: {
        width: 161 * tmpWidth ,
        height: 157 * tmpWidth,
        borderRadius: 8 * tmpWidth
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