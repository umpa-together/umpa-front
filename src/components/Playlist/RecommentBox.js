import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ReportModal from 'components/ReportModal';
import DeleteModal from 'components/DeleteModal';
import ProfileImage from 'components/ProfileImage'
import { usePlaylist } from 'providers/playlist';

export default RecommentBox = ({ recomments }) => {
    const { likesrecomment, unlikesrecomment } = useContext(PlaylistContext);
    const { state: userState } = useContext(UserContext);
    const [commentReportModal, setCommentReportModal] = useState(false);
    const [reCommentDeleteModal, setReCommentDeleteModal] = useState(false);
    const { postUserId: postUser, time, likes, text, _id: id } = recomments
    const { onClickProfile, currentComment } = usePlaylist()
    
    const onClickRecommentLike = () => {
        if(likes.includes(userState.myInfo._id)){
            unlikesrecomment({ commentid: currentComment._id, id })
        } else {
            likesrecomment({ commentid: currentComment._id, id })
        }
    }

    const onClickReport = () => {
        setCommentReportModal(true)
    }

    const onClickDelete = () => {
        setReCommentDeleteModal(true)
    }

    return (
        <View style={styles.commentBox}>
            <TouchableOpacity onPress={() => onClickProfile(postUser._id)}>
                <ProfileImage img={postUser.profileImage} imgStyle={styles.profileImg} />
            </TouchableOpacity>
            <View>
                <View style={styles.flexRow}>
                    <Text style={styles.user}>{postUser.name}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <View style={styles.commentArea}>
                    <Text style={styles.comment}>{text}</Text>
                </View>
                <View style={styles.flexRow}>
                    <TouchableOpacity
                        onPress={onClickRecommentLike}
                    >
                        <Text 
                            style={likes.includes(userState.myInfo._id) ? styles.likeText: styles.notLikeText}
                        >
                            좋아요 {likes.length !== 0 && likes.length}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClickReport}>
                        <Text style={styles.deleteText}>신고</Text>
                    </TouchableOpacity>
                    { userState.myInfo._id == postUser._id &&
                    <TouchableOpacity onPress={onClickDelete} >
                        <Text style={styles.deleteText}>지우기</Text>
                    </TouchableOpacity> }
                    { commentReportModal && <ReportModal reportModal={commentReportModal} setReportModal={setCommentReportModal} type={'playlistReComment'} subjectId={id} /> }
                    { reCommentDeleteModal && <DeleteModal deleteModal={reCommentDeleteModal} setDeleteModal={setReCommentDeleteModal} type={'playlistReComment'} subjectId={id}/> }
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    commentBox: {
        marginLeft: 20 * tmpWidth,
        marginBottom: 24 * tmpWidth,
        flexDirection: 'row',
        marginRight: 20 * tmpWidth,
    },
    profileImg:{
        height: 32 * tmpWidth,
        width: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
        marginRight: 14 * tmpWidth,
    },
    flexRow: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    user: {
        marginRight: 14 * tmpWidth, 
        fontSize: 12 * tmpWidth, 
        color: 'rgba(0,0,0,0.72)',
    },
    time: {
        fontSize: 11 * tmpWidth, 
        color: 'rgba(0,0,0,0.72)'
    },
    commentArea: {
        marginRight: 50 * tmpWidth
    },
    comment: {
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
    deleteText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginLeft: 8 * tmpWidth
    },
})