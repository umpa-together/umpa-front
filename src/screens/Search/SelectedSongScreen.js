import React, { useContext } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { navigate } from '../../navigationRef';
import { Context as SearchPlaylistContext } from '../../context/SearchPlaylistContext';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { Context as SearchContext } from '../../context/SearchContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as CurationContext } from '../../context/CurationContext';
import { Context as DJContext } from '../../context/DJContext';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';

const Imagetake = ({url, borderRadius}) => {
    url =url.replace('{w}', '1000');
    url = url.replace('{h}', '1000');
    return <Image style ={{height:'100%', width:'100%', borderRadius: borderRadius}} source ={{url:url}}/>
};
const Imagebacktake = ({url , border, opac}) => {
    url =url.replace('{w}', '700');
    url = url.replace('{h}', '700');
    return (
        <ImageBackground style ={{ opacity : opac, height:'100%', width:'100%',borderRadius: border }} resizeMode ="stretch"  source ={{url:url}}/>
    );
};

const SelectedSongScreen = ({navigation}) => {
    const song = navigation.getParam('song');
    const category = navigation.getParam('category');
    const { state } = useContext(SearchPlaylistContext);

    const { getPlaylist } = useContext(PlaylistContext);
    const { state: searchState } = useContext(SearchContext);
    const { state: userState, getOtheruser } = useContext(UserContext);

    const { getCuration } = useContext(CurationContext);
    const { getSongs } = useContext(DJContext);
    return (
        <View>
            {state.playList == null && searchState.users == null ? <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}><ActivityIndicator /></View> :
            <View>
            {category == 'Song' ?
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{backgroundColor:"rgba(250,250,250,1)"}}>
                    <View style={{position :"absolute", zIndex:-3, width:375 * tmpWidth, height:354 * tmpWidth}}>
                        <Imagebacktake opac={0.4} url={song.attributes.artwork.url}></Imagebacktake>
                    </View>
                    <View style={styles.header}>
                        <View style={{ height:40 * tmpWidth, width: 40 * tmpWidth}}>
                            <TouchableOpacity style={styles.backicon} onPress={()=>navigation.pop()}>
                                <SvgUri width='40' height='40' source={require('../../assets/icons/playlistBack.svg')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center', flexDirection: 'row'}}>
                            {song.attributes.contentRating == "explicit" ? 
                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                            : null }
                            <Text numberOfLines={1} style={{fontSize:18 * tmpWidth, fontWeight:'500'}}>{song.attributes.name}</Text>
                        </View>
                        <View style={{width: 40 * tmpWidth, height: 40 * tmpWidth}} />
                    </View>
                    <View style={{height:'100%'}}>
                        <View style={{width:146 * tmpWidth, height:146 * tmpWidth, marginTop:22 * tmpWidth, marginLeft:115 * tmpWidth}}>
                            <Imagetake borderRadius ={200 * tmpWidth} opac={1} url={song.attributes.artwork.url} />
                        </View>
                        <View style={{width:375 * tmpWidth, height:88 * tmpWidth}}>
                            <View style={{width:375 * tmpWidth, height:88/2 * tmpWidth, justifyContent:'center', alignItems:'center' }}>
                                <Text style={{fontSize:12 * tmpWidth, fontWeight:'bold'}}>{song.attributes.artistName}</Text>
                            </View>
                            <View style={{width:375 * tmpWidth, height:88/2 * tmpWidth, flexDirection:'row'}}>
                                <View style={{width:375/2 * tmpWidth, height:88/2 * tmpWidth, flexDirection:'row',justifyContent:'flex-end', marginRight:2.5 * tmpWidth}}>
                                    <TouchableOpacity
                                    onPress={() => {getCuration({isSong:true,object:song, id:song.id}); navigate('SelectedCuration', {id: song.id});}}
                                    style={styles.curationbox}>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(25,25,25)'}}>곡 큐레이션</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{width:375/2 * tmpWidth, height:88/2 * tmpWidth, flexDirection:'row', justifyContent:'flex-start', marginLeft:2.5 * tmpWidth}}>
                                    <TouchableOpacity
                                    onPress={() => {getCuration({isSong:false,object:{albumName :song.attributes.albumName, artistName:song.attributes.artistName, artwork:song.attributes.artwork, contentRating: song.attributes.contentRating }, id:song.attributes.url.split('?')[0].split('/')[6] }); navigate('SelectedCuration', {id:song.attributes.url.split('?')[0].split('/')[6]});}}
                                    style={styles.albumbox}>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(25,25,25)'}}>앨범 큐레이션</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.middletext}>
                            <Text style={{fontSize:16 * tmpWidth}}>플레이리스트</Text>
                        </View>
                        { state.playList.length == 0 ?
                        <View style={{alignItems: 'center', height:420 * tmpWidth, paddingTop: 100 * tmpWidth}}>
                            <Text style={{color: 'rgb(93,93,93)'}}>현재 작성된 플레이리스트가 없습니다.</Text>
                            <Text style={{color: 'rgb(93,93,93)', marginTop: 10 * tmpWidth}}>당신의 플레이리스트를 만들어주세요!</Text>
                            <TouchableOpacity onPress={()=>navigate('Create', {'data': []})} style={{borderRadius: 10 * tmpWidth, backgroundColor: 'rgb(93,93,93)',marginTop: 10 * tmpWidth }}>
                                <Text style={{color: 'white', padding: 4 * tmpWidth}}>만들기</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.playlists}>
                            <FlatList
                                numColumns={2}
                                data ={state.playList}
                                keyExtractor = {playlist => playlist._id}
                                renderItem = {({item}) => {
                                    return (
                                        <View style={{width:161 * tmpWidth,marginRight:14 * tmpWidth, marginBottom:23 * tmpWidth}}>
                                            <TouchableOpacity onPress={async () => {
                                                await getPlaylist({id:item._id, postUserId:item.postUserId})
                                                navigate('SelectedPlaylist', {id: item._id , object:item, navigation: navigation})
                                                }}>
                                                <View style={{width: 161 * tmpWidth, height: 157 * tmpWidth, borderRadius:4 * tmpWidth, marginBottom: 10 * tmpWidth}}>
                                                    <Image style={ {width:'100%', height:'100%', borderRadius:4 * tmpWidth, backgroundColor: 'rgb(175,179,211)'}} source={{url :item.image}}/>
                                                </View>
                                                <View style={{width:161 * tmpWidth}}>
                                                    <Text numberOfLines ={2} style={{fontSize: 14 * tmpWidth, color:"rgba(79,79,79,1)"}}>{item.title}</Text>
                                                </View>
                                                <View style={{flexDirection:'row', marginTop: 8 * tmpWidth}}>
                                                    <View style={{width:18 * tmpWidth, height:18 * tmpWidth}}>
                                                        {item.postUserId.profileImage == null || item.postUserId.profileImage==undefined ?
                                                        <View style={styles.profileImage} >
                                                            <SvgUri width='18' height='18' source={require('../../assets/icons/noprofile.svg')} />
                                                        </View> :
                                                        <Image style={{width:'100%', height:'100%', borderRadius:32 * tmpWidth }}source={{uri: item.postUserId.profileImage}} />}
                                                    </View>
                                                    <Text style={{marginLeft:6 * tmpWidth, color: 'rgb(148,153,163)'}}>{item.postUser}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            /> 
                        </View> }
                    </View>
                </SafeAreaView>
            </ScrollView> :
            <SafeAreaView style={{backgroundColor:"rgba(250,250,250,1)", height:814 * tmpWidth}}>
               <View style={styles.headerdj}>
                    <View style={{height:40 * tmpWidth, width:40 * tmpWidth}}>
                        <TouchableOpacity style={{ zIndex:2, marginLeft: 20 * tmpWidth}} onPress={()=>navigation.pop()}>
                            <SvgUri width={35 * tmpWidth} height={35 * tmpWidth} source={require('../../assets/icons/back.svg')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headersongname}>
                        {song.attributes.contentRating == "explicit" ? 
                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                        : null }
                        <Text style={{fontSize:18 * tmpWidth, fontWeight:'500'}} numberOfLines={1}>{song.attributes.name}</Text>
                    </View>
                    <View style={{height:40 * tmpWidth, width:40 * tmpWidth}}/>
               </View>
               <View style={styles.middletextdj}>
                    <Text style={{fontSize:14 * tmpWidth, color:'rgba(93,93,93,1)'}}>대표곡으로 DJ검색</Text>
               </View>
               {searchState.users.length == 0 ?
                <View style={{alignItems: 'center', marginTop: 250 * tmpWidth}}>
                    <Text style={{color: 'rgb(93,93,93)'}}>해당곡이 대표곡인 DJ가 없습니다.</Text>
                    <Text style={{color: 'rgb(93,93,93)', marginTop: 10 * tmpWidth}}>다른 DJ를 찾아보세요 !</Text>
                </View> : 
                <View style={styles.resultdj}>
                    <FlatList
                        numColumns={2}
                        data={searchState.users}
                        keyExtractor={(user)=>user._id}
                        renderItem={({item})=> {
                            return (
                              <View style={styles.djitem}>
                                <TouchableOpacity onPress={async ()=> {
                                    if(item._id == userState.myInfo._id){
                                        navigate('Account');
                                    }else{
                                        await Promise.all([getOtheruser({id:item._id}),
                                        getSongs({id:item._id})]);
                                        navigation.push('OtherAccount',{otherUserId:item._id});
                                    }}}>
                                    <View style={{alignItems:'center'}}>
                                        {item.profileImage == undefined ?
                                        <View style={{width:118 * tmpWidth, height:118 * tmpWidth, borderRadius:100 * tmpWidth, backgroundColor:'#eee'}}>
                                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                        </View> :
                                        <View style={{width:118 * tmpWidth, height:118 * tmpWidth, borderRadius:100 * tmpWidth}}>
                                            <Image source={{uri: item.profileImage}} style={{width:'100%', height:'100%', borderRadius:100}}/>
                                        </View> }
                                        <View style={{width:160 * tmpWidth, marginTop:10 * tmpWidth, alignItems:'center'}}>
                                            <Text style={{fontSize:16 * tmpWidth}} numberOfLines={1}>{item.name}</Text>
                                        </View>
                                        <View style={{width:160 * tmpWidth ,flexDirection:'row', justifyContent: 'center', alignItems: 'center',marginTop: 8 * tmpWidth}}>
                                            <View style={styles.representbox}>
                                                <Text style={{fontSize:11 * tmpWidth, color:'rgba(148,153,163,1)'}}>대표곡</Text>
                                            </View>
                                            <View style={{width: 101 * tmpWidth, flexDirection:'row', alignItems: 'center'}}>
                                                <Text style={styles.repsongname} numberOfLines={1}>{item.songs[0].attributes.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View> }
            </SafeAreaView> }
        </View> }
    </View>
    )
};

SelectedSongScreen.navigationOptions = () =>{
    return {
        headerShown: false,
    };
};

const styles=StyleSheet.create({
    profileImage: {
        width: 70 * tmpWidth,
        height: 70 * tmpWidth,
        borderRadius: 50 * tmpWidth,
    },
    header:{
        zIndex:0,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    backicon:{
        zIndex:2,
        height:40 * tmpWidth,
        width:40 * tmpWidth,
        marginLeft: 20 * tmpWidth,
    },
    curationbox:{
        width:71 * tmpWidth,
        height:26 * tmpWidth,
        backgroundColor:"rgba(255,255,255,0.5)",
        borderRadius:30 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: 'rgb(224,224,224)'
    },
    albumbox:{
        width:82 * tmpWidth,
        height:26 * tmpWidth,
        backgroundColor:"rgba(255,255,255,0.5)",
        borderRadius:30 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: 'rgb(224,224,224)'
    },
    middletext:{
        width: 375 * tmpWidth,
        height:57 * tmpWidth,
        backgroundColor:'rgb(250,250,250)',
        paddingLeft:20 * tmpWidth,
        paddingTop:20 * tmpWidth,
    },
    playlists:{
        backgroundColor:'rgb(250,250,250)',
        width:500 * tmpWidth,
        height:420 * tmpWidth,
        paddingLeft:20 * tmpWidth,
    },
    headerdj:{
        width: 375 * tmpWidth,
        backgroundColor:'rgba(255,255,255,0)',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',

    },
    headersongname:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row'
    },
    middletextdj:{
        width:375 * tmpWidth,
        marginTop:2 * tmpWidth,
        height:16 * tmpWidth,
        alignItems:'center',
    },
    resultdj:{
        marginLeft:22 * tmpWidth,
        marginTop: 30 * tmpWidth,
        height:539 * tmpWidth,
        width:375 * tmpWidth
    },
    djitem :{
        marginRight:11 * tmpWidth,
        marginBottom:24 * tmpWidth,
    },
    representbox:{
        justifyContent:'center',
        alignItems:'center',
        width:39 * tmpWidth,
        borderWidth:0.8 * tmpWidth,
        borderColor:'rgba(148,153,163,0.5)',
        height:16 * tmpWidth,
        borderRadius:30 * tmpWidth
    },
    repsongname:{
        marginLeft:6 * tmpWidth,
        fontSize:14 * tmpWidth,
        color:'rgba(148,153,163,1)',
        fontWeight:'bold'
    },
});

export default SelectedSongScreen;