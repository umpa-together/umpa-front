import React, { useContext, useState,useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated , Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import { Context as CurationContext } from 'context/CurationContext';
import { tmpWidth } from 'components/FontNormalize';
import { push } from 'navigationRef';
import { Context as DailyContext } from '../../context/DailyContext'
import LinearGradient from 'react-native-linear-gradient';
import SvgUri from 'react-native-svg-uri';

const Curating = ({ curationPosts }) => {
    const { state, addDaily, editDaily, getDaily,getAllDailys } = useContext(DailyContext);
    const scrollX = useRef(new Animated.Value(0)).current;

 


    return (
        <View style={{ flex: 1, backgroundColor:"rgb(254,254,254)"}}>
            { curationPosts != undefined && curationPosts.length !=0 ?
            
                <View style={{width: '100%', height:240 * tmpWidth}}>
                 <TouchableOpacity onPress={()=>{ getAllDailys(); }}>
                    <Text>데일리불러오기</Text>
                </TouchableOpacity>                   
                <Animated.FlatList
                    data={state.allDailys}
                    keyExtractor = {playlists => playlists._id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={344*tmpWidth }
                    decelerationRate={0}
                    bounces={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={{paddingLeft: 18 * tmpWidth, paddingRight: 6 * tmpWidth}}
                    onScroll = {Animated.event(
                        [{ nativeEvent: {contentOffset: {x: scrollX } } }]
                    )}
                    renderItem={({item})=> {
                        return (
                            <TouchableOpacity style={styles.playlistitem} onPress={async () => {
                                await getDaily({id:item._id, postUserId:item.postUserId._id})
                                push('SelectedDaily', {id: item._id, postUser: item.postUserId._id})
                            }}>
                                <View style={{position:'absolute', width:'100%', height:'100%'}} >
                                    <Image style ={{height:'100%', width:'100%', borderRadius: 8 * tmpWidth}} source ={{uri:item.image[0]}}/>
                                </View>
                                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)','rgba(0,0,0,0.1)' ]} style={styles.playlistitem2}>
                                <View style={{flexDirection:'row' ,width:331 * tmpWidth, height:40 * tmpWidth}}>
                                    <View style={styles.playlistprofile}>
                                        {item.postUserId.profileImage == null ?
                                        <View style={{width:20 * tmpWidth, height:20 * tmpWidth, borderRadius:12 * tmpWidth, backgroundColor:'#fff'}}>
                                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />

                                        </View>
                                         :
                                        <Image style={{width:20 * tmpWidth, height:20 * tmpWidth, borderRadius:12 * tmpWidth}} source={{uri: item.postUserId.profileImage}} />}
                                    </View>
                                    <Text style={styles.playlistusertext}>{item.postUserId.name}</Text>
                                </View>
                                <View style={styles.playlistinfo}>
                                    <Text style={{fontSize:14 * tmpWidth,color:"#fff", marginRight:12 * tmpWidth,fontWeight:'bold', marginBottom:tmpWidth*4}}>{item.title}</Text>
                                    <Text style={{fontSize:12 *tmpWidth, color:'rgba(255,255,255,0.8)',marginRight:12 * tmpWidth, marginBottom:tmpWidth*8}}>{item.hashtag.map(hashtag => ' #'+hashtag+'')}</Text>
                                </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View> : null }
        </View>
    );
};

const styles=StyleSheet.create({
    curation:{
        height:180 * tmpWidth,
        width:350 * tmpWidth,
        marginBottom:8 * tmpWidth,
    },
    contentl:{
        backgroundColor : "#ffffff",
        borderRadius:8 * tmpWidth,
        shadowColor : "rgb(235,236,238)",
        shadowRadius: 5* tmpWidth ,
        shadowOffset:{height:0,},
        shadowOpacity : 1,
        width : 334 * tmpWidth,
        height : 144 * tmpWidth,
        marginRight: 21 * tmpWidth,
        marginLeft:20 * tmpWidth ,
        marginTop:25 * tmpWidth,
    },
    songinfol:{
        width : 250* tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:21 * tmpWidth,
    },
    postuserl:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
        marginBottom:13 * tmpWidth,
        marginTop:9 * tmpWidth
    },

    albumcontentl:{
        backgroundColor : "#ffffff",
        borderRadius:8* tmpWidth,
        shadowColor : "rgb(235,236,238)",
        shadowRadius: 5* tmpWidth ,
        shadowOffset:{height:0,},
        shadowOpacity : 1,
        width : 334 * tmpWidth,
        height : 144 * tmpWidth,
        marginRight: 21 * tmpWidth,
        marginLeft:20 * tmpWidth ,
        marginTop:25 * tmpWidth,
    },
    albuminfol:{
        width : 250* tmpWidth,

        flexDirection: 'row',
        alignItems: 'center',
        marginTop:21 * tmpWidth,
     },
    postuserlalbum:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
        marginBottom:13 * tmpWidth,
        marginTop:9 * tmpWidth
    },

    contentr:{
        backgroundColor : "#ffffff",
        borderRadius:8* tmpWidth,
        shadowColor : "rgb(235,236,238)",
        shadowRadius: 5* tmpWidth ,
        shadowOffset:{height:0,},
        shadowOpacity : 1,
        width : 334 * tmpWidth,
        height : 144 * tmpWidth,
        marginRight: 21 * tmpWidth,
        marginLeft:20 * tmpWidth ,
        marginTop:25 * tmpWidth,
    },
    songinfor:{
        width : 250* tmpWidth,
        flexDirection: 'row',
        marginTop:21 * tmpWidth,
        alignItems: 'center',
    },

    albuminfor:{
        backgroundColor : "#ffffff",
        borderRadius:8* tmpWidth,
        shadowColor : "rgb(235,236,238)",
        shadowRadius: 5* tmpWidth ,
        shadowOffset:{height:0,},
        shadowOpacity : 1,
        width : 334 * tmpWidth,
        height : 144 * tmpWidth,
        marginRight: 21 * tmpWidth,
        marginLeft:20 * tmpWidth ,
        marginTop:25 * tmpWidth,
    },

});

export default Curating;