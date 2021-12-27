import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'widgets/ProfileImage';
import ReportModal from 'components/Modal/ReportModal';
import DeleteModal from 'components/Modal/DeleteModal';
import { useDaily } from 'providers/daily';

const CommentBox = ({ comment }) => {
  const { state: userState } = useContext(UserContext);
  const { postUserId: postUser, time, text, likes, recomments, _id: id, dailyId } = comment;
  const [commentReportModal, setCommentReportModal] = useState(false);
  const [commentDeleteModal, setCommentDeleteModal] = useState(false);
  const { onClickComment, onClickProfile, onClickCommentLikes } = useDaily();

  const onClickComments = async (comments) => {
    onClickComment(comments);
  };

  const onClickReport = () => {
    setCommentReportModal(true);
  };

  const onClickDelete = () => {
    setCommentDeleteModal(true);
  };

  const onClickUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onClickComments(comment)}>
      <TouchableOpacity onPress={() => onClickProfile(postUser._id)}>
        <ProfileImage img={postUser.profileImage} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <View style={styles.contentBox}>
        <View style={styles.contentHeader}>
          <View style={styles.flexRow}>
            <Text style={styles.name}>{postUser.name}</Text>
            <TouchableOpacity onPress={onClickReport}>
              <Text style={styles.report}>신고</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Hyperlink linkStyle={styles.link} onPress={(url) => onClickUrl(url)}>
          <Text style={styles.content}>{text}</Text>
        </Hyperlink>
        <View style={styles.contentFooter}>
          <TouchableOpacity onPress={() => onClickCommentLikes(likes, dailyId, id)}>
            <Text
              style={likes.includes(userState.myInfo._id) ? styles.likeText : styles.notLikeText}
            >
              좋아요 {likes.length !== 0 && likes.length}
            </Text>
          </TouchableOpacity>
          <Text style={styles.notLikeText}>
            답글 {recomments.length !== 0 && recomments.length}
          </Text>
          {userState.myInfo._id === postUser._id && (
            <TouchableOpacity onPress={onClickDelete}>
              <Text style={styles.notLikeText}>지우기</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {commentReportModal && (
        <ReportModal
          reportModal={commentReportModal}
          setReportModal={setCommentReportModal}
          type="dailyComment"
          subjectId={id}
        />
      )}
      {commentDeleteModal && (
        <DeleteModal
          deleteModal={commentDeleteModal}
          setDeleteModal={setCommentDeleteModal}
          type="dailyComment"
          subjectId={id}
          dailyId={dailyId}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5 * tmpWidth,
    borderBottomColor: '#dfdfdf',
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
    marginTop: 16 * tmpWidth,
    paddingBottom: 16 * tmpWidth,
  },
  profileImg: {
    width: 32 * tmpWidth,
    height: 32 * tmpWidth,
    borderRadius: 32 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentBox: {
    marginLeft: 16 * tmpWidth,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  name: {
    fontSize: 14 * tmpWidth,
    marginRight: 16 * tmpWidth,
    fontWeight: '400',
  },
  report: {
    fontSize: 12 * tmpWidth,
    color: '#5d5d5d',
    fontWeight: '400',
  },
  time: {
    fontSize: 12 * tmpWidth,
    color: 'rgba(0,0,0,0.72)',
    fontWeight: '400',
  },
  content: {
    fontSize: 14 * tmpWidth,
    lineHeight: 20 * tmpWidth,
    marginTop: 8 * tmpWidth,
    fontWeight: '400',
  },
  likeText: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    color: 'rgb(193,74,73)',
    marginRight: 12 * tmpWidth,
  },
  notLikeText: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    color: 'rgb(93,93,93)',
    marginRight: 12 * tmpWidth,
  },
  contentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8 * tmpWidth,
  },
  link: {
    fontSize: 14 * tmpWidth,
    lineHeight: 20 * tmpWidth,
    fontWeight: '400',
    color: '#2980b9',
  },
});

export default CommentBox;
