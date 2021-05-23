import React, { useState, useEffect, useContext } from 'react';
import {Text, View, StyleSheet,TextInput, Keyboard, SafeAreaView, FlatList, Image ,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Context as SearchContext } from '../../context/SearchContext';
import { Context as CurationContext } from '../../context/CurationContext';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as DJContext } from '../../context/DJContext';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';

import { navigate } from '../../navigationRef';

import SearchResultScreen from './SearchResultScreen';

const SearchScreen = ({navigation}) => {
    const [text, setText] = useState('');
    const [searchOption, setSearachOption] = useState(navigation.getParam('searchOption'));
    const [key, setKey]= useState(true);

    const { state: searchState, searchsong, searchHint, initHint, hashtagHint, djHint } = useContext(SearchContext);
    const { getuserCurationposts } = useContext(CurationContext);
    const { getSongs } = useContext(DJContext);
    const {getUserPlaylists} = useContext(PlaylistContext);
    const {state: userState, getOtheruser} = useContext(UserContext);

    useEffect(() => {
        if(searchOption == 'Song' || searchOption == 'DJSong'){
            if(text == ''){
                initHint();
            }else{
                searchHint({term: text});
            }
        }
        if(searchOption == 'Hashtag'){
            if(text == ''){
                initHint();
            }else{
                hashtagHint({term: text});
            }
        }
        if(searchOption == 'DJ'){
            if(text == ''){
                initHint();
            }else{
                djHint({term: text});
            }
        }
    }, [text]);

    return (
    <SafeAreaView style={{backgroundColor:"#fff"}}>
            <View style={styles.input}>
                <TouchableOpacity onPress={()=>{navigation.pop();}} style={ styles.backbutton}>
                       <SvgUri width={35 * tmpWidth} height={35 * tmpWidth} source={require('../../assets/icons/back.svg')} />
                </TouchableOpacity>
                <View style={styles.inputbox}>
                    <View style={styles.inputboxicon}>
                        <SvgUri width={30 * tmpWidth} height={30 * tmpWidth} source={require('../../assets/icons/search.svg')} />
                    </View>
                    <TextInput style={styles.inputboxtextinput}
                        value = {text}
                        onChangeText={text=>setText(text)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus ={true}
                        onFocus = {()=>setKey(true)}
                        onChange = {()=>setKey(true)}
                        onSubmitEditing= {()=>{
                           setKey(false);
                           if( searchOption=='Song' ){
                                searchsong({songname: text})
                           }else if (searchOption=='Hashtag') {
                           }else{
                               searchsong({songname: text})
                           }
                        }}
                        placeholderTextColor ="#999"
                        keyboardType = "email-address"
                    />
                    <TouchableOpacity onPress={() => {setKey(false); setText(''); Keyboard.dismiss();}} style={styles.inputboxcancel}>
                       <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('../../assets/icons/cancel.svg')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
            { searchOption=='Song' || searchOption=='Hashtag' ?
            <View>
                <View style ={styles.searchopt}>
                    <TouchableOpacity onPress ={()=>{setSearachOption('Song'); setText(''); }} style={{justifyContent:'center' ,alignItems:'center' ,width:46, marginLeft:12}}>
                        {searchOption =='Song' ?
                        <View style={styles.pickedopt}>
                            <Text style={{marginTop:20 * tmpWidth, fontSize:14 * tmpWidth,}}>곡</Text>
                        </View>
                        :
                        <View style={{height:46 * tmpWidth, width:40 * tmpWidth, alignItems:'center'}}>
                            <Text style={{marginTop:20 * tmpWidth, color:'#999999', fontSize:14 * tmpWidth}}>곡</Text>
                        </View>
                       }
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{setSearachOption('Hashtag'); setText(''); }} style={{width:46 * tmpWidth,alignItems:'center', marginLeft:14 * tmpWidth}}>
                        {searchOption =='Hashtag' ?
                            <View style={styles.pickedopt2}>
                                <Text style={{marginTop:20 * tmpWidth, fontSize:14 * tmpWidth}}>해시태그</Text>
                            </View>
                            :
                            <View style={{height:46 * tmpWidth, width:60 * tmpWidth, alignItems:'center'}}>
                                <Text style={{marginTop:20 * tmpWidth, color:'#999999', fontSize:14 * tmpWidth}}>해시태그</Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.result}>
                {key == true ?
                    (searchOption =='Song' ?
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={searchState.hint}
                        keyExtractor={term=>term}
                        renderItem={({item})=> {
                            return (
                                <View style={{height:32 * tmpWidth, marginLeft: 24 * tmpWidth, marginTop: 21.5 * tmpWidth, justifyContent:'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        searchsong({songname: item})
                                        setText(item);
                                        setKey(false);
                                        }}
                                        style={{flexDirection:'row'}}

                                        >
                                            <View style={{width:304 * tmpWidth}}>
                                        <Text style={{fontSize:16 * tmpWidth}}>{item}</Text>
                                            </View>
                                            <View style={{width:32 * tmpWidth, height:32 * tmpWidth,}}>
                                                 <SvgUri width={32 * tmpWidth} height={32 * tmpWidth} source={require('../../assets/icons/leftup.svg')} />

                                            </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    :
                    <FlatList
                        keyboardShouldPersistTaps="handled"

                        data={searchState.hashtagHint}
                        keyExtractor={hashtag=>hashtag._id}
                        renderItem={({item})=> {
                            return (
                                <View style={{height:32 * tmpWidth, marginLeft: 24 * tmpWidth, marginTop: 21.5 * tmpWidth, justifyContent:'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        setText(item.hashtag);
                                        setKey(false);
                                        navigate('SelectedHashtag', {data: item, text: item.hashtag , searchOption : searchOption });
                                        }}
                                        style={{flexDirection:'row'}}

                                        >
                                        <View style={{width:304 * tmpWidth}}>
                                        <Text style={{fontSize:16 * tmpWidth}}>{'# ' + item.hashtag}</Text>
                                        </View>
                                        <View style={{width:32 * tmpWidth, height:32 * tmpWidth,}}>
                                             <SvgUri width={32 * tmpWidth} height={32 * tmpWidth} source={require('../../assets/icons/leftup.svg')} />

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    )
                  :
                   (searchOption =='Song' ?

                    <SearchResultScreen navigation={navigation} searchOption={searchOption} text={text} />
                    :

                    <FlatList
                        keyboardShouldPersistTaps="handled"

                        data={searchState.hashtagHint}
                        keyExtractor={hashtag=>hashtag._id}
                        renderItem={({item})=> {
                            return (
                                <View style={{height:32 * tmpWidth, marginLeft: 24 * tmpWidth, marginTop: 21.5 * tmpWidth, justifyContent:'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        setText(item.hashtag);
                                        setKey(false);
                                        navigate('SelectedHashtag', {data: item, text: text , searchOption : searchOption });

                                        }}
                                        style={{flexDirection:'row'}}

                                        >
                                        <View style={{width:200 * tmpWidth}}>
                                        <Text style={{fontSize:16 * tmpWidth}}>{'# ' + item.hashtag}</Text>
                                        </View>
                                        <View style={{width:150 * tmpWidth, marginRight:24 * tmpWidth, height:32 * tmpWidth,alignItems:'flex-end'}}>
                                            <Text style={{marginRight:24 * tmpWidth, fontSize:14 * tmpWidth, color:'rgb(148,153,163)'}}>{'플레이리스트 ' +item.playlistId.length+'개'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    )
                 }
                </View>
            </View>
            :
         <View >
                <View style ={styles.searchoptdj}>
                    <TouchableOpacity onPress ={()=>{setSearachOption('DJSong'); setText(''); }} style={{justifyContent:'center' ,alignItems:'center' ,width:110 * tmpWidth, marginLeft:8 * tmpWidth}}>
                        {searchOption =='DJSong' ?
                            <View style={styles.pickedoptdj}>
                                <Text style={{marginTop:20 * tmpWidth, fontSize:14 * tmpWidth}}>대표곡으로 찾기</Text>
                             </View>
                             :
                             <View style={{height:46 * tmpWidth, width:110 * tmpWidth, alignItems:'center'}}>
                                <Text style={{marginTop:20 * tmpWidth, color:'#999999', fontSize:14 * tmpWidth}}>대표곡으로 찾기</Text>
                             </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={()=>{setSearachOption('DJ'); setText(''); }} style={{width:110 * tmpWidth,alignItems:'center'}}>
                        {searchOption =='DJ' ?
                        <View style={styles.pickedoptdj}>
                            <Text style={{marginTop:20 * tmpWidth, fontSize:14 * tmpWidth}}>이름으로 찾기</Text>
                        </View> :
                        <View style={{height:46 * tmpWidth, width:110 * tmpWidth, alignItems:'center'}}>
                            <Text style={{marginTop:20 * tmpWidth, color:'#999999', fontSize:14 * tmpWidth}}>이름으로 찾기</Text>
                        </View>
                        }
                    </TouchableOpacity>
                </View>
          <View style={styles.searchressultdj}>

          {searchOption == "DJSong" ? (
          key == true ?
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={searchState.hint}
                        keyExtractor={term=>term}
                        renderItem={({item})=> {
                            return (
                                <View style={{height:32 * tmpWidth, marginLeft: 24 * tmpWidth, marginTop: 21.5 * tmpWidth, justifyContent:'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        searchsong({songname: item})
                                        setText(item);
                                        setKey(false);
                                        }}
                                        style={{flexDirection:'row'}}
                                        >
                                        <View style={{width:304 * tmpWidth}}>
                                        <Text style={{fontSize:16 * tmpWidth}}>{item}</Text>
                                        </View>
                                        <View style={{width:32 * tmpWidth, height:32 * tmpWidth,}}>
                                             <SvgUri width={32 * tmpWidth} height={32 * tmpWidth} source={require('../../assets/icons/leftup.svg')} />

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
          :
                     <SearchResultScreen navigation={navigation} searchOption={searchOption} text={text} />

          )

            :
            <View style={{height:664 * tmpHeight}}>
            <FlatList
                keyboardShouldPersistTaps="handled"

                data={searchState.djHint}
                keyExtractor={dj=>dj._id}
                renderItem={({item})=> {
                    return (
                        <View style={{marginLeft: 30 * tmpWidth, marginTop: 20 * tmpWidth, height:tmpWidth*70, width:tmpWidth*375}}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => {
                                if(item._id == userState.myInfo._id){
                                    navigate('Account');
                                }else{
                                    getUserPlaylists({id:item._id});
                                    getOtheruser({id:item._id});
                                    getSongs({id:item._id});
                                    getuserCurationposts({id:item._id});
                                    navigate('OtherAccount');
                                }
                            }}>
                                {item.profileImage == undefined ?
                                <View style={styles.profileImage}>
                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                </View>:
                                    <Image source={{uri: item.profileImage}} style={styles.profileImage}/>
                                }
                                <View style={{marginLeft: 24 * tmpWidth}}>
                                   <View style={{height:tmpWidth*35, justifyContent:'center'}}>
                                    <Text style={{fontSize:16,marginTop:10*tmpWidth}}>{item.name}</Text>
                                   </View>
                                   <View style={{height:tmpWidth*35, alignItems:'center', flexDirection:'row'}}>
                                   <View style={styles.representbox}>
                                        <Text style={{color:'rgb(148,153,163)',fontSize:11*tmpWidth}}>대표곡</Text>
                                   </View>
                                    <Text numberOfLines ={1} style={{marginLeft:6*tmpWidth, fontSize:tmpWidth*14,color:'rgb(148,153,163)'}}>{item.songs[0].attributes.artistName}  </Text>
                                    <Text numberOfLines ={1} style={{fontSize:tmpWidth*11, color:'rgb(148,153,163)'}}>{item.songs[0].attributes.name}</Text>
                                   </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            </View>
            }
            </View>
            </View>
            }
            </View>




    </SafeAreaView>
    );
};
SearchScreen.navigationOptions = () =>{
    return {
            headerShown: false,

    };
};

const styles=StyleSheet.create({
    profileImage: {
        width: 56 * tmpWidth,
        height: 56 * tmpWidth,
        borderRadius: 50 * tmpWidth,
    },
    input:{
        flexDirection:'row',
        width:375 * tmpWidth,
        borderRadius:10 * tmpWidth,
        height:44 * tmpWidth,
        backgroundColor:"#fff",
        alignItems:'center',
        marginTop:10 * tmpWidth
    },
    backbutton:{
        width:40 * tmpWidth,
        height:40 * tmpWidth,
        marginLeft:10 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    inputbox:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:300 * tmpWidth,
        height:44 * tmpWidth,
        borderRadius:10 * tmpWidth,
        backgroundColor:"#eee"
    },
    inputboxicon:{
        width:30 * tmpWidth,
        height:30 * tmpWidth,
        marginLeft:5 * tmpWidth,
        backgroundColor:'#eee',
         marginRight:5 * tmpWidth
    },
    inputboxtextinput:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:14 * tmpWidth,
        backgroundColor: "#eee",
        width:213 * tmpWidth,
        height:44 * tmpWidth
    },
    inputboxcancel: {
        justifyContent:'center',
        width:32 * tmpWidth,
        height:32 * tmpWidth,
        marginRight:12*tmpWidth,
        backgroundColor:"#eee"
    },
    searchopt:{
        flexDirection:'row',
        height:46 * tmpWidth,
        width:375 * tmpWidth,
        backgroundColor:"#fff"
    },
    pickedopt:{
        borderBottomWidth:2 * tmpWidth,
        borderColor:'rgba(169,193,255,1)',
        height:46 * tmpWidth,
        width:40 * tmpWidth,
        alignItems:'center'
    },
    pickedopt2:{
        borderBottomWidth:2 * tmpWidth,
        borderColor:'rgba(169,193,255,1)',
        height:46 * tmpWidth,
        width:60 * tmpWidth,
        alignItems:'center'
    },
    result:{
        height:664 * tmpHeight,
        backgroundColor:"#FAFAFA",
        borderTopWidth:1 * tmpWidth,
        borderColor:'rgba(153,153,153,0.2)'
    },
    searchoptdj:{
        flexDirection:'row',
        height:46 * tmpWidth,
        width:375 * tmpWidth,
        marginLeft:10*tmpWidth,
        backgroundColor:"#fff"
    },
    pickedoptdj:{
        borderBottomWidth:2 * tmpWidth,
        borderColor:'rgba(169,193,255,1)',
        height:46 * tmpWidth,
        width:110 * tmpWidth,
        alignItems:'center'
   },
   searchressultdj:{
        height:664 * tmpHeight,
        backgroundColor:"#FAFAFA",
        borderTopWidth:1 * tmpWidth,
        borderColor:'rgba(153,153,153,0.2)'
   },
   representbox:{
        height:tmpWidth*16,
        borderWidth:0.8,
        borderColor:'rgba(148,153,163,0.5)',
        borderRadius:30,
        width:tmpWidth*41,
        justifyContent:'center',
        alignItems:'center'
   },
});

export default SearchScreen;