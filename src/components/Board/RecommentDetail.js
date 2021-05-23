import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as PlaylistContext } from '../../context/PlaylistContext';
import { Context as DJContext } from '../../context/DJContext';
import { Context as CurationContext } from '../../context/CurationContext';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../FontNormalize';

const RecommentDetail = ({ currentComment }) => {
    const { state, deleteRecomment, likeRecomment, unlikeRecomment } = useContext(BoardContext);
    const { state: userState, getOtheruser } = useContext(UserContext);
    const { getUserPlaylists } = useContext(PlaylistContext);
    const { getSongs } = useContext(DJContext);
    const { getuserCurationposts } = useContext(CurationContext);

    const [deleteModal, setDeleteModal] = useState(false);
    
    const [commentId, setCommentId] = useState('');
    
    return (
        <FlatList
            data={currentComment}
            keyExtractor={(comment)=>comment.comment}
            renderItem={({item}) => {
                if(!item.isDeleted){
                    return (
                        <View style={styles.commentBox}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => {
                                    if(item.postUserId._id == userState.myInfo._id){
                                        navigate('Account');
                                    }else{
                                        getUserPlaylists({id:item.postUserId._id})
                                        getOtheruser({id:item.postUserId._id})
                                        getSongs({id:item.postUserId._id})
                                        getuserCurationposts({id:item.postUserId._id})
                                        navigate('OtherAccount')
                                    }
                                }}>
                                { item.postUserId.profileImage == undefined ?
                                <View style={styles.profile}>
                                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                </View> :
                                <Image style={styles.profile} source={{uri: item.postUserId.profileImage}}/> }
                                </TouchableOpacity>
                                <View style={{marginLeft: 20 * tmpWidth}}>
                                    <Text style={styles.nameText}>{item.postUserId.name}</Text>
                                    <View style={{width: 200 * tmpWidth}}>
                                        <Text style={styles.commentText}>{item.comment}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={styles.timeText}>{item.time}</Text>
                                        {item.likes.includes(userState.myInfo._id) ? 
                                            <TouchableOpacity onPress={async () => await unlikeRecomment({ contentId: state.currentContent._id, commentId: item._id })}>
                                                <Text style={styles.likeText}>좋아요 {item.likes.length != 0 ? item.likes.length : null}</Text>
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={async () => await likeRecomment({ contentId: state.currentContent._id, commentId: item._id })}>
                                                <Text style={styles.unlikeText}>좋아요 {item.likes.length != 0 ? item.likes.length : null}</Text>
                                            </TouchableOpacity> } 
                                        {item.postUserId._id != userState.myInfo._id ? null : 
                                        <TouchableOpacity onPress={() => {
                                            setDeleteModal(true)
                                            setCommentId(item._id)
                                        }}>
                                            <Text style={styles.deleteText}>삭제</Text>
                                        </TouchableOpacity>
                                        }
                                        <Modal
                                            isVisible={deleteModal}
                                            backdropOpacity={0.4}
                                            style={{margin: 0, alignItems: 'center'}}
                                        >
                                            <View style={styles.deleteContainer}>
                                                <Text style={{fontSize: 14 * tmpWidth, marginTop: 32 * tmpWidth}}>댓글을 삭제하시겠습니까?</Text>
                                                <View style={{flexDirection: 'row', marginTop: 26 * tmpWidth}}>
                                                    <TouchableOpacity style={styles.cancelBox} onPress={() => setDeleteModal(false)}>
                                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(133,133,133)'}}>취소하기</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.deleteBox} onPress={async () => {
                                                        setDeleteModal(false)
                                                        await deleteRecomment({ contentId: state.currentContent._id, commentId: commentId })}}>
                                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(86,86,86)'}}>삭제하기</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </Modal>
                                    </View>
                                </View>
                            </View>
                            
                        </View>
                    )
                }
            }}
        />
    );
};

const styles=StyleSheet.create({
    commentBox: {
        width: 280 * tmpWidth,
        paddingTop: 12 * tmpWidth,
        paddingBottom: 12 * tmpWidth,
        paddingLeft: 16 * tmpWidth,
        paddingRight: 16 * tmpWidth,
        marginLeft: 44 * tmpWidth,
        backgroundColor: 'rgb(238, 244, 255)',
        borderRadius: 8 * tmpWidth,
        marginTop: 8 * tmpWidth
    },
    profile: {
        width: 38 * tmpWidth,
        height: 38 * tmpWidth,
        borderRadius: 38 * tmpWidth,
    },
    nameText: {
        fontSize: 12 * tmpWidth
    },
    commentText: {
        fontSize: 14 * tmpWidth, 
        marginTop: 8 * tmpWidth, 
        marginBottom: 10 * tmpWidth
    },
    timeText: {
        fontSize: 12 * tmpWidth, 
        color:'rgb(86,86,86)'
    },
    deleteText: {
        marginLeft: 12 * tmpWidth, 
        fontSize: 12 * tmpWidth, 
        color:'rgb(86,86,86)'
    },
    likeText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(154,188,255)', 
        marginLeft: 12 * tmpWidth
    },
    unlikeText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginLeft: 12 * tmpWidth
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

export default RecommentDetail;