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

const AccountCurating = ({ curating }) => {
    const { getCuration } = useContext(CurationContext);
    return (
        <View style={{height:600 * tmpHeight,paddingLeft:41*tmpWidth}}>
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
                                        <Text numberOfLines={1} style={{fontSize: 14 * tmpWidth }}>{item.object.attributes.name}</Text>
                                        <Text  numberOfLines={1} style={{fontSize: 12 * tmpWidth , color: 'rgb(148,153,163)', marginTop: 4 * tmpWidth  }}>{item.object.attributes.artistName}</Text>
                                    </View>
                                </View> : 
                                <View>
                                    <View style={styles.songs}>
                                        <Imagetake url={item.object.artwork.url}/>
                                    </View>
                                    <View style={styles.infoBox}>
                                        <Text numberOfLines={1} style={{fontSize: 14 * tmpWidth }}>{item.object.albumName}</Text>
                                        <Text numberOfLines={1} style={{fontSize: 12 * tmpWidth , color: 'rgb(148,153,163)', marginTop: 4 * tmpWidth  }}>{item.object.artistName}</Text>
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