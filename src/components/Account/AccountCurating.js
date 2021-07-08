import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { tmpWidth, tmpHeight } from '../FontNormalize';
import { Context as CurationContext } from '../../context/CurationContext';
import { SongImage } from '../SongImage'

const AccountCurating = ({ curating, myAccount, navigation }) => {
    curating.sort(function(a,b){
        if(a.time > b.time)  return -1;
        if(a.time  < b.time) return 1;
        return 0;           

    });
    const { getCuration } = useContext(CurationContext);

    return (
        <View style={myAccount ? styles.myAccount : styles.otherAccount}>
            <FlatList
                data={curating}
                keyExtractor={(song)=>song._id}
                contentContainerStyle={{paddingTop: 15 * tmpWidth}}
                renderItem={({item})=> {
                    return (
                        
                        <TouchableOpacity 
                            style={styles.curationBox}
                            onPress={async ()=>{
                                await getCuration({isSong : item.isSong,object:item.object,id:item.songoralbumid})
                                navigation.push('SelectedCuration', {id: item.songoralbumid})
                            }}
                        >
                            {item.isSong ?
                            <View style={{flexDirection: 'row'}}>                                
                                <SongImage url={item.object.attributes.artwork.url} size={79} border={79}/>
                                <View style={{marginLeft: 14 * tmpWidth}}>
                                    <View style={styles.infoBox}>
                                        <Text numberOfLines={1} style={{fontSize: 14 * tmpWidth, textAlign: 'center'}}>{item.object.attributes.name.substr(0,12)}{item.object.attributes.name.length>=12? '...' : null}</Text>
                                        <View style={{width:80*tmpWidth}}>
                                        <Text numberOfLines={1} style={{fontSize: 12 * tmpWidth , color: 'rgb(79,79,79)', marginLeft: 6 * tmpWidth}} >{item.object.attributes.artistName.substr(0, 15)}{item.object.attributes.artistName.length>=15? '...' : null }</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.contentText} numberOfLines={4}>{item.textcontent}</Text>
                                </View>
                            </View> : 
                            <View style={{flexDirection: 'row'}}>
                                <SongImage url={item.object.artwork.url} size={79} border={79}/>
                                <View style={{marginLeft: 14 * tmpWidth}}>
                                    <View style={styles.infoBox}>
                                        <Text numberOfLines={1} style={{fontSize: 14 * tmpWidth, textAlign: 'center'}}>{item.object.albumName.substr(0,12)}{item.object.albumName.length>=12? '...' : null }</Text>
                                        <View style={{width:80*tmpWidth}}>
                                        <Text numberOfLines={1} style={{fontSize: 12 * tmpWidth , color: 'rgb(79,79,79)', marginLeft: 6 * tmpWidth}}>{item.object.artistName.substr(0,15)}{item.object.artistName.length>=15 ? '...' : null }</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.contentText} numberOfLines={4}>{item.textcontent}</Text>
                                </View>
                            </View> }
                        </TouchableOpacity>
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
    infoBox: {
        alignItems: 'center', 
        flexDirection: 'row',
    },
    curationBox: {
        width: 336 * tmpWidth,
        height: 128 * tmpWidth,
        borderRadius: 16 * tmpWidth,
        shadowColor : "rgb(235,236,238)",
        shadowOffset: {
            height: 0 * tmpWidth,
            width: 0 * tmpWidth,
        },
        shadowRadius: 5 * tmpWidth,
        shadowOpacity : 0.7,
        paddingLeft: 14 * tmpWidth,
        justifyContent: 'center',
        marginBottom: 14 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        elevation: 5
    },
    contentText: {
        width: 200 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        lineHeight: 16 * tmpWidth, 
        fontSize: 11 * tmpWidth, 
        marginTop: 8 * tmpWidth
    }
});

export default AccountCurating;