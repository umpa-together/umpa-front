import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator ,TextInput, TouchableOpacity, FlatList, ScrollView, Keyboard, KeyboardEvent, TouchableWithoutFeedback } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as DJContext } from '../../context/DJContext';
import { Context as CurationContext } from '../../context/CurationContext';
import { Context as SearchContext } from '../../context/SearchContext';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';

const SelectedPlaylist = ({navigation}) => {
    const {state, getUserPlaylists, deletePlaylist,addComment,deleteComment, getreComment , addreComment,deletereComment,likesPlaylist, unlikesPlaylist, likescomment,unlikescomment,likesrecomment,unlikesrecomment, initRecomment} = useContext(PlaylistContext);
    const {state: userState, getOtheruser, getMyPlaylist} = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const { getuserCurationposts } = useContext(CurationContext);
    const { state: searchState, hashtagHint } = useContext(SearchContext);
    const playlistid= navigation.getParam('id');
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [showModal, setShowModal] = useState('0');
    const [currentcommentid, setCurrentcommentid] = useState('');
    const [comments, setComments] = useState([]);
    const [tok, setTok] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const commentRef = useRef();
    const recommentRef = useRef();
    console.log(searchState.hashtagHint[0])
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
        comments.sort(function(a, b) {
            if(a.time > b.time) return -1;
            if(a.time< b.time) return 1;
            return 0;
        })
        setTok(!tok);
    }
    const addtracksong= async ({data}) => {
          const track = new Object();
          track.id = data.id;
          track.url = data.attributes.previews[0].url;
          track.title = data.attributes.name;
          track.artist = data.attributes.artistName;
          setIsPlayingid(data.id);
          //track.album = data.attributes.albumName;
          //track.genre = data.attributes.genreNames;
          //track.date = data.attributes.releaseDate;
          //track.artwork = data.attributes.artwork.url;
          await TrackPlayer.reset()
          await TrackPlayer.add(track);
          TrackPlayer.play();

    };
    const stoptracksong= async () => {
        setIsPlayingid('0');
        await TrackPlayer.reset()
    };
    const SongImage = ({url, play}) => {
        url =url.replace('{w}', '300');
        url = url.replace('{h}', '300');
        return (
            play ? <Image style ={{borderRadius: 50 * tmpWidth, height:'100%', width:'100%', opacity: 0.5}} source ={{url:url}}/>
        : <Image style ={{borderRadius: 50 * tmpWidth, height:'100%', width:'100%', opacity: 1.0}} source ={{url:url}}/>
        );
    };
    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }
    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }

    useEffect(()=>{
        const listener =navigation.addListener('didFocus', ()=>{
            TrackPlayer.setupPlayer().then(async() => {
                console.log('ready');
            });
            Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
        });
        return () => {
            Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
            listener.remove();
        };
    }, []);

    useEffect(() => {
        if(state.current_comments != null){
            setComments(state.current_comments);
        }
    }, [state.current_comments]);
    return (
        <View style={styles.container}>
            {state.current_playlist == undefined || playlistid != state.current_playlist._id ?
            <View style={styles.activityIndicatorContainer}><ActivityIndicator/></View> :
            <View style={{flex: 1}}>
                <Image style={styles.thumbnail} source={{uri: state.current_playlist.image}}/>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {navigation.goBack(); stoptracksong();}}>
                        <SvgUri width='40' height='40' source={require('../../assets/icons/playlistBack.svg')}/>
                    </TouchableOpacity>
                    {userState.myInfo._id == state.current_playlist.postUserId._id ? 
                    <TouchableOpacity onPress={() => setDeleteModal(true)}>
                        <Text style={{color: 'white'}}>삭제</Text>
                    </TouchableOpacity> : null }
                    <Modal
                        isVisible={deleteModal}
                        backdropOpacity={0.4}
                        style={{margin: 0, alignItems: 'center'}}
                    >
                        <View style={styles.deleteContainer}>
                            <Text style={{fontSize: 14 * tmpWidth, marginTop: 32 * tmpWidth}}>플레이리스트를 삭제하시겠습니까?</Text>
                            <View style={{flexDirection: 'row', marginTop: 26 * tmpWidth}}>
                                <TouchableOpacity style={styles.cancelBox} onPress={() => setDeleteModal(false)}>
                                    <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(133,133,133)'}}>취소하기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteBox} onPress={async () => {
                                    setDeleteModal(false)
                                    await deletePlaylist({id:state.current_playlist._id});
                                    getMyPlaylist()
                                    navigation.goBack()
                                }}>
                                    <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(86,86,86)'}}>삭제하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                    <View style={styles.profileBox}>
                        <TouchableOpacity onPress={() => {
                            if(state.current_playlist.postUserId._id == userState.myInfo._id){
                                navigate('Account');
                            }else{
                                getUserPlaylists({id:state.current_playlist.postUserId._id});
                                getOtheruser({id:state.current_playlist.postUserId._id});
                                getSongs({id:state.current_playlist.postUserId._id});
                                getuserCurationposts({id:state.current_playlist.postUserId._id});
                                navigate('OtherAccount'); }}}>
                            {state.current_playlist.postUserId.profileImage == undefined ? 
                            <View style={styles.profile}>
                               <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                            </View> : <Image style={styles.profile} source={{uri: state.current_playlist.postUserId.profileImage}}/> }
                        </TouchableOpacity>
                        <View style={styles.profileTextBox}>
                            <Text style={styles.nameText}>{state.current_playlist.postUserId.name}</Text>
                            <View style={styles.viewContainer}>
                                <SvgUri width='24' height='24' source={require('../../assets/icons/view.svg')}/>
                                <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(255,255,255)'}}>{state.current_playlist.views}</Text>
                                <SvgUri width='24' height='24' source={require('../../assets/icons/playlistMiniHeart.svg')} />
                                <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(255,255,255)'}}>{state.current_playlist.likes.length}</Text>
                            </View>
                        </View>
                        { state.current_playlist.likes.includes(userState.myInfo._id) ?
                        <TouchableOpacity onPress={()=>{ unlikesPlaylist({id:playlistid}) }}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/playlisthearto.svg')}/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=>{  likesPlaylist({id:playlistid}) }}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/playlistheart.svg')}/>
                        </TouchableOpacity> }
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoBox}>
                            <View style={{alignItems: 'center', width: 240 * tmpWidth}}>
                                <Text style={styles.titleText} numberOfLines={1}>{state.current_playlist.title}</Text>
                                <Text style={styles.contentText} numberOfLines={1}>{state.current_playlist.textcontent}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {state.current_playlist.hashtag.map(item => {
                                    return (
                                        <TouchableOpacity style={styles.hashtagView} key={item._id} onPress={async() => {
                                            await hashtagHint({term: item})
                                            await navigate('SelectedHashtag', {data: searchState.hashtagHint[0], text: item, searchOption : 'Hashtag' });
                                        }}>
                                            <Text style={styles.hashtagBox}>{'#' + item}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.mainContainer}>
                    <ScrollView>
                        <Text style={{marginLeft: 24 * tmpWidth, fontSize: 16 * tmpWidth}}>담긴 곡</Text>
                        <FlatList
                            style={{paddingTop: 8 * tmpWidth, paddingBottom: 16 * tmpWidth}}
                            data={state.current_songs}
                            keyExtractor={playlist=>playlist.id}
                            horizontal = {true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.songBox}>
                                        {isPlayingid == item.id ?
                                        <TouchableOpacity style={styles.songCover} onPress={() => stoptracksong()}>
                                           <SongImage play={true} url={item.attributes.artwork.url}/>
                                        </TouchableOpacity> :
                                        <TouchableOpacity style={styles.songCover} onPress={()=>addtracksong({data:item})}>
                                            <SongImage play={false} url={item.attributes.artwork.url}/>
                                        </TouchableOpacity> }
                                        {isPlayingid == item.id ?
                                        <TouchableOpacity onPress={() => stoptracksong()}>
                                            <SvgUri width='17' height='20' source={require('../../assets/icons/play.svg')} style={{marginTop: 50 * tmpWidth}}/>
                                        </TouchableOpacity> :
                                        <TouchableOpacity  onPress={()=>addtracksong({data:item})}>
                                            <SvgUri width='17' height='20' source={require('../../assets/icons/play.svg')} style={{marginTop: 50 * tmpWidth}}/>
                                        </TouchableOpacity> }

                                        <View style={styles.songWidthBox}>
                                            <Text style={styles.songText} numberOfLines={1}>{item.attributes.name}</Text>
                                            <Text style={styles.artistText} numberOfLines={1}>{item.attributes.artistName}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        >
                        </FlatList>
                        <View style={styles.commentHeader}>
                            <Text style={styles.headerCommentText}>댓글   {state.current_comments.length}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => recommendedClick()}>
                                    <Text style={styles.headerText}>추천순</Text>
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
                                <View style={styles.commentBox} key={item._id}>
                                    <TouchableOpacity>
                                        {item.postUserId.profileImage == undefined ? 
                                        <View style={styles.commentProfile}>
                                           <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                        </View> : <Image style={styles.commentProfile} source={{uri: item.postUserId.profileImage}}/> }
                                    </TouchableOpacity>
                                    <View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={styles.commentUserText}>{item.postUser}</Text>
                                            <Text style={styles.commentTimeText}>{item.time}</Text>
                                        </View>
                                        <View style={{marginRight: 50 * tmpWidth}}>
                                            <Text style={styles.commentText}>{item.text}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            {item.likes.includes(userState.myInfo._id) ?
                                            <TouchableOpacity onPress={()=> unlikescomment({playlistid, id:item._id})}>
                                                <Text style={styles.likeText}>좋아요</Text>
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={()=> likescomment({playlistid, id:item._id})}>
                                                <Text style={styles.notLikeText}>좋아요</Text>
                                            </TouchableOpacity> }
                                            {item.likes.length != 0 ? <Text style={styles.likeLengthText}>{item.likes.length}</Text> : null}
                                            <TouchableOpacity  onPress={ async()=> {
                                                setShowModal(item._id)
                                                setCurrentcommentid(item._id)
                                                await getreComment({commentid:item._id})}}
                                            >
                                                <Text style={styles.deleteText}>답글</Text>
                                            </TouchableOpacity>
                                            {userState.myInfo._id == item.postUserId._id ?
                                            <TouchableOpacity onPress={() => deleteComment({id:playlistid, commentid : item._id}) }>
                                                <Text style={styles.deleteText}>지우기</Text>
                                            </TouchableOpacity> : null }
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
                                                <TouchableOpacity>
                                                    {item.postUserId.profileImage == undefined ? 
                                                    <View style={styles.profileImage}>
                                                       <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                    </View> : <Image style={styles.commentProfile} source={{uri: item.postUserId.profileImage}}/> }
                                                </TouchableOpacity>
                                                <View >
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <Text style={styles.commentUserText}>{item.postUser}</Text>
                                                        <Text style={styles.commentTimeText}>{item.time}</Text>
                                                    </View>
                                                    <View style={{width: '90%'}}>
                                                        <Text style={styles.commentText}>{item.text}</Text>
                                                    </View>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        {item.likes.includes(userState.myInfo._id) ?
                                                        <TouchableOpacity onPress={()=> unlikescomment({playlistid, id:item._id})}>
                                                            <Text style={styles.likeText}>좋아요</Text>
                                                        </TouchableOpacity> :
                                                        <TouchableOpacity onPress={()=> likescomment({playlistid, id:item._id})}>
                                                            <Text style={styles.notLikeText}>좋아요</Text>
                                                        </TouchableOpacity> }
                                                        {item.likes.length != 0 ? <Text style={styles.likeLengthText}>{item.likes.length}</Text> : null}
                                                        <Text style={styles.deleteText}>답글</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.inputRecommentBox}>
                                                {item.postUserId.profileImage == undefined ? 
                                                <View style={styles.commentProfile}>
                                                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                </View> : <Image style={styles.commentProfile} source={{uri: item.postUserId.profileImage}}/> }
                                                <TextInput
                                                    style={styles.textInput}
                                                    onChangeText={text=> recommentRef.current.value = text}
                                                    placeholder="추가할 답글을 적어주세요."
                                                    autoCapitalize='none'
                                                    autoCorrect={false}
                                                    keyboardType = "email-address"
                                                    ref={recommentRef}
                                                    onSubmitEditing={() => {
                                                        addreComment({id:playlistid, commentid:item._id, text:recommentRef.current.value});
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
                                                            <TouchableOpacity>
                                                                {item.postUserId.profileImage == undefined ?
                                                                <View style={styles.commentProfile}>
                                                                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                                                </View> : <Image style={styles.commentProfile} source={{uri: item.postUserId.profileImage}}/> }
                                                            </TouchableOpacity>
                                                            <View >
                                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                                    <Text style={styles.commentUserText}>{item.postUser}</Text>
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
                                                                    {userState.myInfo._id == item.postUserId._id ?
                                                                    <TouchableOpacity onPress={() => deletereComment({commentid:item._id}) }>
                                                                        <Text style={styles.deleteText}>지우기</Text>
                                                                    </TouchableOpacity> : null }
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )
                                                }}
                                            />}
                                        </View>
                                    </Modal> : null}
                                </View>
                            )
                        })}
                        </View>
                    </ScrollView>
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
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType = "email-address"
                                    ref={commentRef}
                                    onSubmitEditing={() => {
                                        addComment({id:playlistid, text:commentRef.current.value,noticieduser:state.current_playlist.postuser, noticieduseremail:state.current_playlist.email, noticetype:'pcom',thirdid:'0'});
                                        commentRef.current.clear();
                                        commentRef.current.value = '';
                                        setKeyboardHeight(0)
                                    }}
                                />
                            </View>
                            <TouchableOpacity onPress={() => {
                                addComment({id:playlistid, text:commentRef.current.value,noticieduser:state.current_playlist.postuser, noticieduseremail:state.current_playlist.email, noticetype:'pcom',thirdid:'0'});
                                commentRef.current.value = '';
                                commentRef.current.clear();
                                //setKeyboardHeight(0)
                            }}>
                                <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(69,67,80)'}}>등록</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>}
        </View>
    );
};

SelectedPlaylist.navigationOptions = ()=>{
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
        height : 228 * tmpWidth,
        width : '100%',
        position: 'absolute',
    },
    header: {
        flexDirection: 'row', 
        marginTop: 44 * tmpWidth, 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginLeft: 18 * tmpWidth, 
        marginRight: 24 * tmpWidth
    },
    profileBox: {
        marginTop: 4 * tmpWidth,
        marginLeft: 28 * tmpWidth,
        marginRight: 20 * tmpWidth,
        flexDirection: 'row',
    },
    profile: {
        height: 40 * tmpWidth,
        width: 40 * tmpWidth,
        borderRadius: 40 * tmpWidth,
    },
    profileTextBox: {
        flex: 1,
        marginLeft: 8 * tmpWidth,
        marginTop: 2 * tmpWidth,
    },
    nameText: {
        height: 19 * tmpWidth, 
        color: 'rgb(255,255,255)',
        paddingLeft: 5 * tmpWidth
    },
    viewContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    infoContainer: {
        alignItems: 'center', 
        marginBottom: 18 * tmpWidth, 
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
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 14 * tmpWidth
    },
    contentText: {
        color: 'rgb(94,94,94)', 
        marginTop: 4 * tmpWidth, 
        marginBottom: 8 * tmpWidth
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
        width: 90 * tmpWidth,
        alignItems: 'center',
        marginTop: 46 * tmpWidth
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
        marginLeft: 20, 
    },
    songCover: {
        width: 92 * tmpWidth,
        height: 92 * tmpWidth, 
        borderRadius: 100 * tmpWidth,
        alignItems: 'center',
        marginTop: 12 * tmpWidth,
        position: 'absolute'
    },
    inputBox: {
        width: '100%',
        height: 68 * tmpWidth,
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
    },
    commentHeader: {
        marginTop: 18 * tmpWidth,
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
        color: 'rgba(0,0,0,0.72)'
    },
    commentTimeText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgba(0,0,0,0.72)'
    },
    commentText: {
        fontSize: 12 * tmpWidth, 
        marginTop: 8 * tmpWidth, 
        marginBottom: 8 * tmpWidth
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
        color:"rgb(164,164,164)",
        width: '80%',
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
        height: 116 * tmpWidth,
        backgroundColor: 'rgb(238,244,255)',
        flexDirection: 'row',
        paddingLeft: 20 * tmpWidth,
        paddingTop: 30 * tmpWidth
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
    }
});

export default SelectedPlaylist;