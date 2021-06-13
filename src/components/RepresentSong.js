import React, { useState, useRef, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated, FlatList, Image} from 'react-native'
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { navigate } from '../navigationRef';
import { tmpWidth } from './FontNormalize';
import TrackPlayer from 'react-native-track-player';
import HarmfulModal from './HarmfulModal';

const ImageSelect = ({url, opac}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        <Image style ={{borderRadius :100 * tmpWidth, opacity : opac , height:'100%', width:'100%'}} source ={{url:url}}/>
    );
};

const RepresentSong = ({ representModal, setRepresentModal, song, myAccount}) => {
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [type, setType] = useState('Each');
    const scrollX = useRef(new Animated.Value(0)).current;
    const [harmfulModal, setHarmfulModal] = useState(false);
    const onClose = async () => {
        setRepresentModal(false);
        setIsPlayingid('0');
        await TrackPlayer.reset()
    }

    const addtracksong= async ({data}) => {
        const track = new Object();
        track.id = data.id;
        track.url = data.attributes.previews[0].url;
        track.title = data.attributes.name;
        track.artist = data.attributes.artistName;
        if (data.attributes.contentRating != "explicit") {
            await TrackPlayer.reset()
            setIsPlayingid(data.id);
            await TrackPlayer.add(track)
            TrackPlayer.play();
        } else {
            setHarmfulModal(true);
        }
    };
    const stoptracksong= async () => {    
        setIsPlayingid('0');
        await TrackPlayer.reset()
    };
    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])
    return (
        <Modal
            isVisible={representModal}
            onBackdropPress={onClose}
            backdropOpacity={0.5}
            style={{justifyContent:'flex-end', margin:0}}
        >
            <View style={styles.representSongBox}>
                <View style={{ marginTop: 20 * tmpWidth ,justifyContent: 'center'}}>
                    <View style={{alignItems: 'center', flexDirection:'row'}}>
                        <Text style={{marginLeft:166 * tmpWidth,fontSize: 16 * tmpWidth, color: 'rgb(80,80,80)'}}>대표곡</Text>
                        <TouchableOpacity style={{width:30 * tmpWidth, marginLeft:130 * tmpWidth,height:30 * tmpWidth, }} onPress={()=> onClose()}>
                            <SvgUri width='100%' height='100%' source={require('../assets/icons/modalexit.svg')}/>
                        </TouchableOpacity>
                    </View>
                    { myAccount && type == 'Each' ? <TouchableOpacity onPress={() => {
                        onClose()
                        navigate('SongEdit', {'data': song})}}
                        style={styles.songedit}
                    >
                        <Text style={{fontSize: 14 * tmpWidth, color:'rgba(141,153,255,0.7)'}}>수정하기</Text>
                        <SvgUri width={18 * tmpWidth} height={18 * tmpWidth} source={require('../assets/icons/representchange.svg')}/>
                    </TouchableOpacity> : null }
                    { type != 'Each' ?
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 4 * tmpWidth }}>{song.length}곡</Text>
                    </View> : null }
                </View>
                {type == 'Each' ? 
                <View style={{marginTop: 20 * tmpWidth}}>
                    <Animated.FlatList 
                        data={song}
                        keyExtractor={song=>song.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false} 
                        snapToInterval={255*tmpWidth}
                        decelerationRate={0}
                        bounces={false}
                        scrollEventThrottle={16}
                        onScroll = {Animated.event(
                            [{ nativeEvent: {contentOffset: {x: scrollX } } }]
                        )}
                        contentContainerStyle={{paddingLeft: 60 * tmpWidth, paddingRight: 60 * tmpWidth, paddingTop: 20 * tmpWidth}}
                        renderItem={({item, index})=>{
                            const inputRange =[ 
                                (index-1) * (255 * tmpWidth),
                                index * (255 * tmpWidth),
                                (index+1) * (255 * tmpWidth),
                            ];
                            const translateY = scrollX.interpolate({
                                inputRange,
                                outputRange: [0, -20, 0]
                            })
                            return (
                                <Animated.View style={{
                                    width: 215  * tmpWidth,
                                    height: 289 * tmpWidth ,
                                    borderRadius: 16 * tmpWidth,
                                    backgroundColor: 'rgb(254,254,254)',
                                    marginLeft: 20 * tmpWidth,
                                    marginRight: 20 * tmpWidth,
                                    transform: [{translateY}]
                                }}>
                                    <View style={{alignItems: 'center'}}>
                                        <View style={{width: 150 * tmpWidth , flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                            {item.attributes.contentRating == "explicit" ? 
                                            <SvgUri width="17" height="17" source={require('../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth, paddingTop: 20 * tmpWidth, paddingBottom: 25 * tmpWidth}}/> 
                                            : null }
                                            <Text style={styles.representsongname} numberOfLines={1}>{item.attributes.name}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.representSongCover} onPress={() => {
                                            if(isPlayingid == item.id) {
                                                stoptracksong()
                                            }else{
                                                addtracksong({data:item})
                                            }
                                        }}>
                                            <ImageSelect opac={1.0} url={item.attributes.artwork.url}/>
                                            { isPlayingid != item.id ? 
                                            <SvgUri width='50' height='50' source={require('../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> :
                                            <SvgUri width='50' height='50' source={require('../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 42 * tmpWidth, top: 42 * tmpWidth}}/> }
                                        </TouchableOpacity>
                                        {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                        <View style={{width: 180 * tmpWidth}}>
                                            <Text style={{fontSize: 14 * tmpWidth, marginTop: 29 * tmpWidth, textAlign: 'center'}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                        </View>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(118,118,118)', marginTop: 7 * tmpWidth, textAlign: 'center' }}>{item.attributes.releaseDate}</Text>
                                    </View>
                                </Animated.View>
                            )
                        }}

                    /> 
                    <View style={{alignItems: 'center', marginTop: 14 * tmpWidth}}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(153,153,153)' }}>{song.length}곡</Text>
                    </View>
                        <TouchableOpacity style={styles.representlistbutton} onPress={() => {
                            setType('List')}}>
                            <SvgUri width={18 * tmpWidth} height={18 * tmpWidth} source={require('../assets/icons/representlist.svg')}/>
                            <Text style={{fontSize: 11 * tmpWidth, color: 'rgb(153,153,153)',}}>목록보기</Text>
                        </TouchableOpacity>
                    </View>
                </View> :
                <View>
                    <View style={styles.line}/>
                    <View style={{height: 335 * tmpWidth }}>
                        <FlatList
                            data={song}
                            keyExtractor={song=>song.attributes.name}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.listBox}>
                                        <TouchableOpacity style={styles.listSongCover} onPress={() => {
                                            if(isPlayingid == item.id){
                                                stoptracksong()
                                            }else{
                                                addtracksong({data: item})
                                            }
                                        }}>
                                            <ImageSelect opac={1.0} url={item.attributes.artwork.url}/>
                                            { isPlayingid != item.id ? 
                                            <SvgUri width='27' height='27' source={require('../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                            <SvgUri width='27' height='27' source={require('../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                        </TouchableOpacity>
                                        {harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                        <View style={{marginLeft: 17 * tmpWidth, width: 250 * tmpWidth }}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                {item.attributes.contentRating == "explicit" ? 
                                                <SvgUri width="17" height="17" source={require('../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                : null }
                                                <Text style={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                            </View>
                                            <Text style={{fontSize:11 * tmpWidth , color: 'rgb(148,153,163)', marginTop: 4.8 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => {
                        setType('Each')}} >
                        <Text style={{fontSize: 11 * tmpWidth, color: 'rgb(153,153,153)', marginTop: 15 * tmpWidth}}>개별 보기</Text>
                    </TouchableOpacity>
                </View> }
            </View>
        </Modal>
    )
};

const styles=StyleSheet.create({
    representSongBox: {
        height:463 * tmpWidth ,
        backgroundColor: 'rgb(250,250,250)', 
        borderTopRightRadius: 16 * tmpWidth,
        borderTopLeftRadius: 16 * tmpWidth,
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0 * tmpWidth,
            width: 0 * tmpWidth,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
    },
    songBox: {
        width: 215  * tmpWidth,
        height: 289 * tmpWidth ,
        borderRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)' 
    },
    representSongCover: {
        width: 134 * tmpWidth ,
        height: 134  * tmpWidth,
        borderRadius: 134 * tmpWidth,
    },
    listBox: {
        height: 57 * tmpWidth ,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20 * tmpWidth ,
        marginTop: 12 * tmpWidth
    },
    listSongCover:{
        width: 57 * tmpWidth,
        height: 57  * tmpWidth,
        borderRadius: 57 * tmpWidth,
    },
    songedit:{
        height:16 * tmpWidth,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    representsongname:{
        fontSize: 18 * tmpWidth,
        fontWeight: 'bold',
        paddingTop: 20  * tmpWidth,
        paddingBottom: 25 * tmpWidth,
    },
    representlistbutton:{
        width:50 * tmpWidth,
        height:18 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:4 * tmpWidth
    },
    line:{
        borderBottomWidth: 0.7 * tmpWidth,
        borderColor: 'rgb(229,231,239)',
        marginTop: 5.3  * tmpWidth,
        marginLeft: 37  * tmpWidth,
        marginRight: 37 * tmpWidth
    },
});

export default RepresentSong;