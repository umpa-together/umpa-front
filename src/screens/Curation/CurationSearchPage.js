import React, {useState, useContext, useEffect} from 'react';
import { Text, TextInput,View,Keyboard, Image,FlatList,StyleSheet,SafeAreaView,TouchableOpacity, ActivityIndicator  } from 'react-native';
import { Context as SearchContext } from '../../context/SearchContext'
import { Context as CurationContext } from '../../context/CurationContext'
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';

import { navigate } from '../../navigationRef';
import SvgUri from 'react-native-svg-uri';

const Imagetake = ({url, border}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return <Image style ={{height:'100%', width:'100%', borderRadius: border}} source ={{url:url}}/>
};

const CurationSearchPage = ({navigation}) => {
    const [text, setState] = useState('');
    const [isSong, setIsSong]= useState(true);
    const [key, setKey]= useState(true);

    const { state, searchsong, searchalbum, songNext, searchHint, initHint } = useContext(SearchContext);
    const { getCuration } = useContext(CurationContext);
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        if((isSong && state.songData.length >= 20) || (!isSong && state.albumData.length >= 20)){
            setLoading(true);
            await songNext({ next: state.songNext.substr(22) });
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
    useEffect(() => {
        if(text == ''){
            initHint();
        }else{
            searchHint({term: text});
        }
    }, [text]);

    return (
    <SafeAreaView style={{backgroundColor:'#fff'}}>
        <View style={{backgroundColor:"rgb(250,250,250)"}}>
            <View style={styles.emptyheader}>
            </View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.back} onPress={()=>{navigation.pop()}}>
                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
                <Text style={styles.headertext}>큐레이션 검색</Text>
            </View>
            <View style={styles.input}>
                <View style ={{ flexDirection:'row'}}>
                    <View style={styles.inputicon}>
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/curationsearch.svg')}/>
                    </View>
                    <View>
                        <TextInput style={styles.inputtext}
                            value = {text}
                            onChangeText={text=>setState(text)}
                            placeholder="노래, 아티스트 검색"
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoFocus ={true}
                            onFocus = {()=>setKey(true)}
                            onChange = {()=>setKey(true)}
                            onSubmitEditing= {()=>{setKey(false); searchsong({ songname: text}); searchalbum({albumname:text}); }}
                            placeholderTextColor ="rgb(196,196,196)"
                        />
                    </View>
                    <TouchableOpacity 
                    style={{marginLeft:tmpWidth*10, width:28*tmpWidth, height:tmpWidth*28, marginTop:tmpWidth*15}}
                    onPress={()=>{Keyboard.dismiss(); setState('');}}
                    >
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/resultDelete.svg')}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.output}>
               {key ?
                <View>
                    <View style={ styles.keyheader}>
                        <Text style={{fontSize:14 * tmpWidth,color:'rgb(148,153,163)'}}>관련 검색어</Text>
                    </View>
                    <View style ={styles.keyoutput}>
                        <FlatList
                            style={{marginTop: 14 * tmpWidth,}}
                            data={state.hint}
                            keyboardShouldPersistTaps="handled"
                            keyExtractor={term=>term}
                            renderItem={({item})=> {
                                return (
                                    <TouchableOpacity style={styles.keyoutputitem} onPress={() => { setState(item); searchsong({ songname: item}); searchalbum({albumname:item}); setKey(false); Keyboard.dismiss(); }}>
                                        <View>
                                        <Text style={{textAlign:'center', fontSize:16 * tmpWidth}}>{item}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
                :
                <View>
                    <View style={styles.resultopt}>
                            <TouchableOpacity  onPress={()=>setIsSong(true)} style={{justifyContent:'center', alignItems:'center', width:375/6 * tmpWidth}}>
                                <Text style={isSong ? styles.clicked : styles.unclicked}>곡</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>setIsSong(false)} style={{justifyContent:'center', alignItems:'center', width:375/6 * tmpWidth}}>
                                <Text style={!isSong ? styles.clicked : styles.unclicked}>앨범</Text>
                            </TouchableOpacity>
                    </View>
                    <View style ={styles.result}>
                        {isSong ?
                            <FlatList
                                  style={{marginTop: 9 * tmpWidth}}
                                  data={state.songData}
                                  keyExtractor={posts => posts.id}
                                  onEndReached={onEndReached}
                                  onEndReachedThreshold={0.8}
                                  ListFooterComponent={loading && <ActivityIndicator />}
                                  renderItem={({item}) =>{
                                  return (
                                      <TouchableOpacity style ={{height:76 * tmpWidth , marginLeft:25 * tmpWidth}} onPress={()=>{getCuration({isSong:true,object:item,id:item.id}); navigate('SelectedCuration', {id: item.id}); }}>
                                          <View style={{flexDirection:'row'}}>
                                              <View style={{width:56 * tmpWidth, height:56 * tmpWidth}}>
                                                  <Imagetake url={item.attributes.artwork.url} border={100 * tmpWidth}></Imagetake>
                                              </View>
                                              <View>
                                                 <View style={{marginLeft: 24 * tmpWidth, width: 220 * tmpWidth,}}>
                                                      <View style={{marginTop:10 * tmpWidth, flexDirection: 'row', alignItems: 'center'}}>
                                                        {item.attributes.contentRating == "explicit" ? 
                                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                        : null }
                                                        <Text style={{fontSize:16 * tmpWidth}} numberOfLines={1}>{item.attributes.name.split("(feat.")[0]}</Text>
                                                      </View>
                                                      <View style={{flexDirection:'row', marginTop: 8 * tmpWidth, width: 150 * tmpWidth}}>
                                                        <Text style={{fontSize:14 * tmpWidth, color:"#9499A3"}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                                        { item.attributes.name.split("(feat.")[1] ?
                                                        <Text style={{fontSize:14 * tmpWidth, color:"#9499A3"}} numberOfLines={1}>  feat. {item.attributes.name.split("(feat.")[1].slice(0,-1)}</Text> :
                                                        null}
                                                      </View>
                                                 </View>
                                              </View>
                                           </View>
                                      </TouchableOpacity>
                                   )
                                   }}
                             />
                        :
                         <FlatList
                               style={{marginTop: 9 * tmpWidth}}
                               data={state.albumData}
                               keyExtractor={posts => posts.id}
                               onEndReached={onEndReached}
                               onEndReachedThreshold={0.8}
                               ListFooterComponent={loading && <ActivityIndicator />}
                               renderItem={({item}) =>{
                               return (
                                   <TouchableOpacity style ={{height:76 * tmpWidth , marginLeft:25 * tmpWidth,}} onPress={()=>{getCuration({isSong:false ,object:{albumName :item.attributes.name, artistName:item.attributes.artistName, artwork:item.attributes.artwork, contentRating: item.attributes.contentRating, id: item.id },id:item.id}); navigate('SelectedCuration', {id: item.id});}}>
                                       <View style={{flexDirection:'row'}}>
                                           <View style={{width:56 * tmpWidth, height:56 * tmpWidth}}>
                                              <Imagetake url={item.attributes.artwork.url} border={4 * tmpWidth}></Imagetake>
                                           </View>
                                           <View>
                                             <View style={{marginLeft: 24 * tmpWidth}}>
                                                <View style={{marginTop:10 * tmpWidth, flexDirection: 'row', alignItems: 'center', width: 220 * tmpWidth}}>
                                                    {item.attributes.contentRating == "explicit" ? 
                                                    <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                                    : null }
                                                   <Text style={{fontSize:16 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                                </View>
                                                <View>
                                                   <Text style={{fontSize:14 * tmpWidth, color:"#9499A3", marginTop: 8 * tmpWidth}} numberOfLines={1}>{item.attributes.artistName}</Text>
                                                </View>
                                              </View>
                                           </View>
                                        </View>
                                   </TouchableOpacity>
                                )
                                }}
                          />
                        }
                    </View>
                </View>
                }
            </View>
        </View>
     </SafeAreaView>
    );
};

CurationSearchPage.navigationOptions = ({navigation}) =>{
    return {
        headerShown: false,
    };
};

const styles=StyleSheet.create({
    header:{
        backgroundColor:'#fff',
        width:375 * tmpWidth,
        height:48 * tmpWidth,
        flexDirection:'row',
    },
    back:{
        marginLeft:5 * tmpWidth,
        marginTop:5 * tmpWidth,
        width:40 * tmpWidth,
        height:40 * tmpWidth,
    },
    headertext:{
        fontSize:18 * tmpWidth,
        marginLeft:90 * tmpWidth,
        marginTop:15 * tmpWidth,
    },
    input:{
        width : 375 * tmpWidth,
        height:60 * tmpWidth,
        backgroundColor:'#fff'
    },
    inputicon:{
        height:40 * tmpWidth,
        width:40 * tmpWidth,
        marginTop:10 * tmpWidth,
        marginLeft:14 * tmpWidth,
    },
    inputtext:{
        marginLeft: tmpWidth*10,
        fontSize:16 * tmpWidth,
        width:252 * tmpWidth,
        height:60 * tmpWidth,
    },
    output:{
        width:375 * tmpWidth,
        height:660 * tmpWidth,
        backgroundColor:"rgb(250,250,250)"
    },
    keyheader:{
        width:68 * tmpWidth,
        height:16 * tmpWidth,
        marginLeft: 20 * tmpWidth,
        backgroundColor:"rgb(250,250,250)",
        marginTop:20 * tmpWidth
    },
    keyoutput:{
        width:375 * tmpWidth,
        height:597 * tmpHeight,
        backgroundColor:"rgb(250,250,250)",
        marginTop:14 * tmpWidth
    },
    keyoutputitem:{
        flexDirection: 'row' ,
        width:200 * tmpWidth,
        height:50 * tmpWidth,
        marginLeft:20 * tmpWidth,
        marginRight:20 * tmpWidth
    },
    resultopt:{
        flexDirection:'row',
        width:375 * tmpWidth,
        height:40 * tmpWidth,
        backgroundColor:'#fff'
    },
    clicked:{
        fontSize:16 * tmpWidth
    },
    unclicked:{
        fontSize:16 * tmpWidth,
        color:'rgba(153,153,153,0.4)'
    },
    result:{
        width:375 * tmpWidth,
        height:621 * tmpHeight,
        backgroundColor:"rgb(250,250,250)",
        paddingTop:14 * tmpWidth
    },
});

export default CurationSearchPage;