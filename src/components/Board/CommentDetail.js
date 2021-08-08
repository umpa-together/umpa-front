import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as DJContext } from '../../context/DJContext';
import RecommentDetail from './RecommentDetail';
import { navigate, push } from '../../navigationRef';
import { tmpWidth } from '../FontNormalize';
import ReportModal from '../ReportModal';
import DeleteModal from '../DeleteModal';

const CommentDetail = ({inputRef, setRecomment, setCommentId}) => {
    const { state, likeComment, unlikeComment, nextComments } = useContext(BoardContext);
    const { getSongs } = useContext(DJContext);
    const { state: userState, getOtheruser } = useContext(UserContext);
    const [deleteModal, setDeleteModal] = useState(false);
    const [curCommentId, setCurCommentId] = useState('');
    const [loading, setLoading] = useState(false);
    const [reportModal, setReportModal] = useState(false);
    const [reportId, setReportId] = useState('');
    /*
    const getData = async () => {
        setLoading(true);
        await nextComments({id: state.currentContent._id, page: state.currentCommentPage});
        setLoading(false);
    };

    const onEndReached = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };
    */

    return (
        <View>
            <FlatList 
                data={state.currentComment}
                keyExtractor={(comment)=>comment._id}
                renderItem={({item}) => {
                    if(!item.isDeleted){
                        return (
                            <View style={styles.commentBox}>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity onPress={async () => {
                                        if(item.postUserId._id == userState.myInfo._id){
                                            navigate('Account');
                                        }else{
                                            await Promise.all([getOtheruser({id:item.postUserId._id}),
                                            getSongs({id:item.postUserId._id})]);
                                            push('OtherAccount', {otherUserId:item.postUserId._id})
                                        }
                                    }}>
                                    { item.postUserId.profileImage == undefined ?
                                    <View style={styles.profile}>
                                       <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                    </View> :
                                    <Image style={styles.profile} source={{uri: item.postUserId.profileImage}} /> }
                                    </TouchableOpacity>
                                    <View style={{marginLeft: 20  * tmpWidth}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={styles.nameText}>{item.postUserId.name}</Text>
                                            <TouchableOpacity onPress={() => {
                                                setReportId(item._id)
                                                setReportModal(true)}}>
                                                <Text style={{ fontSize: 12 * tmpWidth, color: 'rgb(86,86,86)', marginLeft: 5 * tmpWidth}}>신고</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{width: 250 * tmpWidth}}>
                                            <Text style={styles.commentText}>{item.comment}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={styles.timeText}>{item.time}</Text>
                                            {item.likes.includes(userState.myInfo._id) ? 
                                            <TouchableOpacity onPress={async () => await unlikeComment({ contentId: state.currentContent._id, commentId: item._id })}>
                                                <Text style={styles.likeText}>좋아요 {item.likes.length != 0 ? item.likes.length : null}</Text>
                                            </TouchableOpacity> : 
                                            <TouchableOpacity onPress={async () => await likeComment({ contentId: state.currentContent._id, commentId:item._id })}>
                                                <Text style={styles.unlikeText}>좋아요 {item.likes.length != 0 ? item.likes.length : null}</Text>
                                            </TouchableOpacity> }
                                            <TouchableOpacity onPress={() => {
                                                setRecomment(true)
                                                setCommentId(item._id)
                                                inputRef.current.focus()}}>
                                                <Text style={styles.deleteText}>답글 달기</Text>
                                            </TouchableOpacity>
                                            {item.postUserId._id != userState.myInfo._id ? null : 
                                            <TouchableOpacity onPress={() => {
                                                setDeleteModal(true)
                                                setCurCommentId(item._id)}}>
                                                <Text style={styles.deleteText}>삭제</Text>
                                            </TouchableOpacity> }
                                            {deleteModal ? <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} type={'boardComment'} subjectId={curCommentId}/> : null }
                                        </View>
                                    </View>
                                </View>
                                {item.comments.length != 0 ? <RecommentDetail currentComment={item.comments}/> : null }
                            </View>
                        )
                    }else if(item.isDeleted && item.comments.length != 0){
                        return (
                            <View style={styles.commentBox}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.profile}>
                                       <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                    </View>
                                    <View style={{marginLeft: 20 * tmpWidth}}>
                                        <Text style={{fontSize: 12 * tmpWidth}}>(삭제)</Text>
                                        <Text style={{fontSize: 14 * tmpWidth, marginTop: 8 * tmpWidth, marginBottom: 10 * tmpWidth}}>삭제된 댓글입니다.</Text>
                                    </View>
                                </View>
                                {item.comments.length != 0 ? <RecommentDetail currentComment={item.comments}/> : null }
                            </View>
                        )
                    }
                }}
            />
            {reportModal ? <ReportModal reportModal={reportModal} setReportModal={setReportModal} type={'boardComment'} subjectId={reportId} /> : null }
        </View>
    );
};

const styles=StyleSheet.create({
    commentBox: {
        width: '100%',
        paddingTop: 12 * tmpWidth,
        paddingBottom: 12 * tmpWidth,
        paddingLeft: 16 * tmpWidth,
        paddingRight: 16 * tmpWidth,
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
    likeText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(169,193,255)', 
        marginLeft: 16 * tmpWidth
    },
    unlikeText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(86,86,86)',
        marginLeft: 16 * tmpWidth
    },
    deleteText: {
        marginLeft: 12 * tmpWidth, 
        fontSize: 12 * tmpWidth, 
        color:'rgb(86,86,86)'
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

export default CommentDetail;