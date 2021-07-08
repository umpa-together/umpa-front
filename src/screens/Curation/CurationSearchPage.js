import React, {useState, useContext, useEffect} from 'react';
import { Text, TextInput,View,Keyboard, FlatList,StyleSheet,SafeAreaView,TouchableOpacity, ActivityIndicator, Platform, StatusBar  } from 'react-native';
import { Context as SearchContext } from '../../context/SearchContext'
import { Context as CurationContext } from '../../context/CurationContext'
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { SongImage } from '../../components/SongImage'

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
    <View style={styles.container}>
        <View style={{backgroundColor:"rgb(250,250,250)"}}>
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
                <View style={{flex: 1}}>
                    <View style={ styles.keyheader}>
                        <Text style={{fontSize:14 * tmpWidth,color:'rgb(148,153,163)'}}>관련 검색어</Text>
                    </View>
                    <View style ={styles.keyoutput}>
                        <FlatList
                            contentContainerStyle={{marginTop: 14 * tmpWidth}}
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
                </View> :
                <View style={{flex: 1}}>
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
                                contentContainerStyle={{paddingTop: 14 * tmpWidth}}
                                data={state.songData}
                                keyExtractor={posts => posts.id}
                                onEndReached={onEndReached}
                                onEndReachedThreshold={0.8}
                                ListFooterComponent={loading && <ActivityIndicator />}
                                renderItem={({item}) =>{
                                    return (
                                        <TouchableOpacity style ={{height:76 * tmpWidth , marginLeft:25 * tmpWidth}} onPress={async ()=>{
                                            await getCuration({isSong : true,object:item,id:item.id})
                                            navigation.push('SelectedCuration', {id: item.id, object: item})
                                        }}>
                                            <View style={{flexDirection:'row'}}>
                                                <SongImage url={item.attributes.artwork.url} size={56} border={56} />
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
                                                            <Text style={{fontSize:14 * tmpWidth, color:"#9499A3"}} numberOfLines={1}>  feat. {item.attributes.name.split("(feat.")[1].slice(0,-1)}</Text> 
                                                            : null}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                       )
                                }}
                            /> :
                            <FlatList
                                contentContainerStyle={{paddingTop: 14 * tmpWidth}}
                                data={state.albumData}
                                keyExtractor={posts => posts.id}
                                onEndReached={onEndReached}
                                onEndReachedThreshold={0.8}
                                ListFooterComponent={loading && <ActivityIndicator />}
                                renderItem={({item}) =>{
                                    return (
                                        <TouchableOpacity style ={{height:76 * tmpWidth , marginLeft:25 * tmpWidth,}} onPress={async ()=>{
                                            await getCuration({isSong : false,object:{albumName :item.attributes.name, artistName:item.attributes.artistName, artwork:item.attributes.artwork, contentRating: item.attributes.contentRating},id:item.id})
                                            navigation.push('SelectedCuration', {id: item.id, object: {albumName :item.attributes.name, artistName:item.attributes.artistName, artwork:item.attributes.artwork, contentRating: item.attributes.contentRating}})
                                        }}>
                                            <View style={{flexDirection:'row'}}>
                                                <SongImage url={item.attributes.artwork.url} size={56} border={4}/>
                                                <View>
                                                    <View style={{marginLeft: 24 * tmpWidth}}>
                                                        <View style={{marginTop:10 * tmpWidth, flexDirection: 'row', alignItems: 'center', width: 220 * tmpWidth}}>
                                                            {item.attributes.contentRating == "explicit" &&
                                                            <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> }
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
     </View>
    );
};

CurationSearchPage.navigationOptions = ({navigation}) =>{
    return {
        headerShown: false,
    };
};

const styles=StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 44 * tmpWidth : (StatusBar.currentHeight + 6) * tmpWidth,
        backgroundColor:'#fff'
    },
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
        backgroundColor:"rgb(250,250,250)",
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
        backgroundColor:"rgb(250,250,250)",
        marginTop:14 * tmpWidth,
        flex: 1
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
        fontSize:16 * tmpWidth,
        color: 'black'
    },
    unclicked:{
        fontSize:16 * tmpWidth,
        color:'rgba(153,153,153,0.4)'
    },
    result:{
        width:375 * tmpWidth,
        backgroundColor:"rgb(250,250,250)",
        flex: 1
    },
});

export default CurationSearchPage;