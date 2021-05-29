import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Context as CurationContext } from '../../context/CurationContext';
import { navigate } from '../../navigationRef';
import { tmpWidth, tmpHeight } from '../FontNormalize';

const Imagetake = ({url}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return <Image style ={{height:'100%', width:'100%', borderRadius: 100*tmpWidth}} source ={{url:url}}/>
};

const AccountCurating = ({ curating, myAccount }) => {
    curating.sort(function(a,b){
        if(a.time > b.time)  return -1;
        if(a.time  < b.time) return 1;
        return 0;           

    });
    const { getCuration } = useContext(CurationContext);
    return (
        <View style={myAccount ? styles.myAccount : styles.otherAccount}>
            <FlatList
                numColumns={2}
                data={curating}
                keyExtractor={(song)=>song._id}
                renderItem={({item})=> {
                    return (
                        <View style={{marginRight: 57 * tmpWidth , marginTop: 14 * tmpWidth  }}>
                            <TouchableOpacity onPress={()=>{
                                getCuration({isSong : item.isSong,object:item,id:item.songoralbumid})
                                navigate('SelectedCuration', {id: item.songoralbumid})
                            }}>
                                {item.isSong ?
                                <View>                                
                                    <View style={styles.songs}>
                                        <Imagetake url={item.object.attributes.artwork.url}></Imagetake>
                                    </View>
                                    <View style={styles.infoBox}>
                                        <Text style={{fontSize: 14 * tmpWidth, textAlign: 'center' }} numberOfLines={2}>{item.object.attributes.name}</Text>
                                        <Text style={{fontSize: 12 * tmpWidth , color: 'rgb(148,153,163)', marginTop: 4 * tmpWidth  }}>{item.object.attributes.artistName}</Text>
                                    </View>
                                </View> : 
                                <View>
                                    <View style={styles.songs}>
                                        <Imagetake url={item.object.artwork.url}/>
                                    </View>
                                    <View style={styles.infoBox}>
                                        <Text style={{fontSize: 14 * tmpWidth }}>{item.object.name}</Text>
                                        <Text style={{fontSize: 12 * tmpWidth , color: 'rgb(148,153,163)', marginTop: 4 * tmpWidth  }}>{item.object.artistName}</Text>
                                    </View>
                                </View> }
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
        paddingLeft:41*tmpWidth,
    },
    otherAccount: {
        height:660 * tmpHeight,
        paddingLeft:41*tmpWidth,
    },
    songs: {
        width: 118 * tmpWidth  ,
        height: 114 * tmpWidth  ,
        borderRadius: 100 * tmpWidth
    },
    infoBox: {
        justifyContent: 'center',
        alignItems: 'center', 
        marginTop: 10  * tmpWidth ,
        width: 118 * tmpWidth
    }
});

export default AccountCurating;