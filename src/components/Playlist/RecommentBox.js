import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ReportModal from 'components/Modal/ReportModal';
import DeleteModal from 'components/Modal/DeleteModal';
import ProfileImage from 'widgets/ProfileImage';
import { usePlaylist } from 'providers/playlist';

const RecommentBox = ({ recomments }) => {
  const { likesrecomment, unlikesrecomment } = useContext(PlaylistContext);
  const { state: userState } = useContext(UserContext);
  const [commentReportModal, setCommentReportModal] = useState(false);
  const [reCommentDeleteModal, setReCommentDeleteModal] = useState(false);
  const { postUserId: postUser, time, likes, text, _id: id } = recomments;
  const { onClickProfile, currentComment } = usePlaylist();

  const onClickRecommentLike = () => {
    if (likes.includes(userState.myInfo._id)) {
      unlikesrecomment({ commentid: currentComment._id, id });
    } else {
      likesrecomment({ commentid: currentComment._id, id });
    }
  };

  const onClickReport = () => {
    setCommentReportModal(true);
  };

  const onClickDelete = () => {
    setReCommentDeleteModal(true);
  };

  const onClickUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.commentBox}>
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
        <Hyperlink linkStyle={styles.link} onPress={(url) => onClickUrl(url)}>
          <Text style={styles.comment}>{text}</Text>
        </Hyperlink>
        <View style={styles.flexRow}>
          <TouchableOpacity onPress={onClickRecommentLike}>
            <Text
              style={likes.includes(userState.myInfo._id) ? styles.likeText : styles.notLikeText}
            >
              좋아요 {likes.length !== 0 && likes.length}
            </Text>
          </TouchableOpacity>
          {userState.myInfo._id === postUser._id && (
            <TouchableOpacity onPress={onClickDelete}>
              <Text style={styles.notLikeText}>지우기</Text>
            </TouchableOpacity>
          )}
          {commentReportModal && (
            <ReportModal
              reportModal={commentReportModal}
              setReportModal={setCommentReportModal}
              type="playlistReComment"
              subjectId={id}
            />
          )}
          {reCommentDeleteModal && (
            <DeleteModal
              deleteModal={reCommentDeleteModal}
              setDeleteModal={setReCommentDeleteModal}
              type="playlistReComment"
              subjectId={id}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    paddingLeft: 20 * tmpWidth,
    paddingBottom: 16 * tmpWidth,
    paddingTop: 15 * tmpWidth,
    paddingRight: 18 * tmpWidth,
    flexDirection: 'row',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5 * tmpWidth,
  },
  profileImg: {
    height: 32 * tmpWidth,
    width: 32 * tmpWidth,
    borderRadius: 32 * tmpWidth,
    marginRight: 14 * tmpWidth,
  },
  contentBox: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    marginRight: 16 * tmpWidth,
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
  },
  time: {
    fontSize: 12 * tmpWidth,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.72)',
  },
  link: {
    fontSize: 14 * tmpWidth,
    lineHeight: 20 * tmpWidth,
    fontWeight: '400',
    color: '#2980b9',
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
    color: 'rgb(193,74,73)',
    fontWeight: '400',
    marginRight: 12 * tmpWidth,
  },
  notLikeText: {
    fontSize: 14 * tmpWidth,
    color: '#5d5d5d',
    fontWeight: '400',
    marginRight: 12 * tmpWidth,
  },
  report: {
    fontSize: 12 * tmpWidth,
    color: '#5d5d5d',
    fontWeight: '400',
  },
});

export default RecommentBox;
