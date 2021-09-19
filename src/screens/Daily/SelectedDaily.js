import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator ,TextInput, TouchableOpacity, FlatList, ScrollView, Keyboard, TouchableWithoutFeedback, Animated, Platform, StatusBar } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { goBack, navigate,push } from 'navigationRef'

import { Context as DailyContext } from '../../context/DailyContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as DJContext } from '../../context/DJContext';
import { tmpWidth } from '../../components/FontNormalize';
import ReportModal from '../../components/ReportModal';
import DeleteModal from '../../components/DeleteModal';
import HarmfulModal from '../../components/HarmfulModal';
import DeletedModal from '../../components/DeletedModal';
import { SongImage } from '../../components/SongImage'
import { useFocusEffect } from '@react-navigation/native';

//import { Context as SearchPlaylistContext } from '../../context/SearchPlaylistContext';

const SelectedDaily = ({route}) => {
    const { state, addComment, getreComment, addreComment, likesDaily, unlikesDaily, likescomment, 
        unlikescomment, likesrecomment, unlikesrecomment, initRecomment } = useContext(DailyContext);
    const { state: userState, getOtheruser, addSonginDailys } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    //const { state: searchState, SearchHashtag } = useContext(SearchPlaylistContext);
    const { id: Dailyid } = route.params

    const [isPlayingid, setIsPlayingid] = useState('0');
    const [showModal, setShowModal] = useState('0');
    const [currentcommentid, setCurrentcommentid] = useState('');
    const [tok, setTok] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [commentDeleteModal, setCommentDeleteModal] = useState(false);
    const [reCommentDeleteModal, setReCommentDeleteModal] = useState(false);
    const [reportModal, setReportModal] = useState(false);
    const [commentReportModal, setCommentReportModal] = useState(false);
    const [reportId, setReportId] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [hashtag, setHashtag] = useState('');
    const [harmfulModal, setHarmfulModal] = useState(false);
    const [deletedModal, setDeletedModal] = useState(false);
    const [weeklyModal, setWeeklyModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    const [completeModal, setCompleteModal] = useState(false);

    const opacity = useState(new Animated.Value(1))[0];
    const commentRef = useRef();
    const recommentRef = useRef();
    const [currentDaily, setCurrentDaily] = useState(state.current_Daily)
    const [comments, setComments] = useState(state.current_comments);
    const [currentSongs, setCurrentSongs] = useState(state.current_songs)
    const onClose =() => {
        setShowModal('0');
        initRecomment();
        setKeyboardHeight(0);
    }
    const recommendedClick = () => {
        comments.sort(function(a, b) {
            if(a.likes.length > b.likes.length) return -1;
            if(a.likes.length < b.likes.length) return 1;
            return 0;
        })
        setTok(!tok);
    }
    const newestClick = () => {
        comments.reverse();
        setTok(!tok);
    }
    const addtracksong= async ({data}) => {
        setSelectedSong(data)
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
    const onClickMusicPlus = ({song}) => {
        setCompleteModal(true)
        addSonginDailys({song})
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
            }).start()
            setTimeout(() => {
                setCompleteModal(false)
                opacity.setValue(1);
            }, 1000)
        }, 1000);
    }
    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])
    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }
    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }
    const addEventListener = () => {
        Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
    }

    const removeEventListener = () => {
        Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
        Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
    }
    useFocusEffect(
        useCallback(() => {
            addEventListener()
            return () => removeEventListener()
        }, [])
    )
    useEffect(()=>{

    }, []);
    useEffect(() => {
        if(state.current_Daily != null && state.current_Daily._id == Dailyid)    setComments(state.current_comments)
    }, [Dailyid, state.current_comments])
    useEffect(() => {
        if(state.current_Daily != null && state.current_Daily._id == Dailyid)  setCurrentDaily(state.current_Daily)
    }, [Dailyid, state.current_Daily])

    /*
    useEffect(() => {
        if(searchState.Daily != null && hashtag != '') navigate('SelectedHashtag', {data: searchState.Daily, text: hashtag, searchOption : 'Hashtag' });
    }, [searchState.Daily])*/
    useEffect(() => {
        if(state.current_Daily != null && state.current_Daily.length == 0)    setDeletedModal(true);
    },[state.current_Daily])
    return (
        <View style={styles.container}>
            {currentDaily == null ?
            <View style={styles.activityIndicatorContainer}><ActivityIndicator/></View> :
            <View style={{flex: 1}}>
                <View style={{height: 375 * tmpWidth, width: '100%',}}>
                    <Image style={styles.thumbnail} source={{uri: currentDaily.image[0]}}/>

                </View>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {goBack(); stoptracksong({ setIsPlayingid });}}>
                        <SvgUri width='40' height='40' source={require('../../assets/icons/playlistBack.svg')}/>
                    </TouchableOpacity>

                </View>
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                    <View style={styles.profileBox}>
                        <TouchableOpacity onPress={async () => {
                            if(currentDaily.postUserId._id == userState.myInfo._id){
                                navigate('Account');
                            }else{
                                await Promise.all([getOtheruser({id:currentDaily.postUserId._id}),
                                getSongs({id:currentDaily.postUserId._id})])
                                push('OtherAccount', {otherUserId:currentDaily.postUserId._id}); }}}>
                            {currentDaily.postUserId.profileImage == undefined ? 
                            <View style={styles.profile}>
                               <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                            </View> : <Image style={styles.profile} source={{uri: currentDaily.postUserId.profileImage}}/> }
                        </TouchableOpacity>
                        <View style={styles.profileTextBox}>
                            <Text style={styles.nameText}>{currentDaily.postUserId.name}</Text>
                        </View>
                        { currentDaily.likes.includes(userState.myInfo._id) ?
                        <TouchableOpacity onPress={()=>{ unlikesDaily({id:Dailyid}) }}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/playlisthearto.svg')}/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=>{  likesDaily({id:Dailyid}) }}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/playlistheart.svg')}/>
                        </TouchableOpacity> }
                    </View>
                    
                </TouchableWithoutFeedback>                



                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <View style={{alignItems: 'center', width: 240 * tmpWidth}}>
                                <Text style={styles.contentText} numberOfLines={1}>{currentDaily.textcontent}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {currentDaily.hashtag.map(item => {
                                    return (
                                        <TouchableOpacity style={styles.hashtagView} key={item._id} onPress={async() => {
                                            setHashtag(item)
                                            SearchHashtag({ object: item })
                                        }}>
                                            <Text style={styles.hashtagBox}>{'#' + item}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {userState.myInfo._id == currentDaily.postUserId._id ? 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => navigate('Create', {'data': currentSongs, 'isEdit': true})}>
                                <Text style={{color: 'black'}}>수정</Text>
                            </TouchableOpacity>
                            <Text style={{marginLeft: 6 * tmpWidth, marginRight: 6 * tmpWidth, color: 'black'}}>|</Text>
                            <TouchableOpacity onPress={() => {
                                if(!currentDaily.isWeekly){
                                    setDeleteModal(true)
                                }else {
                                    setWeeklyModal(true)
                                    setTimeout(() => setWeeklyModal(false), 1200);
                                }}}>
                                <Text style={{color: 'black'}}>삭제</Text>
                            </TouchableOpacity>
                            <Text style={{marginLeft: 6 * tmpWidth, marginRight: 6 * tmpWidth, color: 'black'}}>|</Text>
                        </View> : null }
                        <TouchableOpacity onPress={() => {
                            setReportModal(true)}}>
                            <Text style={{color: 'black'}}>신고</Text>
                        </TouchableOpacity>
                    </View>
                    { deleteModal ? <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} type={'Daily'} /> : null }
                    { reportModal ? <ReportModal reportModal={reportModal} setReportModal={setReportModal} type={'Daily'} subjectId={currentDaily._id} /> : null }
                    <Modal
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        isVisible={weeklyModal}
                        backdropOpacity={0.5}
                        style={{alignItems: 'center'}}
                    >
                        <View style={{backgroundColor: 'white', paddingTop: 20 * tmpWidth, paddingBottom: 20 *tmpWidth, paddingLeft: 10 * tmpWidth, paddingRight: 10 * tmpWidth, borderRadius: 8 * tmpWidth}}>
                            <Text style={{fontSize: 14 * tmpWidth, color: 'rgb(86,86,86)', }}>위클리 플레이리스트는 삭제 불가능합니다.</Text>
                        </View>
                    </Modal>
                <View style={styles.mainContainer}>
                    <ScrollView>                    
                        <View style={styles.commentHeader}>
                            <Text style={styles.headerCommentText}>댓글   {comments.length}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => recommendedClick()}>
                                    <Text style={styles.headerText}>좋아요순</Text>
                                </TouchableOpacity>
                                <Text style={styles.headerText}>ㅣ</Text>
                                <TouchableOpacity onPress={() => newestClick()}>
                                    <Text style={styles.headerText}>최신순</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop: 20 * tmpWidth}}>
                        {comments == [] ? null : comments.map(item => {
                            return (
                                <TouchableOpacity style={styles.commentBox} key={item._id} onPress={ async()=> {
                                    setShowModal(item._id)
                                    setCurrentcommentid(item._id)
                                    await getreComment({commentid:item._id})}}>
                                    <TouchableOpacity onPress={async () => {
                                        if(item.postUserId._id == userState.myInfo._id) {
                                            navigate('Account')
                                        }else{
                                            await Promise.all([getOtheruser({id:item.postUserId._id}),
                                            getSongs({id:item.postUserId._id})]);
                                            push('OtherAccount', {otherUserId:item.postUserId._id})
                                        }
                                    }}>
                                        {item.postUserId.profileImage == undefined ? 
                                        <View style={styles.commentProfile}>
                                           <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                        </View> : <Image style={styles.commentProfile} source={{uri: item.postUserId.profileImage}}/> }
                                    </TouchableOpacity>
                                    <View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={styles.commentUserText}>{item.postUserId.name}</Text>
                                            <Text style={styles.commentTimeText}>{item.time}</Text>
                                        </View>
                                        <View style={{marginRight: 50 * tmpWidth}}>
                                            <Text style={styles.commentText}>{item.text}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            {item.likes.includes(userState.myInfo._id) ?
                                            <TouchableOpacity onPress={()=> unlikescomment({Dailyid, id:item._id})}>
                                                <Text style={styles.likeText}>좋아요</Text>
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={()=> likescomment({Dailyid, id:item._id})}>
                                                <Text style={styles.notLikeText}>좋아요</Text>
                                            </TouchableOpacity> }
                                            {item.likes.length != 0 ? <Text style={styles.likeLengthText}>{item.likes.length}</Text> : null}
                                            <TouchableOpacity  onPress={ async()=> {
                                                setShowModal(item._id)
                                                setCurrentcommentid(item._id)
                                                await getreComment({commentid:item._id})}}
                                            >
                                                <Text style={styles.deleteText}>답글 {item.recomments.length ==0 || item.recomments == undefined ? null : item.recomments.length}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                setReportId(item._id)
                                                setCommentReportModal(true)}}>
                                                <Text style={styles.deleteText}>신고</Text>
                                            </TouchableOpacity>
                                            { commentReportModal ? <ReportModal reportModal={commentReportModal} setReportModal={setCommentReportModal} type={'dailyComment'} subjectId={reportId} /> : null }
                    
                                            {userState.myInfo._id == item.postUserId._id ?
                                            <TouchableOpacity onPress={() => {
                                                setDeleteId(item._id)
                                                setCommentDeleteModal(true)
                                            }}>
                                                <Text style={styles.deleteText}>지우기</Text>
                                            </TouchableOpacity> : null }
                                            { commentDeleteModal ? <DeleteModal deleteModal={commentDeleteModal} setDeleteModal={setCommentDeleteModal} type={'dailyComment'} subjectId={deleteId} setComments={setComments} dailyId={Dailyid}/> : null }
                                        </View>
                                    </View>
                                    {showModal == item._id ?
                                    <Modal
                                        isVisible={true}
                                        onBackdropPress={onClose}
                                        backdropOpacity={0}
                                        style={{justifyContent:'flex-end', margin:0}}
                                    >
                                        <View style={styles.recommentBox}>
                                            <View style={styles.recommentText}>
                                                <TouchableOpacity onPress={async () => {
                                                    if(item.postUserId._id == userState.myInfo._id) {
                                                        navigate('Account')
                                                    }else{
                                                        await Promise.all([getOtheruser({id:item.postUserId._id}),
                                                        getSongs({id:item.postUserId._id})]);
                                                        push('OtherAccount', {otherUserId:item.postUserId._id})
                                                    }
                                                    setShowModal(false)
                                                }}>
                                                    {item.postUserId.profileImage == undefined ? 
                                                    <View style={styles.commentProfile}>
                                                       <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                    </View> : <Image style={styles.commentProfile} source={{uri: item.postUserId.profileImage}}/> }
                                                </TouchableOpacity>
                                                <View >
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <Text style={styles.commentUserText}>{item.postUserId.name}</Text>
                                                        <Text style={styles.commentTimeText}>{item.time}</Text>
                                                    </View>
                                                    <View style={{width: 280 * tmpWidth}}>
                                                        <Text style={styles.commentText}>{item.text}</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        {item.likes.includes(userState.myInfo._id) ?
                                                        <TouchableOpacity onPress={()=> unlikescomment({Dailyid, id:item._id})}>
                                                            <Text style={styles.likeText}>좋아요</Text>
                                                        </TouchableOpacity> :
                                                        <TouchableOpacity onPress={()=> likescomment({Dailyid, id:item._id})}>
                                                            <Text style={styles.notLikeText}>좋아요</Text>
                                                        </TouchableOpacity> }
                                                        {item.likes.length != 0 ? <Text style={styles.likeLengthText}>{item.likes.length}</Text> : null}
                                                        <Text style={styles.deleteText}>답글 {item.recomments.length ==0 || item.recomments == undefined ? null : item.recomments.length}</Text>
                                                        <TouchableOpacity onPress={() => {
                                                            setReportId(item._id)
                                                            setCommentReportModal(true)}}>
                                                            <Text style={styles.deleteText}>신고</Text>
                                                        </TouchableOpacity>
                                                        { commentReportModal ? <ReportModal reportModal={commentReportModal} setReportModal={setCommentReportModal} type={'dailyComment'} subjectId={reportId} /> : null }
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.inputRecommentBox}>
                                                {userState.myInfo.profileImage == undefined ? 
                                                <View style={styles.commentProfile}>
                                                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                </View> : <Image style={styles.commentProfile} source={{uri: userState.myInfo.profileImage}}/> }
                                                <TextInput
                                                    style={styles.textInput}
                                                    onChangeText={text=> recommentRef.current.value = text}
                                                    placeholder="추가할 답글을 적어주세요."
                                                    placeholderTextColor="rgb(164,164,164)"
                                                    autoCapitalize='none'
                                                    autoCorrect={false}
                                                    ref={recommentRef}
                                                    onSubmitEditing={() => {
                                                        addreComment({id:Dailyid, commentid:item._id, text:recommentRef.current.value});
                                                        Keyboard.dismiss()
                                                        setKeyboardHeight(0);
                                                        recommentRef.current.clear();
                                                        recommentRef.current.value ='';
                                                    }}
                                                />
                                            </View>
                                            {state.current_recomments == null ? <ActivityIndicator /> :
                                            <FlatList
                                                data={state.current_recomments}
                                                keyExtractor={comment => comment._id}
                                                renderItem={({item}) => {
                                                    return (
                                                        <View style={styles.commentBox}>
                                                            <TouchableOpacity onPress={async () => {
                                                                if(item.postUserId._id == userState.myInfo._id) {
                                                                    navigate('Account')
                                                                }else{
                                                                    await Promise.all([getOtheruser({id:item.postUserId._id}),
                                                                    getSongs({id:item.postUserId._id})]);
                                                                    push('OtherAccount', {otherUserId:item.postUserId._id})
                                                                }
                                                                setShowModal(false)
                                                            }}>
                                                                {item.postUserId.profileImage == undefined ?
                                                                <View style={styles.commentProfile}>
                                                                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                                </View> : <Image style={styles.commentProfile} source={{uri: item.postUserId.profileImage}}/> }
                                                            </TouchableOpacity>
                                                            <View >
                                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                                    <Text style={styles.commentUserText}>{item.postUserId.name}</Text>
                                                                    <Text style={styles.commentTimeText}>{item.time}</Text>
                                                                </View>
                                                                <View style={{marginRight: 50 * tmpWidth}}>
                                                                    <Text style={styles.commentText}>{item.text}</Text>
                                                                </View>
                                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                                    {item.likes.includes(userState.myInfo._id) ?
                                                                    <TouchableOpacity onPress={()=> unlikesrecomment({commentid:currentcommentid, id:item._id})}>
                                                                        <Text style={styles.likeText}>좋아요</Text>
                                                                    </TouchableOpacity> :
                                                                    <TouchableOpacity onPress={()=> likesrecomment({commentid:currentcommentid, id:item._id})}>
                                                                        <Text style={styles.notLikeText}>좋아요</Text>
                                                                    </TouchableOpacity> }
                                                                    {item.likes.length != 0 ? <Text style={styles.likeLengthText}>{item.likes.length}</Text> : null}
                                                                    <TouchableOpacity onPress={() => {
                                                                        setReportId(item._id)
                                                                        setCommentReportModal(true)}}>
                                                                        <Text style={styles.deleteText}>신고</Text>
                                                                    </TouchableOpacity>
                                                                    { commentReportModal ? <ReportModal reportModal={commentReportModal} setReportModal={setCommentReportModal} type={'dailyReComment'} subjectId={reportId} /> : null }
                                                                    {userState.myInfo._id == item.postUserId._id ?
                                                                    <TouchableOpacity onPress={() => {
                                                                        setReCommentDeleteModal(true);
                                                                        setDeleteId(item._id)
                                                                    }}>
                                                                        <Text style={styles.deleteText}>지우기</Text>
                                                                    </TouchableOpacity> : null }
                                                                    { reCommentDeleteModal ? <DeleteModal deleteModal={reCommentDeleteModal} setDeleteModal={setReCommentDeleteModal} type={'dailyReComment'} subjectId={deleteId}/> : null }
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )
                                                }}
                                            />}
                                        </View>
                                    </Modal> : null}
                                </TouchableOpacity>
                            )
                        })}
                        </View>
                    </ScrollView>
                    {completeModal && 
                    <Animated.View style={{
                        backgroundColor: 'rgba(0,0,0,0.46)', width:196 * tmpWidth, height: 29 * tmpWidth, 
                        borderRadius: 100 * tmpWidth, justifyContent: 'center', alignItems: 'center',
                        bottom: 16 * tmpWidth, left: 89 * tmpWidth, opacity: opacity
                    }}>
                        <Animated.Text style={{fontSize: 14 * tmpWidth, color: '#ffffff', opacity: opacity}}>곡을 보관함에 담았습니다!</Animated.Text>
                    </Animated.View> }
                    <View style={{marginBottom: keyboardHeight}}>
                        <View style={styles.inputBox}>
                            <View style={{flexDirection: 'row'}}>
                                {userState.myInfo.profileImage == undefined ? 
                                <View style={styles.commentProfile}>
                                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                </View> : <Image style={styles.commentProfile} source={{uri: userState.myInfo.profileImage}}/> }
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text=> commentRef.current.value = text}
                                    placeholder="댓글을 입력해주세요"
                                    placeholderTextColor="rgb(164,164,164)"
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    ref={commentRef}
                                    multiline={true}
                                />
                            </View>
                            <TouchableOpacity onPress={async () => {
                                await addComment({id:Dailyid, text:commentRef.current.value,noticieduser:currentDaily.postuser, noticieduseremail:currentDaily.email, noticetype:'pcom',thirdid:'0'});
                                commentRef.current.value = '';
                                commentRef.current.clear();
                                Keyboard.dismiss()
                                setKeyboardHeight(0)
                            }}>
                                <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(69,67,80)'}}>등록</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>}
            { deletedModal ? <DeletedModal  deletedModal={deletedModal} setDeletedModal={setDeletedModal} type={"Daily"}/> : null}
        </View>
    );
};

SelectedDaily.navigationOptions = ()=>{
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(251,251,251)',
        flex: 1
    },
    activityIndicatorContainer: {
        width: '100%', 
        height: '100%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    thumbnail: {
        height : 359 * tmpWidth,
        width : '100%',
        position: 'absolute'
    },
    header: {
        flexDirection: 'row', 
        marginTop: Platform.OS === 'ios' ? 44 * tmpWidth : StatusBar.currentHeight * tmpWidth,
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginLeft: 18 * tmpWidth, 
        marginRight: 24 * tmpWidth,
        position: 'absolute',
        zIndex: 2,
    },
    profileBox: {
        marginTop: 4 * tmpWidth,
        marginLeft: 28 * tmpWidth,
        marginRight: 20 * tmpWidth,
        flexDirection: 'row',
        zIndex: 2
    },
    profile: {
        height: 40 * tmpWidth,
        width: 40 * tmpWidth,
        borderRadius: 40 * tmpWidth,
    },
    profileTextBox: {
        flex: 1,
        marginLeft: 8 * tmpWidth,
        marginTop: 9 * tmpWidth,
    },
    nameText: {
        height: 19 * tmpWidth, 
        color: 'rgb(0,0,0)',
        paddingLeft: 5 * tmpWidth,
        paddingTop: 2 * tmpWidth
    },
    viewContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    infoContainer: {
        alignItems: 'center', 
        marginBottom: 18 * tmpWidth, 
        zIndex: 2
    },
    infoBox: {
        width: 319 * tmpWidth,
        height: 89 * tmpWidth,
        marginTop: 69 * tmpWidth,
        backgroundColor: 'rgba(252,252,255,0.98)',
        borderRadius: 10 * tmpWidth,
        shadowColor: "#6c6c6c",
        shadowOffset: {
            height: 2*tmpWidth,
            width: 0,
        },
        shadowRadius: 5 * tmpWidth,
        shadowOpacity: 0.14,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    titleText: {
        fontSize: 16 * tmpWidth,
        marginTop: 2 * tmpWidth,
    },
    contentText: {
        color: 'rgb(94,94,94)', 
        marginTop: 6 * tmpWidth, 
        marginBottom: 2 * tmpWidth,
        height: 18 * tmpWidth,
        fontSize: 12 * tmpWidth,
    },
    hashtagView: {
        borderWidth: 1 * tmpWidth, 
        borderRadius: 10 * tmpWidth, 
        borderColor: 'rgb(169,193,255)',
        marginRight: 6 * tmpWidth,        
    },
    hashtagBox: {
        paddingLeft: 5 * tmpWidth,
        paddingRight: 5 * tmpWidth,
        paddingTop: 3 * tmpWidth,
        paddingBottom: 3 * tmpWidth,
        fontSize: 11 * tmpWidth,
        color: 'rgb(169,193,255)'
    },
    mainContainer: {
        justifyContent: 'space-between', 
        height: '100%', 
        flex: 1,
    },
    songWidthBox: {
        width: 80 * tmpWidth,
        alignItems: 'center',
        marginTop: 12 * tmpWidth,
    },
    songText: {
        fontSize: 12 * tmpWidth, 
        marginBottom: 8 * tmpWidth
    },
    artistText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(124,124,124)'
    },
    songBox: {
        width: 124 * tmpWidth,
        height: 166 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 16 * tmpWidth,
        shadowColor: "#6c6c6c",
        shadowOffset: {
            height: 1*tmpWidth,
            width: 0,
        },
        shadowRadius: 3 * tmpWidth,
        shadowOpacity: 0.12 ,
        alignItems: 'center',
        marginLeft: 10 * tmpWidth,
        marginRight: 10 * tmpWidth,
        elevation: 3
    },
    songCover: {
        width: 92 * tmpWidth,
        height: 92 * tmpWidth, 
        borderRadius: 100 * tmpWidth,
        alignItems: 'center',
        marginTop: 12 * tmpWidth,
    },
    floatingCover: {
        width: 48 * tmpWidth,
        height: 48 * tmpWidth, 
        borderRadius: 48 * tmpWidth,
    },
    inputBox: {
        width: '100%',
        paddingTop: 18 * tmpWidth,
        paddingBottom: 18 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: -1 * tmpWidth,
            width: 0,
        },
        shadowRadius: 10 * tmpWidth,
        shadowOpacity: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20 * tmpWidth,
        paddingRight: 20 * tmpWidth,
        justifyContent: 'space-between',
        elevation: 5
    },
    commentHeader: {
        marginTop: 24 * tmpWidth,
        marginLeft: 20 * tmpWidth, 
        marginRight: 20 * tmpWidth, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    headerCommentText: {
        fontSize: 14 * tmpWidth
    },
    headerText: {
        fontSize: 11 * tmpWidth,
        color: 'rgb(95,95,95)'
    },
    commentProfile:{
        height: 32 * tmpWidth,
        width: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
        marginRight: 14 * tmpWidth,
    },
    commentUserText: {
        marginRight: 14 * tmpWidth, 
        fontSize: 12 * tmpWidth, 
        color: 'rgba(0,0,0,0.72)',
    },
    commentTimeText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgba(0,0,0,0.72)'
    },
    commentText: {
        fontSize: 12 * tmpWidth, 
        marginTop: 8 * tmpWidth, 
        marginBottom: 8 * tmpWidth,
    },
    likeText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(193,74,73)'
    },
    notLikeText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(93,93,93)'
    },
    likeLengthText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginLeft: 2 * tmpWidth
    },
    deleteText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginLeft: 8 * tmpWidth
    },
    textInput: {
        width: '80%',
        marginTop: 4 * tmpWidth,
        padding: 0,
    },
    commentBox: {
        marginLeft: 20 * tmpWidth,
        marginBottom: 24 * tmpWidth,
        flexDirection: 'row',
        marginRight: 20 * tmpWidth,
    },
    recommentBox: {
        width: '100%',
        height: 509 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: -1 * tmpWidth,
            width: 0,
        },
        shadowRadius: 8 * tmpWidth,
        shadowOpacity: 0.1,
    }, 
    recommentText: {
        width: '100%',
        backgroundColor: 'rgb(238,244,255)',
        flexDirection: 'row',
        paddingLeft: 20 * tmpWidth,
        paddingTop: 30 * tmpWidth,
        paddingBottom: 16 * tmpWidth,
    },
    inputRecommentBox: {
        marginTop: 20 * tmpWidth,
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(207,207,207)',
        marginLeft: 20 * tmpWidth,
        marginRight: 20 * tmpWidth,
        paddingBottom: 6 * tmpWidth,
        flexDirection: 'row',
        marginBottom: 12 * tmpWidth
    },
    textWhite: {
        color: 'rgb(255,255,255)'
    },
    deleteContainer: {
        width : 285 * tmpWidth,
        height : 131 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        borderRadius: 4 * tmpWidth, 
        alignItems: 'center'
    },
    cancelBox: {
        width: 105 * tmpWidth,
        height: 34 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        backgroundColor: 'rgb(245,245,245)',
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(245,245,245)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5.5 * tmpWidth
    },
    deleteBox: {
        width: 105 * tmpWidth,
        height: 34 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5.5 * tmpWidth
    },

});

export default SelectedDaily;
