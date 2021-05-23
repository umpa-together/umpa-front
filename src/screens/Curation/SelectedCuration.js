import React, { useContext,useEffect, useState } from 'react';
import { View, Text, Image, ScrollView,Keyboard,KeyboardEvent ,ImageBackground,StyleSheet,ActivityIndicator ,TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Context as CurationContext } from '../../context/CurationContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { Context as DJContext } from '../../context/DJContext';
import { navigate } from '../../navigationRef';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';

const Imagetake = ({url , border, opac}) => {
    url =url.replace('{w}', '700');
    url = url.replace('{h}', '700');
    return <Image style ={{ opacity : opac, height:'100%', width:'100%',borderRadius: border }} resizeMode ="stretch"  source ={{url:url}}/>
};

const Imagebacktake = ({url , border, opac}) => {
    url =url.replace('{w}', '700');
    url = url.replace('{h}', '700');
    return  <ImageBackground style ={{ opacity : opac, height:'100%', width:'100%',borderRadius: border }} resizeMode ="stretch"  source ={{url:url}}/>
};

const SelectedCuration = ({navigation}) => {
    const {state, postCuration, getmyCuration, deleteCuration, getCurationposts, likecurationpost,unlikecurationpost, getuserCurationposts} = useContext(CurationContext);
    const { state: userState, getOtheruser } = useContext(UserContext);
    const { getUserPlaylists } = useContext(PlaylistContext);
    const { getSongs } = useContext(DJContext);

    const [hidden, setHidden] = useState(false);
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [postModal, setPostModal] = useState(false);
    const [number, setNumber] = useState(0);
    const [cidx, setCidx] = useState(0);
    const [ref, setRef] = useState(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [showpost, setShowpost] = useState(false);
    const [selectedCuration, setSelectedCuration] = useState('');
    const curationid= navigation.getParam('id');
    const postid= navigation.getParam('postid');

    const onClose =() => {
        setShowModal(false);
    }

    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }
    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }
    useEffect(()=>{
        const listener =navigation.addListener('didFocus', ()=>{
            Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
            


        });
 

        return () => {
            Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
            listener.remove();
        };
        
    }, []);

    useEffect(()=>{
        if(ref !=null && state.currentCurationpost!=null && postid!=null){
            const idx = state.currentCurationpost.findIndex(el => el._id ==postid);
            setCidx(idx);
        }

    },[ref, state.currentCurationpost]);

    useEffect(()=>{
        state.currentCurationpost.sort(function(a, b) {
            if(a.likes.length > b.likes.length) return -1;
            if(a.likes.length < b.likes.length) return 1;
            return 0;
        }); 

    },[state.currentCurationpost]);    

    return (
        <View style={{backgroundColor:'rgba(252,252,253,1)'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {state.currentCuration.songoralbumid == undefined || (state.currentCuration.songoralbumid !=curationid) ? <ActivityIndicator/> :
                <View>
                    <View style={{position :"absolute", zIndex:-2, width: 375 * tmpWidth, height:356 * tmpWidth}}>
                        {state.currentCuration.isSong ? <Imagebacktake opac={0.4} url={state.currentCuration.object.attributes.artwork.url}></Imagebacktake> : <Imagebacktake opac={0.4} url={state.currentCuration.object.artwork.url}></Imagebacktake>}
                    </View>
                    <View style={styles.back}>
                        <TouchableOpacity style={{ zIndex:2, height:40 * tmpWidth, width:40 * tmpWidth, marginLeft: 12 * tmpWidth}} onPress={()=>navigation.pop()}>
                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/selectedcurationback.svg')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:204 * tmpWidth, height:204 * tmpWidth, marginTop:27 * tmpWidth, marginLeft:86 * tmpWidth}}>
                        {state.currentCuration.isSong ? <Imagetake  border ={200 * tmpWidth} opac={1} url={state.currentCuration.object.attributes.artwork.url}></Imagetake> : <Imagetake opac={1} border={200 * tmpWidth} url={state.currentCuration.object.artwork.url}></Imagetake>}
                    </View>
                    <View style={styles.curationinfo}>
                        {state.currentCuration.isSong ?
                        <View style={{alignItems:'center'}}>
                            <Text style={{color : 'black' , fontSize : 18 * tmpWidth, marginTop:16 * tmpWidth }}>{state.currentCuration.object.attributes.name}</Text>
                            <Text style={{marginTop:6 * tmpWidth, fontSize:14 * tmpWidth, color:"#737373"}}>{state.currentCuration.object.attributes.artistName}</Text>
                        </View> :
                        <View style={{alignItems:'center'}}>
                            <Text style={{color : 'black' , fontSize : 18 * tmpWidth ,marginTop:16 * tmpWidth}}>{state.currentCuration.object.albumName}</Text>
                            <Text style={{marginTop:6 * tmpWidth, fontSize:14 * tmpWidth, color:"#737373"}}>{state.currentCuration.object.artistName}</Text>
                        </View> }
                        <Text style={{marginTop:10 * tmpWidth, fontSize:14 * tmpWidth, color:"#737373"}}>{'큐레이션에 참여한 사람 '+state.currentCuration.participate.length+'명'}</Text>
                    </View>
                    <View style ={styles.curationpost}>
                        <View style={{justifyContent:'center',width:335/2 * tmpWidth,backgroundColor:'rgba(252,252,253,1)' }}>
                            <Text style={{fontSize:14 * tmpWidth, color:"rgba(79,79,79,1)"}}>큐레이션 {state.currentCuration.participate.length}개</Text>
                        </View>
                        <View style={{alignItems:'flex-end', width:335/2 * tmpWidth,backgroundColor:'rgba(252,252,253,1)'}}>
                            {state.currentCuration.participate.includes(userState.myInfo._id) ?
                            <TouchableOpacity
                                 onPress={() => {
                                 setShowModal(true)
                                 getmyCuration({id:state.currentCuration.songoralbumid})
                            }}
                                style={{alignItems:'flex-end', justifyContent:'flex-end',width:70 * tmpWidth, height:40 * tmpWidth,justifyContent:'center'}}>
                               <Text style={{fontSize:14, color:'rgb(79,79,79)'}}>작성글 보기</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity
                                onPress={() => {
                                    setPostModal(true)
                            }}
                                style={{alignItems:'flex-end', justifyContent:'flex-end',width:40 * tmpWidth, height:40 * tmpWidth,}}>
                                <SvgUri width='40' height='40' source={require('../../assets/icons/curationwrite.svg')}/>
                            </TouchableOpacity> }
                        </View>
                    </View>
                    <View style={{backgroundColor:'rgba(252,252,253,1)', height:340 * tmpWidth}}>
                        { state.currentCurationpost.length == 0 ? 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'rgb(93,93,93)'}}>현재 작성된 큐레이션이 없습니다.</Text>
                            <Text style={{color: 'rgb(93,93,93)', marginTop: 10 * tmpWidth}}>당신의 큐레이션을 작성해주세요!</Text>
                        </View> : 
                        <FlatList
                            style={{marginTop:8 * tmpWidth}}
                            data={state.currentCurationpost}
                            keyExtractor={comment => comment._id}
                            initialScrollIndex ={cidx}
                            ref={(ref)=>setRef(ref)}
                            getItemLayout={(data,index)=>(
                                 {length: 134 * tmpWidth, offset: 134 * tmpWidth*index, index}
                            )}
                            renderItem={({item}) =>{
                                return(
                                    <TouchableOpacity onPress={()=>{
                                        setSelectedCuration(item);
                                        setShowpost(true);
                                    }}>
                                        <View style={styles.curationpostitem}>
                                            <TouchableOpacity onPress={() => {
                                                if(item.postUserId._id == userState.myInfo._id){
                                                    navigate('Account');
                                                }else{
                                                    getUserPlaylists({id:item.postUserId._id});
                                                    getOtheruser({id:item.postUserId._id});
                                                    getSongs({id:item.postUserId._id});
                                                    getuserCurationposts({id: item.postUserId._id});
                                                    navigate('OtherAccount');
                                                }}}
                                                style={{width:32 * tmpWidth, height:32 * tmpWidth, marginTop:12 * tmpWidth, marginLeft:16 * tmpWidth}}>
                                                {item.postUserId.profileImage == null || item.postUserId.profileImage == undefined ?
                                                    <View style={styles.profileImage}>
                                                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                    </View> : <Image style={{width:'100%', height:'100%', borderRadius:32 * tmpWidth }}source={{uri: item.postUserId.profileImage}} /> }
                                            </TouchableOpacity>
                                            <View>
                                                <View style={{flexDirection:'row',  height:32 * tmpWidth, width:200 * tmpWidth,marginTop:10 * tmpWidth, }}>
                                                    <View style={{width:200 * tmpWidth,height:32 * tmpWidth, flexDirection:'row',alignItems:'center'}}>
                                                        <Text numberOfLines={1} style={{fontSize:12 * tmpWidth,marginLeft:11 * tmpWidth,}}>{item.postUser}</Text>
                                                        {item.hidden ?
                                                        <SvgUri width={24 * tmpWidth} height={24 * tmpWidth} source={require('../../assets/icons/locked.svg')}/>
                                                        : null }
                                                    </View>
                                                    <View style={{width:88 * tmpWidth,height:32 * tmpWidth, alignItems:'center', marginLeft:18*tmpWidth, flexDirection:'row'}}>
                                                        { item.hidden ? null :
                                                        item.likes.includes(userState.myInfo._id) ?
                                                            <TouchableOpacity
                                                                style={{height:24 * tmpWidth, width:24 * tmpWidth,marginRight:4 * tmpWidth}}
                                                                onPress={()=>{unlikecurationpost({id:item._id, songoralbumid:item.songoralbumid}); }}
                                                            >
                                                                <SvgUri width={24 * tmpWidth} height={24 * tmpWidth} source={require('../../assets/icons/curationheartfilled.svg')}/>
                                                            </TouchableOpacity> :
                                                            <TouchableOpacity
                                                                style={{height:24 * tmpWidth, width:24 * tmpWidth,marginRight:4 * tmpWidth}}
                                                                onPress={()=>{ likecurationpost({id:item._id, songoralbumid:item.songoralbumid});}}
                                                            >
                                                                <SvgUri width={24 * tmpWidth} height={24 * tmpWidth} source={require('../../assets/icons/curationheart.svg')}/>
                                                            </TouchableOpacity> }
                                                        {item.likes.length==0 ? null: <Text style={{fontSize:12 * tmpWidth, color:'rgb(115,115,115)'}}>{item.likes.length}</Text> }
                                                    </View>
                                                </View>
                                                <View style={{ width:275 * tmpWidth, height:64 * tmpWidth}}>
                                                {item.hidden ? <Text style ={{fontSize:12 * tmpWidth, marginTop:8 * tmpWidth, marginLeft:11 * tmpWidth,color:"rgba(93,93,93,1)"}}>비밀글 입니다.</Text>:
                                                <Text numberOfLines ={5} style ={{fontSize:12 * tmpWidth, marginTop:8 * tmpWidth, marginLeft:11 * tmpWidth,color:"rgba(93,93,93,1)"}}>{item.textcontent}</Text>
                                                }                                                
                                                </View>
                                            </View>
                                        </View>
                                  </TouchableOpacity>
                                );
                            }}
                        /> }
                        { showpost ?
                        <Modal
                          isVisible={true}
                          onBackdropPress={()=>{setShowpost(false);}}
                          backdropOpacity={0.4}
                          style={{justifyContent:'center', marginBottom:keyboardHeight }}
                        >
                            <View style={{width:335 * tmpWidth, height:374 * tmpWidth, borderRadius:8 * tmpWidth, backgroundColor:'#fff' }}>
                                <View>
                                    <View style={styles.curationpostuser}>
                                        <TouchableOpacity
                                            onPress={() => {
                                            if(selectedCuration.postUserId._id == userState.myInfo._id){
                                                navigate('Account');
                                            }else{
                                                getUserPlaylists({id: selectedCuration.postUserId._id});
                                                getOtheruser({id:selectedCuration.postUserId._id});
                                                getSongs({id: selectedCuration.postUserId._id});
                                                getCurationposts({id: selectedCuration.postUserId._id});
                                                navigate('OtherAccount');
                                            }}}
                                            style={{width:32 * tmpWidth, height:32 * tmpWidth}}
                                        >
                                            { selectedCuration.postUserId.profileImage == null || selectedCuration.postUserId.profileImage == undefined ?
                                                <View style={styles.profileImage}>
                                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                </View> :
                                                <Image style={{width:'100%', height:'100%', borderRadius:32 * tmpWidth }} source={{uri: selectedCuration.postUserId.profileImage}} ></Image> }
                                        </TouchableOpacity>
                                        <View style={{width:210 * tmpWidth, height:32 * tmpWidth, justifyContent:'center'}}>
                                            <Text style={{marginLeft:12 * tmpWidth}}>{selectedCuration.postUser}</Text>
                                        </View>
                                    </View>
                                    <View style={{width:238 * tmpWidth, marginTop:12 * tmpWidth, marginLeft:56 * tmpWidth, height:277 * tmpWidth}}>
                                    {selectedCuration.hidden ? 
                                        <ScrollView
                                            persistentScrollbar={true}
                                            showsVerticalScrollIndicator={true}
                                            style={{width:240 * tmpWidth, height:277 * tmpWidth}}
                                        >
                                            <Text style={{fontSize:12 * tmpWidth, color:'rgb(93,93,93)'}}>비밀글 입니다.</Text>
                                        </ScrollView> :
                                        <ScrollView
                                            persistentScrollbar={true}
                                            showsVerticalScrollIndicator={true}
                                            style={{width:240 * tmpWidth, height:277 * tmpWidth}}
                                        >
                                            <Text style={{fontSize:12 * tmpWidth, color:'rgb(93,93,93)'}}>{selectedCuration.textcontent}</Text>
                                        </ScrollView> }
                                    </View>
                                </View>
                            </View>
                        </Modal> : null }
                        { showModal ?
                        <Modal
                            isVisible={true}
                            onBackdropPress={onClose}
                            backdropOpacity={0.4}
                            style={{justifyContent:'center', marginBottom:keyboardHeight}}
                        >
                            <View style={{width:335 * tmpWidth, height:374 * tmpWidth, borderRadius:8 * tmpWidth, backgroundColor:'#fff', }}>
                                { state.mycurationpost.likes == undefined ? <ActivityIndicator/> :
                                <View>
                                    <View style={{width:319 * tmpWidth, alignItems:'center', flexDirection:'row', marginTop:24 * tmpWidth, marginLeft:16 * tmpWidth, height:32 * tmpWidth}}>
                                        <TouchableOpacity style={{width:32 * tmpWidth, height:32 * tmpWidth}}>
                                            {state.mycurationpost.postUserId.profileImage == null || state.mycurationpost.postUserId.profileImage==undefined ?
                                            <View style={styles.profileImage}>
                                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                            </View> : <Image style={{width:'100%', height:'100%', borderRadius:32 }}source={{uri: state.mycurationpost.postUserId.profileImage}}/> }
                                        </TouchableOpacity>
                                        <View style={{width:210 * tmpWidth, alignItems:'center', flexDirection:'row'}}>
                                            <Text style={{marginLeft:12 * tmpWidth}}>{state.mycurationpost.postUser}</Text>
                                            {state.mycurationpost.hidden ? 
                                                <SvgUri width={24 * tmpWidth} height={24 * tmpWidth} source={require('../../assets/icons/locked.svg')}/>
                                            : null }
                                        </View>
                                        <View style={{width:50 * tmpWidth,height:20 * tmpWidth}}>
                                            <TouchableOpacity onPress={()=>{ deleteCuration({id:state.mycurationpost._id.toString()  }); onClose(); }}>
                                                <Text>삭제하기</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{width:238 * tmpWidth, marginTop:24 * tmpWidth, marginLeft:60 * tmpWidth, height:277 * tmpWidth}}>
                                        <ScrollView
                                            persistentScrollbar={true}
                                            showsVerticalScrollIndicator={true}
                                            style={{width:240 * tmpWidth, height:318 * tmpWidth}}
                                         >
                                            <Text>{state.mycurationpost.textcontent}</Text>
                                        </ScrollView>
                                    </View>
                                </View> }
                            </View>
                        </Modal> :null }
                        { postModal ?
                        <Modal
                            isVisible={true}
                            onBackdropPress={()=>{setPostModal(false); setText('');}}
                            backdropOpacity={0.3}
                            style={{justifyContent:'flex-end', margin:0}}
                        >
                            <View style={{height:392 * tmpWidth, marginBottom:keyboardHeight, backgroundColor:'#fff'}}>
                                <View>
                                    <View style={styles.postheader}>
                                        <Text style={{marginBottom:10 * tmpWidth, fontSize:16 * tmpWidth}}>큐레이션 쓰기</Text>
                                        <Text style={{marginBottom:10 * tmpWidth, fontSize:14 * tmpWidth, color:'rgb(79,79,79)'}}>  (최소 50자 이상 )</Text>
                                        <TouchableOpacity onPress={()=>{setPostModal(false); setText('');}} style={styles.modalexit2}>
                                            <SvgUri width='100%' height='100%' source={require('../../assets/icons/invalidName.svg')}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style ={styles.posttextbox}>
                                        <TextInput
                                            style={{ width:297 * tmpWidth,marginLeft:10 * tmpWidth,
                                                     height:217 * tmpWidth, fontSize:16 * tmpWidth, marginTop:5*tmpWidth}}
                                            value = {text}
                                            onChangeText={text=>setText(text)}
                                            placeholder="큐레이션을 적어주세요"
                                            multiline={true}
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                            placeholderTextColor ="rgb(196,196,196)"
                                            keyboardType = "email-address"
                                        />
                                    </View>
                                    <View style ={styles.postopt}>
                                        <View style={{width:327/2 * tmpWidth, height:40 * tmpWidth, flexDirection:'row'}}>
                                            <Text style={{marginTop:8 * tmpWidth, fontSize:14 * tmpWidth, color:'rgb(79,79,79)'}}>비밀글</Text>
                                            {hidden ?
                                            <TouchableOpacity onPress={()=>setHidden(false)} style={{width:14 * tmpWidth, height:14 * tmpWidth,backgroundColor:'rgb(168,192,239)', marginTop:9 * tmpWidth, marginLeft:7 * tmpWidth, }}>
                                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/invalidName.svg')}/>
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={()=>setHidden(true)}  style={{width:14 * tmpWidth, height:14 * tmpWidth,marginTop:9 * tmpWidth, marginLeft:7 * tmpWidth, borderWidth:0.5 * tmpWidth}}>
                                            </TouchableOpacity> }
                                        </View>
                                        <View style={{width:327/2 * tmpWidth, height:40 * tmpWidth,alignItems:'flex-end'}}>
                                            <Text style={{marginTop:8 * tmpWidth,fontSize:14 * tmpWidth,color:'rgb(196,196,196)'}}>{text.length}/5000</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.postbutton}>
                                    { text.length >= 50  ?
                                    <TouchableOpacity
                                        style={{ width:327 * tmpWidth, height:52 * tmpWidth, justifyContent:'center', alignItems:'center'}}
                                        onPress ={() => {
                                            if(text.length>=50){
                                            postCuration({isSong:state.currentCuration.isSong , hidden : hidden,  object:state.currentCuration.object, textcontent:text, id:state.currentCuration.songoralbumid})
                                            setPostModal(false);
                                            setText('');
                                            }
                                        }}
                                    >
                                        <Text style={{color:"#fff",fontSize:18 * tmpWidth,}}>업로드하기</Text>
                                    </TouchableOpacity> :
                                    <View style={{ width:327 * tmpWidth, height:52 * tmpWidth, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{color:"#fff",fontSize:18 * tmpWidth,}}>50자 이상 입력해주세요</Text>
                                    </View> }
                                </View>
                            </View>
                        </Modal> :null }
                    </View>
                </View> }
          </ScrollView>
        </View>
    );
};

SelectedCuration.navigationOptions = () =>{
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    inputBox : {
        borderWidth:0.8 * tmpWidth,
        borderRadius:5 * tmpWidth,
        borderColor : "#000",
        width:'80%',
        height: '70%',
    },
    profileImage: {
        width: 32 * tmpWidth,
        height: 32 * tmpWidth,
        borderRadius: 50 * tmpWidth,
        backgroundColor:"#222"
    },
    back:{
        zIndex:-1,
        width : 375 * tmpWidth,
        height:0,
        backgroundColor:'white',
        marginTop:44 * tmpWidth,
        flexDirection:'row'
    },
    curationinfo:{
        elevation:5,
        shadowColor : "rgba(234,234,234,1)" ,
        shadowOffset:{width:0, height:3 * tmpWidth},
        shadowOpacity:0.5 ,
        shadowRadius:3 * tmpWidth ,
        alignItems : 'center',
        marginTop: 41 * tmpWidth,
        marginLeft:20 * tmpWidth,
        width:335 * tmpWidth,
        height:108 * tmpWidth,
        borderRadius:16 * tmpWidth,
        backgroundColor:"#fff"
    },
    curationpost:{
        flexDirection:'row',
        backgroundColor:'rgba(252,252,253,1)',
        marginLeft:21 * tmpWidth,
        height:35 * tmpWidth,
        marginTop:14 * tmpWidth,
        width:335 * tmpWidth ,
    },
    curationpostitem:{
        elevation:5 * tmpWidth,
        shadowColor : "rgba(235,236,238,1)" ,
        shadowOffset:{width:0, height:0},
        shadowOpacity:1 * tmpWidth,
        shadowRadius:10 * tmpWidth,
        borderRadius:10 * tmpWidth,
        flexDirection:'row',
        width:335 * tmpWidth,
        height:134 * tmpWidth,
        marginLeft:20 * tmpWidth,
        backgroundColor:"#fff",
        marginBottom:8 * tmpWidth
    },
    curationpostuser:{
        width:319 * tmpWidth,
        alignItems:'center',
        flexDirection:'row',
        marginTop:24 * tmpWidth,
        marginLeft:16 * tmpWidth,
        height:32 * tmpWidth
    },
    modalexit2:{
        marginLeft:90 * tmpWidth,
        width:50 * tmpWidth,
        height:50 * tmpWidth,
        justifyContent:'center',
        alignItems:'center'
    },
    postheader:{
        marginLeft:24 * tmpWidth,
        alignItems:'flex-end',
        flexDirection:'row',
        height:53 * tmpWidth,
        width:327 * tmpWidth
    },
    posttextbox:{
        marginLeft:20 * tmpWidth,
        fontSize: 16 * tmpWidth,
        borderColor : "#ddd",
        borderRadius:8 * tmpWidth,
        borderWidth:0.8 * tmpWidth,
        width:327 * tmpWidth,
        height:227 * tmpWidth,
    },
    postbutton:{
        flexDirection:'row',
        marginLeft:24 * tmpWidth,
        marginTop:24 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        width:327 * tmpWidth,
        height:52 * tmpWidth,
        backgroundColor:"rgb(169,193,255)",
        borderRadius:100 * tmpWidth
    },
    postopt:{
        marginLeft: 24 * tmpWidth,
        width:327 * tmpWidth,
        height:16 * tmpWidth,
        flexDirection :'row',
        justifyContent:'flex-start'
    },
});

export default SelectedCuration ;