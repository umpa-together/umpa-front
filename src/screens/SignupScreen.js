import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput,ScrollView, Text, Keyboard, TouchableWithoutFeedback, FlatList, Modal, Image, ActivityIndicator } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as SearchContext } from '../context/SearchContext';
import { Context as DJContext } from '../context/DJContext';
import TrackPlayer from 'react-native-track-player';
import { tmpWidth } from '../components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import HarmfulModal from '../components/HarmfulModal';

const ImageSelect = ({url, opac}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        <Image style ={{borderRadius :100 ,opacity : opac , height:'100%', width:'100%'}} source ={{url:url}}/>
    );
};

const SignupPage = ({ navigation }) => {
    const { state, checkName, signup, signin } = useContext(AuthContext);
    const { setSongs } = useContext(DJContext);
    const [email, setEmail] = useState(navigation.getParam('email'));
    const [emailerr, setEmailerr] = useState(false);
    const [key, setKey]= useState(false);
    const [password, setPassword] = useState(navigation.getParam('password'));
    const [passworderr, setPassworderr] = useState(false);
    const [idc, setIdc] = useState('');
    const isSNS = navigation.getParam('isSNS');

    const [passwordcheck,    setPasswordcheck] = useState(navigation.getParam('password'));
    const [passwordcheckerr, setPasswordcheckerr] = useState(false);

    const [name, setName] = useState('');
    const [nameerr, setNameerr] = useState(false);

    const [agreeall, setAgreeall] = useState(false);
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);
    const [agree1Err, setAgree1Err] = useState(false);
    const [agree2Err, setAgree2Err] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [songs, setSong] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tok, setTok] = useState(false);
    const [double, setDouble] = useState(false);
    const [harmfulModal, setHarmfulModal] = useState(false);
    const { state: searchState, searchsong, searchinit, songNext, searchHint, initHint } = useContext(SearchContext);
    const nextCheck = () => {
        if(email != '' && password != '' && name != '') setModalVisible(true);
    }
    const getData = async () => {
        setLoading(true);
        await songNext({ next: searchState.songNext.substr(22) });
        setLoading(false);
    };
    const onEndReached = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };
    const addtracksong= async ({data}) => {
        const track = new Object();
        track.id = data.id;
        track.url = data.attributes.previews[0].url;
        track.title = data.attributes.name;
        track.artist = data.attributes.artistName;
        if (data.attributes.contentRating != "explicit") {
            setIsPlayingid(data.id);
            await TrackPlayer.reset()
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
    const doubleCheck = async (name) => {
        await checkName({name})
        setDouble(true)
        setNameerr(false)
    }
    const addItem = ({data}) => {
        let tok = false;
        for(let key in songs){
            if(data.id == songs[key].id){
                tok = true;
                break;
            }
        }
        if (songs.length > 6) {
            console.log('7개를 넘길수 없습니다');
        }else {
            if(!tok)    setSong([...songs, data]);
        }
    };
    const deleteItem = ({data}) => {
        setSong(songs.filter(item=> item != data));
    };
    const singupfun = async () => {
        if(email == undefined || email.length == 0){
            setEmailerr(true);
            return;
        }else{
            setEmailerr(false);
        }
        if(password == undefined || password.length == 0){
            setPassworderr(true);
            return;
        }else{
            setPassworderr(false);
        }
        if(passwordcheck == undefined || passwordcheck.length == 0){
            setPasswordcheckerr(true);
            return;
        }else{
            setPasswordcheckerr(false);
        }
        if(name == undefined || name.length == 0){
            setNameerr(true);
            return;
        }else{
            setNameerr(false);
        }
        if(!agree1) {
            setAgree1Err(true);
            return;
        }else{
            setAgree1Err(false);
        }
        if(!agree2) {
            setAgree2Err(true);
            return;
        }else{
            setAgree2Err(false);
        }
        if( !emailerr && !passworderr && !passwordcheckerr && !nameerr && passwordcheck && agree1 && agree2){
            nextCheck();
        }
    }
    useEffect(() => {
        if(text == ''){
            initHint();
        }else{
            searchHint({term: text});
            setTok(false)
        }
    }, [text]);
    return (
        <View style={{flex: 1, backgroundColor:'rgb(255,255,255)'}}>
            <ScrollView>
                {!isSNS ? 
                <View>
                    <View style={{height: 130 * tmpWidth, paddingLeft: 24 * tmpWidth}}>
                        <Text style={{fontSize:16 * tmpWidth, marginTop:20 * tmpWidth}}>이메일</Text>
                        <View style={styles.emailbox}>
                            <TextInput
                                value={email}
                                placeholder="이메일을 입력해주세요"
                                onChangeText={setEmail}
                                autoCapitalize='none'
                                placeholderTextColor='rgb(196,196,196)'
                                autoCorrect={false}
                                style={{fontSize:14 * tmpWidth,marginLeft:15 * tmpWidth, }}
                            />
                        </View>
                        { emailerr ?
                        <View style={styles.warningContainer}>
                            <SvgUri width='14' height='14' source={require('../assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>이메일을 입력해주세요.</Text>
                        </View> : null }
                    </View>
                    <View style={{height: 180 * tmpWidth, paddingLeft: 24 * tmpWidth}}>
                        <Text style={{fontSize:16 * tmpWidth, }}>비밀번호</Text>
                        <View style={styles.passwordbox}>
                            <TextInput
                                value={password}
                                placeholder="비밀번호를 입력해주세요."
                                onChangeText={setPassword}
                                autoCapitalize='none'
                                placeholderTextColor='rgb(196,196,196)'  
                                autoCorrect={false}
                                style={{fontSize:14 * tmpWidth,marginLeft:15 * tmpWidth,}}
                                secureTextEntry={true}
                            />
                        </View>
                        { passworderr?
                        <View style={styles.warningContainer}>
                            <SvgUri width='14' height='14' source={require('../assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>비밀번호를 입력해주세요.</Text>
                        </View> :
                        <View style={styles.warningContainer}>
                            <Text style={{marginLeft:15 * tmpWidth,fontSize:11 * tmpWidth, color:'rgb(153,153,153)'}}>6~14자 영문 대소문자,숫자,특수문자 중 2가지 이상 조합</Text>
                        </View> }
                        <View style={styles.passwordcheckbox}>
                            <TextInput
                                value={passwordcheck}
                                placeholder="비밀번호를 한번 더 입력해주세요."
                                placeholderTextColor='rgb(196,196,196)'
                                secureTextEntry={true}
                                onChangeText={setPasswordcheck}
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={{fontSize:14 * tmpWidth,marginLeft:15 * tmpWidth}}
                            />
                        </View>
                        { password != passwordcheck && passwordcheck!=undefined && passwordcheck.length>0 && !passwordcheckerr ?
                        <View style={styles.warningContainer}>
                            <SvgUri width='14' height='14' source={require('../assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>비밀번호가 일치하지 않습니다</Text>
                        </View> : null }
                        { passwordcheckerr ?
                        <View style={styles.warningContainer}>
                            <SvgUri width='14' height='14' source={require('../assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>비밀번호를 한번 더 입력해주세요</Text>
                        </View> : null }
                    </View>
                </View> : null }
                <View style={{paddingLeft: 24 * tmpWidth, marginTop: 20 * tmpWidth,height: 105 * tmpWidth}}>
                    <View style={{paddingRight: 24, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize:16 * tmpWidth, }}>아이디</Text>
                        <TouchableOpacity style={styles.doubleCheckBox} onPress={() => doubleCheck(name)}>
                            <Text style={styles.doubleCheck}>중복 체크</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.idbox}>
                        <TextInput
                            value={name}
                            placeholderTextColor='rgb(196,196,196)'
                            placeholder="아이디를 입력해주세요."
                            onChangeText={setName}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={styles.textStyle}
                        />
                    </View>
                    { double ? !state.doubleCheck ? 
                    <View style={styles.warningContainer}>
                        <SvgUri width='14' height='14' source={require('../assets/icons/warning.svg')}/>
                        <Text style={styles.warningText}>이미 존재하는 아이디입니다.</Text>
                    </View> : 
                    <View style={styles.warningContainer}>
                        <Text style={{fontSize:12 * tmpWidth, color:'rgb(153,153,153)', marginLeft:15 * tmpWidth,}}>사용 가능한 아이디입니다.</Text>
                    </View> : null }
                    { nameerr ?
                    <View style={styles.warningContainer}>
                        <SvgUri width='14' height='14' source={require('../assets/icons/warning.svg')}/>
                        <Text style={styles.warningText}>아이디를 입력해주세요.</Text>
                    </View> : null }
                </View>
                <View style={{paddingLeft: 24 * tmpWidth}}>
                    <View style={{flexDirection:'row', marginTop:55 * tmpWidth}}>
                        <TouchableOpacity style={agreeall ?styles.boxcheck : styles.boxempty}
                            onPress={()=>{
                                if (agreeall) {
                                    setAgreeall(false);
                                    setAgree1(false);
                                    setAgree2(false);
                                }
                                else{
                                    setAgreeall(true);
                                    setAgree1(true);
                                    setAgree2(true);
                                }
                            }}
                        >
                        </TouchableOpacity>
                        <Text style={{fontSize:16 * tmpWidth, color:'rgb(0,0,0)', marginLeft:8 * tmpWidth}}>전체동의</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between',marginTop:23 * tmpWidth, paddingRight: 24 * tmpWidth}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity style={agree1 ?styles.boxcheck : styles.boxempty}
                                onPress={()=>{
                                    if(agree1){
                                        setAgree1(false);
                                    }else
                                    {
                                        setAgree1(true);
                                    }
                                }}
                            >
                            </TouchableOpacity>
                            <Text style={!agree1Err ? styles.agreeText : styles.agreeWarning}>이용약관 동의 (필수)</Text>
                        </View>
                        <TouchableOpacity style={styles.detail}>
                            <Text style={{fontSize:11 * tmpWidth, color:'rgb(80,80,80)', }}>자세히 보기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', marginTop:23 * tmpWidth, alignItems: 'center', justifyContent: 'space-between', paddingRight: 24 * tmpWidth}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity style={agree2 ?styles.boxcheck : styles.boxempty}
                                onPress={()=>{
                                    if(agree2){
                                        setAgree2(false);
                                    }else
                                    {
                                        setAgree2(true);
                                    }
                                }}
                            >
                            </TouchableOpacity>
                            <Text style={!agree2Err ? styles.agreeText : styles.agreeWarning}>개인정보 수집 및 이용 동의 (필수)</Text>
                        </View>
                        <TouchableOpacity style={styles.detail}>
                            <Text style={{fontSize:11 * tmpWidth, color:'rgb(80,80,80)', }}>자세히 보기</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => singupfun()}>
                        <View style={styles.singupbutton}>
                            <Text style={{color: 'rgb(169,193,255)', fontSize:18 * tmpWidth}}>가입하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={styles.modalBackground}>
                  <View style={styles.modalbox}>
                    <View style={{width:335 * tmpWidth, height:56 * tmpWidth,flexDirection:'row'}}>
                        <TouchableOpacity style={styles.modalexiticon} onPress={()=>{
                            stoptracksong()
                            setModalVisible(false)}} >
                            <SvgUri width='100%' height='100%' source={require('../assets/icons/modalexit.svg')} />
                        </TouchableOpacity>
                        <Text style={{fontSize:16 * tmpWidth, color:'rgb(80,80,80)', marginLeft:87 * tmpWidth, marginTop:24 * tmpWidth}}>환영합니다!</Text>
                        {songs.length >=1 ?
                            <TouchableOpacity style={{width:30 * tmpWidth, height:19 * tmpWidth,marginLeft:80 * tmpWidth, marginTop:24 * tmpWidth}} onPress={async () => {
                                await signup({ email, password, name });
                                await setSongs({ songs: songs })
                                await signin({ email, password });
                                setModalVisible(false)
                                stoptracksong()}}
                            >
                                    <Text style={{fontSize:16 * tmpWidth, color:'rgba(169,193,255,0.5)'}}>완료</Text>
                            </TouchableOpacity> : null }
                    </View>
                    <View style={{width:335 * tmpWidth, height:53 * tmpWidth, backgroundColor:'#fff',flexDirection:'row'}}>
                        <View style={{width:39.3 * tmpWidth, height:40 * tmpWidth,marginLeft:13.8 * tmpWidth, marginTop:7 * tmpWidth}}>
                            <SvgUri width='100%' height='100%' source={require('../assets/icons/signupsearch.svg')}  />
                        </View>
                        <TextInput style={{fontSize:16 * tmpWidth, }}
                            value = {text}
                            placeholder="곡, 아티스트를 검색해주세요"
                            onChangeText={(text)=>{
                                setText(text)
                                if(text='') setTok(false)
                            }}
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoFocus ={true}
                            onFocus = {()=>setKey(true)}
                            onChange = {()=>setKey(true)}
                            onSubmitEditing= {()=>{
                            searchsong({ songname: text });
                            setKey(false);
                            setTok(true)
                            }}
                            placeholderTextColor ="#999"
                            onCancel={()=>searchinit()}
                        />
                    </View>
                    <View style={{height:359 * tmpWidth,width:335 * tmpWidth,backgroundColor:'rgb(250,250,250)'}}>
                        {key && text.length == 0 ? 
                        <View style={{flex:1 , justifyContent: 'center'}}>
                            <Text style={{fontSize:14 * tmpWidth, color:'rgb(118,118,118)',marginLeft:72 * tmpWidth, marginTop:18 * tmpWidth}}>회원님 취향의 곡을 등록해주세요</Text>
                            <Text style={{fontSize:12 * tmpWidth, color:'rgb(153,153,153)',marginTop:10 * tmpWidth, marginLeft:129 * tmpWidth}}>(최소 1개 이상)</Text>
                        </View> : 
                        <View>
                            {tok ? searchState.songData.length == 0 ? <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}><ActivityIndicator /></View> :
                            <FlatList
                                style={{marginTop:14 * tmpWidth}}
                                data={searchState.songData}
                                keyExtractor={song=>song._id}
                                onEndReached={onEndReached}
                                onEndReachedThreshold={0}
                                ListFooterComponent={loading && <ActivityIndicator />}
                                renderItem={({item})=> {
                                    return (
                                        <View style={ item.id == idc ? styles.picked : styles.unpicked}>
                                            <TouchableOpacity style={styles.Songs} onPress={() => {
                                                setIdc(item.id)
                                                if(isPlayingid == item.id){
                                                    stoptracksong()
                                                }else{
                                                    addtracksong({data: item})
                                                }
                                            }}>
                                                <ImageSelect opac={1.0} url={item.attributes.artwork.url} />
                                                { isPlayingid != item.id ? 
                                                <SvgUri width='20' height='20' source={require('../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> :
                                                <SvgUri width='20' height='20' source={require('../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 15 * tmpWidth, top: 15 * tmpWidth}}/> }
                                            </TouchableOpacity>
                                            
                                            <View style={{marginLeft:20 * tmpWidth, flexDirection:'row',width:243.9 * tmpWidth, alignItems: 'center'}}>
                                                <View style={{width:161.9 * tmpWidth, height:34.1 * tmpWidth }}>
                                                    <View style={{height:17 * tmpWidth,width:140 * tmpWidth, flexDirection: 'row', alignItems: 'center'}}>
                                                        {item.attributes.contentRating == "explicit" ? 
                                                        <SvgUri width={17 * tmpWidth} height={17 * tmpWidth} source={require('../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/>
                                                        : null}
                                                        <Text numberOfLines={1} style={{fontSize:14 * tmpWidth,fontWeight:'bold'}}>{item.attributes.name}</Text>
                                                    </View>
                                                    <View style={{height:17 * tmpWidth,width:161.9 * tmpWidth}}>
                                                        <Text numberOfLines={1}  style={{marginTop:4 * tmpWidth,fontSize:12 * tmpWidth, color:'rgb(148,153,163)'}}>{item.attributes.artistName}</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={() => { setIdc(item.id); addItem({data: item}); }}>
                                                    <View style={styles.pickbox}>
                                                        <Text style={{fontSize:11 * tmpWidth, color:'rgb(160,172,211)'}}>선택</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                                        </View>
                                    )
                                }}
                            /> : 
                            <FlatList 
                                style={styles.hintContainer}
                                data={searchState.hint}
                                keyExtractor={term=>term}
                                renderItem={({item})=> {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            searchsong({ songname: item})
                                            setTok(true)}}>
                                            <Text style={styles.hintText}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />}
                        </View> }
                    </View>
                    <View style={{width:335 * tmpWidth, height:96 * tmpWidth, backgroundColor:'rgba(169,193,255,0.2)'}}>
                        <FlatList
                            style={{marginLeft:16 * tmpWidth,marginTop:16 * tmpWidth}}
                            data={songs}
                            keyExtractor={song=>song._id}
                            horizontal={true}
                            maxToRenderPerBatch={1}
                            renderItem={({item})=> {
                                return (
                                    <TouchableOpacity style={{width:64 * tmpWidth, height:64 * tmpWidth, marginRight:14 * tmpWidth}} onPress={() => deleteItem({data: item})}>
                                        <View style={{alignItems: 'center'}}>
                                            <View style={{width:64 * tmpWidth, height:64 * tmpWidth}}>
                                                <ImageSelect opac={1.0} url={item.attributes.artwork.url}></ImageSelect>
                                            </View>
                                            <SvgUri width={20 * tmpWidth} height={20 * tmpWidth} source={require('../assets/icons/modalexit.svg')} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    </View>
    );
};

SignupPage.navigationOptions = ({navigation}) =>{
    return {
        title: '회원가입',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth
        },
        headerStyle: {
            backgroundColor: 'rgb(254,254,254)',
            height: 92 * tmpWidth ,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowRadius: 0,
            shadowOpacity: 0,
        },
        headerLeft: () => {
            return (
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth }} onPress={() => navigation.goBack()}>
                    <SvgUri width={40 * tmpWidth} height={40* tmpWidth} source={require('../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        }
    };
};

const styles = StyleSheet.create({
    Songs: {
        width: 50 * tmpWidth,
        height: 50 * tmpWidth,
        marginTop: 6 * tmpWidth,
        marginLeft: 20.5 * tmpWidth,
    },
    song: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems:'center', 
        margin: 10 * tmpWidth
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
        height: "100%",
        alignItems: 'center'
    },
    textStyle: {
        marginLeft: 20 * tmpWidth
    },

    errorMessage: {
        fontSize: 16 * tmpWidth,
        color: 'red',
        marginTop: 15 * tmpWidth
    },
    emailbox:{
        marginTop:20 * tmpWidth,
        borderRadius:8 * tmpWidth,
        backgroundColor:'rgba(169,193,255,0.2)',
        width:328 * tmpWidth,
        height:43 * tmpWidth,
        justifyContent:'center',
    },
    passwordbox:{
        width:328 * tmpWidth,
        justifyContent:'center' ,
        height:43 * tmpWidth,
        borderRadius:8 * tmpWidth,
        backgroundColor:'rgba(169,193,255,0.2)',
        marginTop:20 * tmpWidth
    },
    passwordcheckbox:{
        width:328 * tmpWidth,
        justifyContent:'center' ,
        height:43 * tmpWidth,
        borderRadius:8 * tmpWidth,
        backgroundColor:'rgba(169,193,255,0.2)',
        marginTop:20 * tmpWidth
    },
    idbox:{
        width:328 * tmpWidth,
        justifyContent:'center' ,
        height:43 * tmpWidth,
        borderRadius:8 * tmpWidth,
        backgroundColor:'rgba(169,193,255,0.2)',
        marginTop:20 * tmpWidth
    },
    errornotice:{
        marginLeft:39 * tmpWidth,
        fontSize:12 * tmpWidth,
        color:'rgb(238,98,92)',
        marginTop:6 * tmpWidth
    },
    boxcheck:{
        width:14 * tmpWidth,
        height:14 * tmpWidth,
        borderRadius:4 * tmpWidth,
        borderWidth:1 * tmpWidth,
        borderColor:'rgb(153,153,153)',
        backgroundColor:'rgba(169,193,255,0.2)',
    },
    boxempty:{
        width:14 * tmpWidth,
        height:14 * tmpWidth,
        borderRadius:4 * tmpWidth,
        borderWidth:1 * tmpWidth,
        borderColor:'rgb(153,153,153)',
    },
    detail:{
        borderBottomWidth:0.5 * tmpWidth,
        borderColor:'rgb(80,80,80)'
    },
    singupbutton:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:38 * tmpWidth,
        width:327 * tmpWidth,
        height:52 * tmpWidth,
        borderRadius:100 * tmpWidth,
        borderWidth:1 * tmpWidth,
        borderColor:'rgb(169,193,255)',
        marginBottom: 38 * tmpWidth
    },
    modalbox:{
        width:335 * tmpWidth,
        height:564 * tmpWidth,
        borderRadius:18 * tmpWidth,
        backgroundColor:'rgb(255,255,255)'
    },
    modalexiticon:{
        width:32 * tmpWidth,
        height:32 * tmpWidth,
        marginTop:10 * tmpWidth,
        marginLeft:10 * tmpWidth,
    },
    picked:{
        flexDirection: 'row',
        backgroundColor:'rgb(238,244,255)',
        width:335 * tmpWidth,
        height:61.2 * tmpWidth,
        marginBottom:2 * tmpWidth
    },
    unpicked:{
        flexDirection: 'row',
        width:335 * tmpWidth,
        height:61.2 * tmpWidth,
        marginBottom:2 * tmpWidth
    },
    pickbox:{
        justifyContent:'center',
        alignItems:'center',
        marginLeft:16 * tmpWidth,
        width:37.9 * tmpWidth,
        height:21.1 * tmpWidth,
        borderRadius:100 * tmpWidth,
        borderWidth:1 * tmpWidth,
        borderColor:'rgb(169,193,255)'
    },
    warningIcon: {
        width: 14 * tmpWidth,
        height: 14 * tmpWidth,
        backgroundColor: 'rgb(238,98,92)'
    },
    warningText: {
        color:'rgb(238, 98, 92)', 
        marginLeft: 4 * tmpWidth, 
        fontSize: 12 * tmpWidth
    },
    warningContainer: {
        flexDirection: 'row', 
        marginTop: 8 * tmpWidth, 
    },
    agreeText: {
        fontSize:14 * tmpWidth, 
        color:'rgb(153,153,153)', 
        marginLeft:8 * tmpWidth
    },
    agreeWarning: {
        color:'rgb(238, 98, 92)', 
        fontSize:14 * tmpWidth, 
        marginLeft:8 * tmpWidth
    },
    hintContainer: {
        marginLeft: 24 * tmpWidth, 
        marginTop: 20 * tmpWidth, 
    },
    hintText: {
        fontSize: 14 * tmpWidth, 
        marginBottom: 24 * tmpWidth
    },
    doubleCheckBox: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100 * tmpWidth,
        borderWidth:1 * tmpWidth,
        borderColor:'rgb(169,193,255)',
    },
    doubleCheck: {
        color: 'rgb(169,193,255)', 
        fontSize:10 * tmpWidth, 
        paddingLeft: 5 * tmpWidth, 
        paddingRight: 4 * tmpWidth, 
        paddingTop: 2 * tmpWidth, 
        paddingBottom: 2 * tmpWidth
    }
});
export default SignupPage;