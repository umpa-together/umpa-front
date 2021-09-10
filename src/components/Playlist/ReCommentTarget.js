import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ReportModal from 'components/ReportModal';
import { usePlaylist } from 'providers/playlist';
import ProfileImage from 'components/ProfileImage'

export default RecommentTarget = () => {
    const { state: userState } = useContext(UserContext);
    const { currentComment, onClickProfile, onClickCommentLikes } = usePlaylist()
    const [commentReportModal, setCommentReportModal] = useState(false);
    const { postUserId: postUser, time, text, likes, recomments, _id: id, playlistId } = currentComment

    const onClickReport = () => {
        setCommentReportModal(true)
    }

    return (
        <View style={styles.container}>
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
                        onPress={() => onClickCommentLikes(likes, playlistId, id)}
                    >
                        <Text 
                            style={likes.includes(userState.myInfo._id) ? styles.likeText: styles.notLikeText}
                        >
                            좋아요 {likes.length !== 0 && likes.length}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.deleteText}>답글 {recomments.length !== 0 && recomments.length}</Text>
                    <TouchableOpacity onPress={onClickReport}>
                        <Text style={styles.deleteText}>신고</Text>
                    </TouchableOpacity>
                    { commentReportModal && <ReportModal reportModal={commentReportModal} setReportModal={setCommentReportModal} type={'playlistComment'} subjectId={id} /> }
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgb(238,244,255)',
        flexDirection: 'row',
        paddingLeft: 20 * tmpWidth,
        paddingTop: 30 * tmpWidth,
        paddingBottom: 16 * tmpWidth,
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
        width: 280 * tmpWidth
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