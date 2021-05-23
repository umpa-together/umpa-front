import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Image, FlatList, ScrollView, RefreshControl, Keyboard, KeyboardEvent } from 'react-native';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { Context as DJContext } from '../../context/DJContext';
import { Context as CurationContext } from '../../context/CurationContext';
import CommentDetail from './CommentDetail';
import ScrabForm from './ScrabForm';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../FontNormalize';

const ContentDetail = ({navigation}) => {
    const { state, likeContent, unlikeContent, createComment, createReComment, getCurrentContent, deleteContent } = useContext(BoardContext);
    const { state: userState, getOtheruser } = useContext(UserContext);
    const { getUserPlaylists } = useContext(PlaylistContext);
    const { getSongs } = useContext(DJContext);
    const { getuserCurationposts } = useContext(CurationContext);
    
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [commentId, setCommentId] = useState('');
    const [recomment, setRecomment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [image, setImage] = useState([]);
    const [imageIdx, setImageIdx] = useState(0);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const img = [];
    const inputRef = useRef();
    const getData = async () => {
        setLoading(true);
        await getCurrentContent({id: state.currentContent._id});
        setLoading(false);
    };

    const onRefresh = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };

    const imageClick = ({index}) => {
        setImageIdx(index);
        setImageModal(true);
    }

    const create = () => {
        if (inputRef.current.value == undefined || inputRef.current.value.length == 0){
            return;
        }
        if(recomment){
            createReComment({ comment: inputRef.current.value, commentId, contentId: state.currentContent._id });
            setRecomment(false);
        }else{
            createComment({ comment: inputRef.current.value, contentId: state.currentContent._id});
        }
        inputRef.current.value='';
        inputRef.current.clear();
    };
    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }

    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }
    useEffect(() => {
        if(state.currentContent != null && state.currentContent.length != 0 && state.currentContent.image.length != 0){
            for(let key in state.currentContent.image){
                let tmpImage = {url: state.currentContent.image[key]};
                img.push(tmpImage);
            }
            setImage(img);
        }
    },[state.currentContent]);

    useEffect(() => {
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

    useEffect(() => {
        if(keyboardHeight == 0) setRecomment(false);
    }, [keyboardHeight]);

    useEffect(() => {
        if(state.currentContent != null && state.currentContent.length == 0)    setIsDelete(true);  
    }, [state.currentContent]);

    return (
        <View style={{ backgroundColor: 'rgb(255,255,255)'}}>
            {state.currentContent == null || state.currentComment == null ? <View style={{height: '100%', width: '100%', justifyContent: 'center'}}><ActivityIndicator /></View> :
            <View>{state.currentContent.length != 0 ? 
                <View style={styles.container}>
                    <ScrollView refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                    >
                        <View>
                            <View style={styles.contentContainer}>
                                <View style={styles.contentBox}>
                                    <View style={styles.headerContainer}>
                                        <TouchableOpacity onPress={() => {
                                            if(state.currentContent.postUserId._id == userState.myInfo._id){
                                                navigate('Account');
                                            }else{
                                                getUserPlaylists({id:state.currentContent.postUserId._id})
                                                getOtheruser({id:state.currentContent.postUserId._id})
                                                getSongs({id:state.currentContent.postUserId._id})
                                                getuserCurationposts({id:state.currentContent.postUserId._id})
                                                navigate('OtherAccount')
                                            }
                                        }}>
                                            { state.currentContent.postUserId.profileImage == undefined ?
                                            <View style={styles.profile}>
                                               <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                            </View> :
                                            <Image style={styles.profile} source={{uri: state.currentContent.postUserId.profileImage}} /> }
                                        </TouchableOpacity>
                                        <View style={styles.editContainer}>
                                            <View style={{marginLeft: 16 * tmpWidth}}>
                                                <Text style={styles.nameText}>{state.currentContent.postUserId.name}</Text>
                                                <Text style={styles.timeText}>{state.currentContent.time}</Text>
                                            </View>
                                            {state.currentContent.postUserId._id == userState.myInfo._id ? 
                                            <View style={styles.editBox}>
                                                <TouchableOpacity onPress={() => {
                                                    setDeleteModal(true);
                                                }}>
                                                    <Text>삭제</Text>
                                                </TouchableOpacity>
                                            </View> : null }
                                            <Modal
                                                isVisible={deleteModal}
                                                backdropOpacity={0.4}
                                                style={{margin: 0, alignItems: 'center'}}
                                            >
                                                <View style={styles.deleteContainer}>
                                                    <Text style={{fontSize: 14 * tmpWidth, marginTop: 32 * tmpWidth}}>게시글을 삭제하시겠습니까?</Text>
                                                    <View style={{flexDirection: 'row', marginTop: 26 * tmpWidth}}>
                                                        <TouchableOpacity style={styles.cancelBox} onPress={() => setDeleteModal(false)}>
                                                            <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(133,133,133)'}}>취소하기</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.deleteBox} onPress={async () => {
                                                            setDeleteModal(false)
                                                            navigation.goBack()
                                                            await deleteContent({ contentId: state.currentContent._id, boardId: state.currentContent.boardId })}}>
                                                            <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(86,86,86)'}}>삭제하기</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    </View>
                                    <View style={{marginTop: 20 * tmpWidth}}>
                                        <Text style={styles.titleText}>{state.currentContent.title}</Text>
                                        <Text style={styles.contentText}>{state.currentContent.content}</Text>
                                    </View>
                                    {state.currentContent != null && state.currentContent.image.length == 0 ? null:
                                    <FlatList
                                        style={{marginTop: 12 * tmpWidth}}
                                        data={state.currentContent.image}
                                        keyExtractor={image=>image}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled
                                        bounces={false}
                                        renderItem={({item, index}) => {
                                            return (
                                                <TouchableOpacity  onPress={() => imageClick({index})}>
                                                    <Image style={styles.image} source={{uri: item}}/>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />}
                                    <View style={{flexDirection: 'row', marginTop: 12 * tmpWidth, justifyContent: 'space-between'}}>
                                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                            {state.currentContent.likes.includes(userState.myInfo._id) ? 
                                            <TouchableOpacity onPress={async () => await unlikeContent({contentId: state.currentContent._id})}>
                                                <SvgUri width='24' height='24' source={require('../../assets/icons/boardLike.svg')} style={{marginRight: 2 * tmpWidth}}/>
                                            </TouchableOpacity> : 
                                            <TouchableOpacity onPress={async() => await likeContent({contentId: state.currentContent._id })}>
                                                <SvgUri width='24' height='24' source={require('../../assets/icons/boardUnlike.svg')} style={{marginRight: 2 * tmpWidth}}/>
                                            </TouchableOpacity> }
                                            <Text style={styles.footerText}>좋아요 {state.currentContent.likes.length}</Text>
                                            <ScrabForm contentId={state.currentContent._id} />
                                        </View>
                                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                            <SvgUri width='24' height='24' source={require('../../assets/icons/boardComment.svg')} style={{marginRight: 2 * tmpWidth}}/>
                                            <Text style={styles.footerText}>댓글 {state.currentContent.comments.length}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <CommentDetail inputRef={inputRef} setRecomment={setRecomment} setCommentId={setCommentId}/>
                        </View>
                    </ScrollView>
                    <View style={{marginBottom: keyboardHeight}}>
                        <View style={styles.commentBox}>
                            <View style={{flexDirection: 'row'}}>
                                { userState.myInfo.profileImage == undefined ?
                                <View style={styles.commentProfile}>
                                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                </View> :
                                <Image style={styles.commentProfile} source={{uri: userState.myInfo.profileImage}}/> }
                                <View style={styles.commentInput}>
                                    <TextInput
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholder="댓글을 입력해주세요."
                                        onChangeText={text => inputRef.current.value = text}
                                        onSubmitEditing={() => {
                                            create()
                                            setKeyboardHeight(0)
                                        }}
                                        style={{fontSize: 14 * tmpWidth, marginLeft: 16.5 * tmpWidth}}
                                        ref={inputRef}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => create()}>
                                <Text style={styles.uploadText}>등록</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null }
            </View>}
            {imageModal ?
            <Modal
                isVisible={true}
                onBackdropPress={() => setImageModal(false)}
                backdropOpacity={0.4}
                style={{margin: 0}}
            >
                <ImageViewer imageUrls={image} index={imageIdx} enableSwipeDown={true} onCancel={() => setImageModal(false)}/>
            </Modal>: null}
            {isDelete ? 
            <Modal
                isVisible={true}
                backdropOpacity={0.4}
                style={{margin: 0, alignItems: 'center'}}
            >
                <View style={styles.deleteContainer}>
                    <Text style={styles.deleteText}>존재하지 않는 게시글입니다.</Text>
                    <TouchableOpacity onPress={() => {
                        setIsDelete(false);
                        navigation.goBack()}}>
                        <Text style={{marginTop: 16 * tmpWidth, fontSize: 16 * tmpWidth}}>확인</Text>
                    </TouchableOpacity>
                </View>
            </Modal> : null} 
        </View>
    )
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)',
        height: '100%',
        justifyContent: 'space-between',
    },
    contentContainer: {
        borderBottomWidth: 2 * tmpWidth, 
        borderBottomColor: 'rgba(222,222,222,0.37)', 
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    contentBox: {
        paddingTop: 20 * tmpWidth,
        paddingBottom: 8 * tmpWidth,
        width: '90%'
    },
    editContainer: {
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    editBox: {
        flexDirection: 'row', 
        fontSize: 14 * tmpWidth
    },
    nameText: {
        fontSize: 12 * tmpWidth,
        color: 'rgb(111,116,155)'
    },
    timeText: {
        fontSize: 11 * tmpWidth,
        color: 'rgb(164,164,164)',
        marginTop: 4 * tmpWidth
    },
    titleText: {
        fontSize: 16 * tmpWidth
    },
    contentText: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(120,120,120)', 
        marginTop: 12 * tmpWidth
    },
    footerText: {
        fontSize: 12 * tmpWidth, 
        marginRight: 12 * tmpWidth
    },
    profile: {
        width: 38 * tmpWidth,
        height: 38 * tmpWidth,
        borderRadius: 38 * tmpWidth,
    },
    image: {
        width: 332 * tmpWidth,
        height: 202 * tmpWidth,
    },
    commentBox: {
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
        justifyContent: 'space-between',
        paddingRight: 12 * tmpWidth,
    },
    commentProfile: {
        width: 32 * tmpWidth,
        height: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
        marginLeft: 20 * tmpWidth
    },
    commentInput: {
        width: 250 * tmpWidth,
        height: 32 * tmpWidth,

        justifyContent: 'center',
    },
    uploadText: {
        fontSize: 16 * tmpWidth, 
        color: 'rgb(69,67,80)', 
        marginLeft: 12 * tmpWidth
    },
    deleteContainer: {
        width : 305 * tmpWidth,
        height : 94 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        borderRadius: 8 * tmpWidth, 
        alignItems: 'center',
    },
    deleteText: {
        fontSize: 16 * tmpWidth, 
        color: 'rgb(86,86,86)',
        marginTop: 24 * tmpWidth
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
        backgroundColor: 'rgb(245,245,245)',
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5.5 * tmpWidth
    }
});

export default ContentDetail;