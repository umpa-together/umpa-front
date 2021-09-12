import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ReportModal from 'components/ReportModal';
import { usePlaylist } from 'providers/playlist';
import ProfileImage from 'components/ProfileImage'
import DeleteModal from 'components/DeleteModal';

export default RecommentTarget = () => {
    const { state: userState } = useContext(UserContext);
    const { currentComment, onClickProfile, onClickCommentLikes } = usePlaylist()
    const [commentReportModal, setCommentReportModal] = useState(false);
    const [commentDeleteModal, setCommentDeleteModal] = useState(false);
    const { postUserId: postUser, time, text, likes, recomments, _id: id, playlistId } = currentComment

    const onClickReport = () => {
        setCommentReportModal(true)
    }

    const onClickDelete = () => {
        setCommentDeleteModal(true)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onClickProfile(postUser._id)}>
                <ProfileImage img={postUser.profileImage} imgStyle={styles.profileImg} />
            </TouchableOpacity>
            <View style={styles.contentBox}>
                <View style={styles.contentHeader}>
                    <View style={styles.flexRow}>
                        <Text style={styles.user}>{postUser.name}</Text>
                        <TouchableOpacity onPress={onClickReport}>
                            <Text style={styles.report}>신고</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <Text style={styles.comment}>{text}</Text>
                <View style={styles.flexRow}>
                    <TouchableOpacity
                        onPress={() => onClickCommentLikes(likes, playlistId, id)}
                    >
                        <Text 
                            style={likes.includes(userState.myInfo._id) ? styles.likeText: styles.notLikeText}
                        >
                            좋아요 {likes.length !== 0 && likes.length}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.notLikeText}>답글 {recomments.length !== 0 && recomments.length}</Text>
                    { userState.myInfo._id === postUser._id && 
                    <TouchableOpacity onPress={onClickDelete}>
                        <Text style={styles.notLikeText}>지우기</Text>
                    </TouchableOpacity> }
                    { commentReportModal && <ReportModal reportModal={commentReportModal} setReportModal={setCommentReportModal} type={'playlistComment'} subjectId={id} /> }
                    { commentDeleteModal && <DeleteModal deleteModal={commentDeleteModal} setDeleteModal={setCommentDeleteModal} type={'playlistComment'} subjectId={id} playlistId={playlistId}/> }
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#eef4ff',
        flexDirection: 'row',
        paddingLeft: 20 * tmpWidth,
        paddingRight: 30 * tmpWidth,
        paddingTop: 20 * tmpWidth,
        paddingBottom: 20 * tmpWidth,
    },
    contentBox: {
        flex: 1
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileImg:{
        height: 32 * tmpWidth,
        width: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
        marginRight: 16 * tmpWidth,
    },
    flexRow: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    user: {
        marginRight: 16 * tmpWidth, 
        fontSize: 14 * tmpWidth, 
        fontWeight: '400'
    },
    time: {
        fontSize: 12 * tmpWidth, 
        fontWeight: '400',
        color: 'rgba(0,0,0,0.72)'
    },
    comment: {
        fontSize: 14 * tmpWidth, 
        fontWeight: '400',
        lineHeight: 20 * tmpWidth,
        marginTop: 8 * tmpWidth, 
        marginBottom: 8 * tmpWidth,
    },
    likeText: {
        fontSize: 14 * tmpWidth,
        fontWeight: '400', 
        color: 'rgb(193,74,73)',
        marginRight: 12 * tmpWidth

    },
    notLikeText: {
        fontSize: 14 * tmpWidth, 
        fontWeight: '400',
        color: '#5d5d5d',
        marginRight: 12 * tmpWidth
    },
    report: {
        fontSize: 12 * tmpWidth,
        fontWeight: '400',
        color: '#5d5d5d'
    }
})