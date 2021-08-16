import React, { useState, useContext, useEffect } from 'react';
import { Text, Image, StyleSheet, View,ImageBackground, TouchableOpacity, FlatList,  SafeAreaView} from 'react-native';
import {Context as PlaylistContext} from '../../context/PlaylistContext';
import {Context as UserContext} from '../../context/UserContext';
import {Context as CurationContext} from '../../context/CurationContext';

import { navigate, push } from '../../navigationRef';
import SvgUri from 'react-native-svg-uri';
import Curating from  './Curating';
import Playlist from  './Playlist';
import { tmpWidth } from '../FontNormalize';
import Story from './Story';
import StoryProvider from '../../providers/story';
import StoryModal from './StoryModal';

const Feed = () => {
    const { state } = useContext(PlaylistContext);
    const { state: userState } = useContext(UserContext);
    const { state: curation } = useContext(CurationContext);
    const [result, setResult] = useState('playlist');

    return (
        <StoryProvider>
            <SafeAreaView style={{backgroundColor:"rgb(254,254,254)", flex: 1}}>
                <View style={styles.opt}>
                    <View style={styles.optleft}>
                        <TouchableOpacity style={styles.opt1} onPress={() => setResult('playlist')}>
                            {result == 'playlist' ? <Text style={{fontSize: 18 * tmpWidth}}>플레이리스트</Text> : <Text style={{fontSize: 18 * tmpWidth, color:'rgb(193,195,209)'}}>플레이리스트</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.opt2} onPress={() => setResult('curating')}>
                            {result == 'curating' ? <Text style={{fontSize: 18 * tmpWidth}}>큐레이션</Text> : <Text style={{fontSize: 18 * tmpWidth, color:'rgb(193,195,209)'}}>큐레이션</Text> }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.optright}>
                        {result == 'playlist' ?
                        <TouchableOpacity style={{marginRight:21.3 * tmpWidth, width:40 * tmpWidth, height:40 * tmpWidth}} onPress = {()=>navigate('Create', {'data': []})}>
                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/postplaylist.svg')} style={{ }}/>
                        </TouchableOpacity> :
                        <TouchableOpacity style={{marginRight:21.3 * tmpWidth,width:40 * tmpWidth, height:40 * tmpWidth}}  onPress = {()=>navigate('CurationSearch')}>
                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/curationsearch.svg')} style={{}}/>
                        </TouchableOpacity>}
                    </View>
                </View>
                {result == 'playlist' ?
                <View style={{flex:1}}>
                        <Story story={userState.otherStory} />
                    <Playlist playList={state.playlists} />
                </View> : <View style={{flex:1}}><Curating curationPosts={curation.maincurationposts} /></View> }            
            </SafeAreaView>
            <StoryModal />
        </StoryProvider>

    );
};

const styles = StyleSheet.create({
    headertext:{
        fontSize: 30 * tmpWidth,
        fontWeight: 'bold',
        color: 'rgba(169,193,255,1)',
        marginLeft:27 * tmpWidth,
        marginTop:14 * tmpWidth
    },
    opt:{
        marginTop: 15*tmpWidth,
        width:375 * tmpWidth,
        height:48 * tmpWidth,
        flexDirection: 'row',
    },
    optleft:{
        alignItems:'center',
        flexDirection:'row',
        height:48 * tmpWidth,
        width:375*2/3 * tmpWidth,
     },
    opt1:{
        height:40 * tmpWidth,
        marginLeft:28 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        width:100* tmpWidth,
    },
    opt2:{
        height:40 * tmpWidth,
        width:100 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
    },
    optpicked:{
        height:40 * tmpWidth,
        justifyContent:'center',
        borderBottomWidth:2 * tmpWidth,
        borderColor:'rgba(169,193,255,1)',
    },
    optright:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        height:48 * tmpWidth,
        width:375/3 * tmpWidth
     },
    profile: {
        width: 32 * tmpWidth,
        height: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
    },
    modalBox: {
        width : 305 * tmpWidth,
        height : 311 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 10 * tmpWidth,
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 30 * tmpWidth,
        shadowOpacity: 0.3,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15 * tmpWidth
    },
    nextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 152 * tmpWidth,
    },
    nextIcon: {
        width: 36 * tmpWidth,
        height: 52 * tmpWidth
    },
    textContainer: {
        marginTop: 16 * tmpWidth,
        alignItems: 'center',
        width: 190 * tmpWidth,
    },
    modalArtistText: {
        fontSize: 14 * tmpWidth,
        color: 'rgb(133,133,133)',
        marginTop: 8 * tmpWidth,
        marginBottom: 10 * tmpWidth,
    },
    modalTitleText: {
        fontSize: 16 * tmpWidth
    },
    likeIcon: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth
    }
});

export default Feed;
