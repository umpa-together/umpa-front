import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { navigate } from '../../navigationRef';
import { tmpWidth, tmpHeight } from '../FontNormalize';

const AccountPlaylist = ({ playList }) => {
    const { getPlaylist } = useContext(PlaylistContext);
    return (
        <View style={{height:600 * tmpHeight, paddingLeft:20*tmpWidth}}>
            <FlatList
                numColumns={2}
                data ={playList}
                keyExtractor = {playlist => playlist._id}
                renderItem = {({item}) => {
                    return (
                        <View style={{ height:223*tmpWidth, width:161*tmpWidth, marginRight: 14* tmpWidth , marginTop: 14 * tmpWidth }}>
                            <TouchableOpacity onPress={()=>{ 
                                getPlaylist({id:item._id, postUserId:item.postUserId})
                                navigate('SelectedPlaylist', {id: item._id , object:item})
                            }}>
                                <View style={{alignItems: 'center'}}>
                                    <View style={styles.thumbnail}>
                                    <Image  style={{height:'100%', width:'100%', borderRadius: 4 * tmpWidth}} source={{url:item.image}} />
                                    </View>
                                    <View style={styles.titleBox}>
                                        <Text numberOfLines={2} style={{fontSize: 14 * tmpWidth, color: 'rgb(79,79,79)'}}>{item.title}</Text>
                                    </View>
                                    <View style={styles.hashtagBox}>
                                        <Text numberOfLines={1} style={{fontSize: 12 * tmpWidth, color:'rgb(153,153,153)', paddingRight: 6 * tmpWidth}}>{item.hashtag.map(item => {
                                            return '#'+item+'   '
                                        })}</Text>
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