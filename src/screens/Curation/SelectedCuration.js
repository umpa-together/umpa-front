import React, { useContext,useEffect, useState } from 'react';
import { View, Text, Image, ScrollView,Keyboard,KeyboardEvent ,ImageBackground,StyleSheet,ActivityIndicator ,TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Context as CurationContext } from '../../context/CurationContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as DJContext } from '../../context/DJContext';
import { navigate } from '../../navigationRef';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import TrackPlayer from 'react-native-track-player';
import { tmpWidth } from '../../components/FontNormalize';
import ReportModal from '../../components/ReportModal';
import DeleteModal from '../../components/DeleteModal';
import HarmfulModal from '../../components/HarmfulModal';

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
    const { state, postCuration, getmyCuration, likecurationpost,unlikecurationpost,editCuration, getCurationposts } = useContext(CurationContext);
    const { state: userState, getOtheruser, getMyInfo } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const [hidden, setHidden] = useState(false);
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [postModal, setPostModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editid, setEditid] = useState();

    const [cidx, setCidx] = useState(0);
    const [ref, setRef] = useState(null);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [showpost, setShowpost] = useState(false);
    const [selectedCuration, setSelectedCuration] = useState('');
    const curationid= navigation.getParam('id');
    const postid= navigation.getParam('postid');
    const [reportModal, setReportModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [harmfulModal, setHarmfulModal] = useState(false);
    const [currentCuration, setCurrentCuration] = useState(state.currentCuration);
    const [currentCurationPosts, setCurrentCurationPosts] = useState([]);
    console.log(state.currentCuration.songoralbumid)
    const onClose =() => {
        setShowModal(false);
    }
    const addtracksong= async ({data}) => {
        const track = new Object();
        track.id = data.id;
        track.url = data.attributes.previews[0].url;
        track.title = data.attributes.name;
        track.artist = data.attributes.artistName;
        if (data.attributes.contentRating != "explicit") {
            setIsPlayingid(data.id);
            await TrackPlayer.reset()
            await TrackPlayer.add(track);
            TrackPlayer.play();
        } else {
            setHarmfulModal(true)
        }
    };
    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])
    const stoptracksong= async () => {    
        setIsPlayingid('0');
        await TrackPlayer.reset()
    };

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
        })
        return () => {
            Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
            stoptracksong()
            listener.remove();
        };
    }, []);

    useEffect(()=>{
        if(ref !=null && state.currentCurationpost!=null && state.currentCurationpost!=undefined&&postid!=null){
            const idx = state.currentCurationpost.findIndex(el => el._id ==postid);
            setCidx(idx);
        }
    },[ref, state.currentCurationpost]);

    useEffect(() => {
        if(state.currentCuration.songoralbumid == curationid){
            setCurrentCurationPosts(state.currentCurationpost)
        }
    }, [state.currentCurationpost])
    useEffect(() => {
        if(state.currentCuration != {} && state.currentCuration.songoralbumid == curationid)   setCurrentCuration(state.currentCuration)
    }, [curationid, state.currentCuration])
    return (
        <View style={{backgroundColor:'rgba(252,252,253,1)', flex: 1}}>
            {currentCuration.songoralbumid == undefined || (currentCuration.songoralbumid != curationid) ? 
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}><ActivityIndicator/></View> :
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{position :"absolute", zIndex:-2, width: 375 * tmpWidth, height:356 * tmpWidth}}>
                        {currentCuration.isSong ? <Imagebacktake opac={0.4} url={currentCuration.object.attributes.artwork.url}></Imagebacktake> : <Imagebacktake opac={0.4} url={currentCuration.object.artwork.url}></Imagebacktake>}
                    </View>
                    <View style={styles.back}>
                        <TouchableOpacity style={{ zIndex:2, marginLeft: 12 * tmpWidth}} onPress={()=>navigation.pop()}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/playlistBack.svg')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:204 * tmpWidth, height:204 * tmpWidth, marginTop:27 * tmpWidth, marginLeft:86 * tmpWidth}}>
                        {currentCuration.isSong ? 
                        <TouchableOpacity onPress={() => {
                            if(isPlayingid == currentCuration.object.id){
                                stoptracksong()
                            }else{
                                addtracksong({data: currentCuration.object})
                            }
                        }}>
                            <Imagetake border ={200 * tmpWidth} opac={1} url={currentCuration.object.attributes.artwork.url} /> 
                            { isPlayingid != currentCuration.object.id ? 
                            <SvgUri width='76' height='76' source={require('../../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 64 * tmpWidth, top: 64 * tmpWidth}}/> :
                            <SvgUri width='76' height='76' source={require('../../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 64 * tmpWidth, top: 64 * tmpWidth}}/> }
                        </TouchableOpacity> :
                        <Imagetake opac={1} border={200 * tmpWidth} url={currentCuration.object.artwork.url} /> }
                        { harmfulModal ? <HarmfulModal harmfulModal={harmfulModal} setHarmfulModal={setHarmfulModal}/> : null }
                    </View>
                    <View style={styles.curationinfo}>
                        {currentCuration.isSong ?
                        <View style={{alignItems:'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', width: 280 * tmpWidth, justifyContent: 'center'}}>
                                {currentCuration.object.attributes.contentRating == "explicit" ? 
                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth, marginTop:16 * tmpWidth}}/> 
                                : null }
                                <Text style={{color : 'black' , fontSize : 18 * tmpWidth, marginTop:16 * tmpWidth }} numberOfLines={1}>{currentCuration.object.attributes.name}</Text>
                            </View>
                            <View style={{width: 280 * tmpWidth, alignItems: 'center'}}>
                                <Text style={{marginTop:6 * tmpWidth, fontSize:14 * tmpWidth, color:"#737373"}} numberOfLines={1}>{currentCuration.object.attributes.artistName}</Text>
                            </View>
                        </View> :
                        <View style={{alignItems:'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', width: 280 * tmpWidth, justifyContent: 'center'}}>
                                {currentCuration.object.contentRating == "explicit" ? 
                                <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth, marginTop:16 * tmpWidth}}/> 
                                : null }
                                <Text style={{color : 'black' , fontSize : 18 * tmpWidth ,marginTop:16 * tmpWidth}} numberOfLines={1}>{currentCuration.object.albumName}</Text>
                            </View>
                            <View style={{width: 280 * tmpWidth, alignItems: 'center'}}>
                                <Text style={{marginTop:6 * tmpWidth, fontSize:14 * tmpWidth, color:"#737373"}} numberOfLines={1}>{currentCuration.object.artistName}</Text>
                            </View>
                        </View> }
                        <Text style={{marginTop:10 * tmpWidth, fontSize:14 * tmpWidth, color:"#737373"}}>{'큐레이션에 참여한 사람 '+currentCuration.participate.length+'명'}</Text>
                    </View>
                    <View style ={styles.curationpost}>
                        <View style={{justifyContent:'center',width:335/2 * tmpWidth,backgroundColor:'rgba(252,252,253,1)' }}>
                            <Text style={{fontSize:14 * tmpWidth, color:"rgba(79,79,79,1)"}}>큐레이션 {currentCuration.participate.length}개</Text>
                        </View>
                        <View style={{alignItems:'flex-end', width:335/2 * tmpWidth,backgroundColor:'rgba(252,252,253,1)'}}>
                            {currentCuration.participate.includes(userState.myInfo._id) ?
                            <TouchableOpacity
                                 onPress={() => {
                                 setShowModal(true)
                                 getmyCuration({id:currentCuration.songoralbumid})
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
                        { currentCurationPosts.length == 0 ? 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'rgb(93,93,93)'}}>현재 작성된 큐레이션이 없습니다.</Text>
                            <Text style={{color: 'rgb(93,93,93)', marginTop: 10 * tmpWidth}}>당신의 큐레이션을 작성해주세요!</Text>
                        </View> : 
                        <FlatList
                            style={{marginTop:8 * tmpWidth}}
                            data={currentCurationPosts}
                            keyExtractor={comment => comment._id}
                            initialScrollIndex ={cidx}
                            ref={(ref)=>setRef(ref)}
                            getItemLayout={(data,index)=>(
                                 {length: 134 * tmpWidth, offset: 134 * tmpWidth*index, index}
                            )}
                            renderItem={({item}) =>{
                                return(
                                    <TouchableOpacity onPress={()=>{
                                        if(item.postUserId._id != userState.myInfo._id){
                                        setSelectedCuration(item);
                                        setShowpost(true);
                                        } else {
                                            
                                            getmyCuration({id:currentCuration.songoralbumid})
                                            setShowModal(true);

                                        }
                                    }}>
                                        <View style={styles.curationpostitem}>
                                            <TouchableOpacity onPress={async () => {
                                                if(item.postUserId._id == userState.myInfo._id){
                                                    navigate('Account');
                                                }else{
                                                    await Promise.all([getOtheruser({id:item.postUserId._id}),
                                                    getSongs({id:item.postUserId._id})])
                                                    navigation.push('OtherAccount', {otherUserId: item.postUserId._id});
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
                                                        <Text numberOfLines={1} style={{fontSize:12 * tmpWidth,marginLeft:11 * tmpWidth,}}>{item.postUserId.name}</Text>
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
                                                <Text numberOfLines ={5} style ={{lineHeight:tmpWidth*18 ,fontSize:12 * tmpWidth, marginTop:8 * tmpWidth, marginLeft:11 * tmpWidth,color:"rgba(93,93,93,1)"}}>{item.textcontent}</Text>
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
                            animationIn='zoomIn'
                            animationOut='zoomOut'
                            isVisible={true}
                            onBackdropPress={()=>{setShowpost(false);}}
                            backdropOpacity={0.4}
                            style={{justifyContent:'center', marginBottom:keyboardHeight }}
                        >
                            <View style={{width:335 * tmpWidth, borderRadius:8 * tmpWidth, backgroundColor:'#fff' }}>
                                <View>
                                    <View style={styles.curationpostuser}>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                setShowpost(false)
                                            if(selectedCuration.postUserId._id == userState.myInfo._id){
                                                navigate('Account');
                                            }else{
                                                await Promise.all([getOtheruser({id:selectedCuration.postUserId._id}),
                                                getSongs({id: selectedCuration.postUserId._id})]);
                                                navigation.push('OtherAccount', {otherUserId:selectedCuration.postUserId._id});
                                            }}}
                                            style={{width:32 * tmpWidth, height:32 * tmpWidth}}
                                        >
                                            { selectedCuration.postUserId.profileImage == null || selectedCuration.postUserId.profileImage == undefined ?
                                                <View style={styles.profileImage}>
                                                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                </View> :
                                                <Image style={{width:'100%', height:'100%', borderRadius:32 * tmpWidth }} source={{uri: selectedCuration.postUserId.profileImage}} ></Image> }
                                        </TouchableOpacity>
                                        <View style={{width:210 * tmpWidth, height:32 * tmpWidth, alignItems: 'center', flexDirection: 'row'}}>
                                            <Text style={{marginLeft:12 * tmpWidth}}>{selectedCuration.postUser}</Text>
                                            <TouchableOpacity onPress={() => {
                                                setShowpost(false)
                                                setReportModal(true)}}>
                                                <Text style={{marginLeft: 5 * tmpWidth, color: 'rgb(93,93,93)'}}>신고</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{width:250 * tmpWidth, marginLeft:62 * tmpWidth, marginBottom: 20 * tmpWidth}}>
                                    {selectedCuration.hidden ? 
                                    <Text style={{fontSize:12 * tmpWidth, color:'rgb(93,93,93)'}}>비밀글 입니다.</Text> :
                                    <Text style={{lineHeight:17*tmpWidth, fontSize:12 * tmpWidth, color:'rgb(93,93,93)'}}>{selectedCuration.textcontent}</Text>}
                                    </View>
                                </View>
                            </View>
                        </Modal> : null }
                        { reportModal ? <ReportModal reportModal={reportModal} setReportModal={setReportModal} type={'curation'} subjectId={selectedCuration._id} /> : null }
                        { showModal ?
                        <Modal
                            animationIn='zoomIn'
                            animationOut='zoomOut'
                            isVisible={true}
                            onBackdropPress={onClose}
                            backdropOpacity={0.4}
                            style={{justifyContent:'center', marginBottom:keyboardHeight}}
                        >
                            <View style={{width:335 * tmpWidth, borderRadius:8 * tmpWidth, backgroundColor:'#fff', }}>
                                { state.mycurationpost.likes == undefined ? <ActivityIndicator/> :
                                <View>
                                    <View style={{width:319 * tmpWidth, alignItems:'center', flexDirection:'row', marginTop:20 * tmpWidth, marginLeft:16 * tmpWidth, height:32 * tmpWidth}}>
                                        <TouchableOpacity style={{width:32 * tmpWidth, height:32 * tmpWidth}}>
                                            {state.mycurationpost.postUserId.profileImage == null || state.mycurationpost.postUserId.profileImage==undefined ?
                                            <View style={styles.profileImage}>
                                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                            </View> : <Image style={{width:'100%', height:'100%', borderRadius:32 }}source={{uri: state.mycurationpost.postUserId.profileImage}}/> }
                                        </TouchableOpacity>
                                        <View style={{width:200 * tmpWidth, alignItems:'center', flexDirection:'row'}}>
                                            <Text numberOfLines ={1} style={{marginLeft:12 * tmpWidth}}>{state.mycurationpost.postUser}</Text>
                                            {state.mycurationpost.hidden ? 
                                                <SvgUri width={24 * tmpWidth} height={24 * tmpWidth} source={require('../../assets/icons/locked.svg')}/>
                                            : null }
                                        </View>
                                        <View style={{marginLeft:10, width:70 * tmpWidth,height:20 * tmpWidth, flexDirection:'row', alignItems: 'center'}}>
                                            <TouchableOpacity onPress={()=> {
                                                setShowModal(false);
                                                setHidden(false);
                                                setDeleteModal(true);}}>
                                                <Text style={{fontSize: 13 * tmpWidth}}>삭제</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style ={{marginLeft:10*tmpWidth}}onPress={()=> {
                                                setEdit(true);
                                                setShowModal(false)
                                                setPostModal(true);
                                                setEditid(state.mycurationpost._id);
                                                setText(state.mycurationpost.textcontent);
                                                setHidden(state.mycurationpost.hidden);
                                                }}>
                                                <Text style={{fontSize: 13 * tmpWidth}}>수정</Text>
                                            </TouchableOpacity>                                           
                                        </View>
                                    </View>
                                    <View style={{width:250 * tmpWidth, marginLeft:60 * tmpWidth, marginBottom: 20 * tmpWidth}}>
                                    <Text style={{lineHeight:17*tmpWidth, fontSize:12 * tmpWidth, color:'rgb(93,93,93)'}} >{state.mycurationpost.textcontent}</Text>
                                    </View>
                                </View> }
                            </View>
                        </Modal> : null }
                        { deleteModal ? <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} type={'curation'} /> : null}
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
                                <View style={text.length >= 50 ? styles.postbutton : styles.postbutton2}>
                                    { !edit ? 
                                    text.length >= 50  ?
                                    <TouchableOpacity
                                        style={{ width:327 * tmpWidth, height:52 * tmpWidth, justifyContent:'center', alignItems:'center'}}
                                        onPress ={async () => {
                                            if(text.length>=50){
                                            await postCuration({isSong:currentCuration.isSong , hidden : hidden,  object:currentCuration.object, textcontent:text, id:currentCuration.songoralbumid})
                                            getMyInfo();
                                            getCurationposts();
                                            setPostModal(false);
                                            setText('');
                                            }
                                        }}
                                    >
                                        <Text style={{color:"#fff",fontSize:18 * tmpWidth,}}>업로드하기</Text>
                                    </TouchableOpacity>
                                    :
                                    <View style={{ width:327 * tmpWidth, height:52 * tmpWidth, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{color:"#fff",fontSize:18 * tmpWidth,}}>50자 이상 입력해주세요</Text>
                                    </View> 
                                    : 
                                    text.length >= 50 ?
                                    <TouchableOpacity
                                        style={{ width:327 * tmpWidth, height:52 * tmpWidth, justifyContent:'center', alignItems:'center'}}
                                        onPress ={async () => {
                                            if(text.length>=50){
                                            await editCuration({ hidden : hidden , textcontent:text, id:editid})
                                            getCurationposts();
                                            setEdit(false);
                                            setPostModal(false);
                                            setText('');
                                            }
                                        }}
                                    >
                                        <Text style={{color:"#fff",fontSize:18 * tmpWidth,}}>수정하기</Text>
                                    </TouchableOpacity>  :
                                     <View style={{ width:327 * tmpWidth, height:52 * tmpWidth, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{color:"#fff",fontSize:18 * tmpWidth,}}>50자 이상 입력해주세요</Text>
                                    </View>                                                                    
                                    }
                                </View>
                            </View>
                        </Modal> :null }
                    </View>
                </View> 
          </ScrollView> }
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
        marginTop:20 * tmpWidth,
        marginLeft:16 * tmpWidth,
        height:32 * tmpWidth,
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
    postbutton2:{
        flexDirection:'row',
        marginLeft:24 * tmpWidth,
        marginTop:24 * tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        width:327 * tmpWidth,
        height:52 * tmpWidth,
        backgroundColor:"#c4c4c4",
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