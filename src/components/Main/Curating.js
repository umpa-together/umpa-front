import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Context as CurationContext } from '../../context/CurationContext';
import { tmpWidth } from '../FontNormalize';
import Guide from '../Guide';
import { SongImage } from '../SongImage'

const Curating = ({ curationPosts, navigation }) => {
    const { state, getCurationposts, nextCurationposts, getCuration } = useContext(CurationContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        if(curationPosts.length >= 20 && !state.notNext){
            setLoading(true);
            await nextCurationposts({ page: state.currentCurationPage });
            setLoading(false);
        }
    };

    const onEndReached = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };

    const fetchData = async () => {
        setRefreshing(true);
        await getCurationposts();
        setRefreshing(false);
    };

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor:"rgb(254,254,254)"}}>
            <Guide type={'curation'}/>
            { curationPosts != undefined && curationPosts.length !=0 ?
            <FlatList
                data={curationPosts}
                keyExtractor={(curation)=>curation._id}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListFooterComponent={loading && <ActivityIndicator />}
                renderItem={({item, index})=> {
                    console.log(item.anonymous)
                    return (
                    
                        <TouchableOpacity style ={styles.curation} onPress={async ()=>{
                            await getCuration({isSong : item.isSong,object:item.object,id:item.songoralbumid})
                            navigation.push('SelectedCuration', {id: item.songoralbumid, postid:item._id})
                        }}>
                        {(index+1) % 2 == 0 ?
                            <View>
                                {item.isSong ? 
                                <View style={{flexDirection: 'row',}}>
                                    <View style={{position :"absolute", zIndex:1,left:-89 * tmpWidth, top:3 * tmpWidth, width:190 * tmpWidth, height:190 * tmpWidth,shadowColor : "rgb(0,0,0)",   shadowRadius: 6*tmpWidth, shadowOffset:{height:1*tmpWidth, }, shadowOpacity : 0.13, elevation: 5}}>
                                        <SongImage url={item.object.attributes.artwork.url} size={190} border={190}/>
                                    </View> 
                                    <View style={styles.contentl}>
                                        <View style={styles.songinfol}>
                                            <Text numberOfLines ={1} style={{marginLeft: 113 * tmpWidth, fontSize:14 * tmpWidth}}>{item.object.attributes.name.substr(0,15)}{item.object.attributes.name.length>=15? '...' : null}</Text>
                                            <View style={{width:80*tmpWidth}}>
                                            <Text numberOfLines ={1} style={{fontSize:12 * tmpWidth,marginLeft: 16 * tmpWidth, }}>{item.object.attributes.artistName.substr(0, 15)}{item.object.attributes.artistName.length>=15? '...' : null }</Text>
                                            </View>                                       
                                        </View>
                                        <View style ={{ marginLeft:113 * tmpWidth, width : 200 * tmpWidth, height:63 * tmpWidth}}>
                                            <Text numberOfLines ={3}  style={{color: 'rgb(93,93,93)', fontSize: tmpWidth*12, lineHeight:16*tmpWidth, marginTop: 9 * tmpWidth}}>{item.textcontent}</Text>
                                        </View>
                                        <View style={styles.postuserl}>
                                            <Text style={{color: 'rgb(128,128,128)',marginRight:20 * tmpWidth, fontSize: 12 * tmpWidth }}>By {item.postUserId.name}</Text>
                                        </View>
                                    </View>
                                </View> : 
                                <View  style={{flexDirection: 'row'}}>
                                    <View style={{position :"absolute", zIndex:1,left:-89 * tmpWidth, top:3 * tmpWidth,  width: 190 * tmpWidth, height:190 * tmpWidth,shadowColor : "rgb(0,0,0)",   shadowRadius: 6*tmpWidth, shadowOffset:{height:1*tmpWidth, }, shadowOpacity : 0.13, elevation: 5}}>
                                        <SongImage url={item.object.artwork.url} size={190} border={190}/>
                                    </View> 
                                    <View style={styles.albumcontentl}>
                                        <View style={styles.albuminfol}>
                                            <Text numberOfLines ={1}  style={{marginLeft: 113 * tmpWidth, fontSize:14 * tmpWidth}}>{item.object.albumName.substr(0, 15)}{item.object.albumName.length>=15 ? '...' : null}</Text>
                                            <View style={{width:80*tmpWidth}}>
                                            <Text numberOfLines ={1}  style={{fontSize:12 * tmpWidth,marginLeft: 16 * tmpWidth}}>{item.object.artistName.substr(0, 15)}{item.object.artistName.length>=15 ? '...' : null}</Text>
                                            </View>
                                        </View>
                                        <View style ={{width : 200 * tmpWidth, marginLeft:113 * tmpWidth, height:63 * tmpWidth}}>
                                            <Text numberOfLines ={3} style={{ color: 'rgb(93,93,93)', fontSize: tmpWidth*12, lineHeight:16*tmpWidth, marginTop: 9 * tmpWidth, marginRight:20 * tmpWidth}}>{item.textcontent}</Text>
                                        </View>
                                        <View style={styles.postuserlalbum}>
                                            <Text style={{color: 'rgb(128,128,128)',marginRight:20 * tmpWidth, fontSize: 12 * tmpWidth}}>By {item.postUserId.name}</Text>
                                        </View>
                                    </View>
                                </View> }   
                            </View> :
                            <View>
                                {item.isSong ?
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{position :"absolute",zIndex:1, left:289 * tmpWidth, top:3 * tmpWidth,  width:190 * tmpWidth, height:190 * tmpWidth,shadowColor : "rgb(0,0,0)",   shadowRadius: 6*tmpWidth, shadowOffset:{height:1*tmpWidth, }, shadowOpacity : 0.13, elevation: 5}}>
                                        <SongImage url={item.object.attributes.artwork.url} size={190} border={190}/>
                                    </View>
                                    <View style={styles.contentr}>
                                        <View style={styles.songinfor}>
                                            <Text numberOfLines ={1} style={{fontSize:14 * tmpWidth,marginLeft: 32 * tmpWidth, marginRight:16 * tmpWidth}}>{item.object.attributes.name.substr(0,14)}{item.object.attributes.name.length>=14 ? '...':null}</Text>
                                            <View style={{width:90*tmpWidth}}>
                                            <Text numberOfLines ={1} style={{fontSize:12 * tmpWidth,color: '#000'}}>{item.object.attributes.artistName.substr(0, 15)}{item.object.attributes.artistName.length>=15 ? '...':null}</Text>
                                            </View>
                                        </View>
                                        <View style ={{width : 270 * tmpWidth, height:63 * tmpWidth}}>
                                            <Text numberOfLines ={3} style={{color: 'rgb(93,93,93)', fontSize: tmpWidth*12, lineHeight:16*tmpWidth, marginTop: 9 * tmpWidth, marginLeft: 32 * tmpWidth,marginRight:20 * tmpWidth}}>{item.textcontent}</Text>
                                        </View>
                                        <View style={{alignItems:'flex-end'}}>
                                            <Text numberOfLines ={1} style={{color: 'rgb(128,128,128)',marginRight:109 * tmpWidth, marginTop:9 * tmpWidth, fontSize: 12 * tmpWidth}}>By {item.anonymous ? '익명' :item.postUserId.name}</Text>
                                        </View>
                                    </View>
                                </View> :
                                <View  style={{flexDirection: 'row'}}>
                                    <View style={{position :"absolute",zIndex:1, left:289 * tmpWidth, top:3 * tmpWidth,  width:190 * tmpWidth, height:190 * tmpWidth,shadowColor : "rgb(0,0,0)",   shadowRadius: 6*tmpWidth, shadowOffset:{height:1*tmpWidth, }, shadowOpacity : 0.13, elevation: 5}}>
                                        <SongImage url={item.object.artwork.url} size={190} border={190}/>
                                    </View>
                                    <View style={styles.albuminfor}>
                                        <View style={{flexDirection: 'row', marginTop:21 * tmpWidth, alignItems: 'center'}}>
                                            <Text numberOfLines ={1} style={{fontSize:14 * tmpWidth,marginLeft: 32 * tmpWidth, marginRight:16 * tmpWidth}}>{item.object.albumName.substr(0, 15)}{item.object.albumName.length>=15? '...':null}</Text>
                                            <View style={{width:90*tmpWidth}}>
                                            <Text numberOfLines ={1} style={{fontSize:12 * tmpWidth, }}>{item.object.artistName.substr(0,15)}{item.object.artistName.length>=15 ? '...':null}</Text>
                                            </View>
                                        </View>
                                        <View style ={{width : 270 * tmpWidth, height:63 * tmpWidth}}>
                                            <Text numberOfLines ={3} style={{color: 'rgb(93,93,93)', fontSize: tmpWidth*12, lineHeight:16*tmpWidth, marginTop: 9 * tmpWidth, marginLeft: 32 * tmpWidth,marginRight:20 * tmpWidth}}>{item.textcontent}</Text>
                                        </View>
                                        <View style={{alignItems:'flex-end'}}>
                                            <Text numberOfLines={1} style={{color: 'rgb(128,128,128)',marginRight:109 * tmpWidth, marginTop:9 * tmpWidth, fontSize: 12 * tmpWidth}}>By {item.anonymous ? '익명' :item.postUserId.name}</Text>
                                        </View>
                                    </View>
                                </View> }
                            </View> }
                        </TouchableOpacity>
                    )
                }}
            /> : 
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text style={{color: 'rgb(93,93,93)'}}>팔로우한 사람이 올린 큐레이션이 없습니다.</Text>
                <Text style={{color: 'rgb(93,93,93)', marginTop: 10 * tmpWidth}}>다른 사람들을 팔로우 해보세요!</Text>

                <TouchableOpacity 
                        style={{justiftyContent:'center', alignItems:'center',backgroundColor:'rgb(169,193,255)', borderRadius:20,width:80*tmpWidth,height: 30*tmpWidth,marginTop: 20*tmpWidth,}}
                        onPress={()=>{fetchData();}}
                        >
                            
                        <Text style={{color:'white',marginTop:8*tmpWidth}}>새로고침</Text>
                    </TouchableOpacity>
            </View> }
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
        elevation: 5
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
        elevation: 5
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
        elevation: 5
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
        elevation: 5
    },

});

export default Curating;