/* eslint-disable no-lonely-if */
import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import timeConverter from 'lib/utils/time';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as DailyContext } from 'context/Daily';
import { Context as RelayContext } from 'context/Relay';
import { Context as UserContext } from 'context/User';
import { Context as ReportContext } from 'context/Report';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import ActionModal from 'components/Modal/ActionModal';
import { useComment } from 'providers/comment';
import Hyperlink from 'react-native-hyperlink';
import openURL from 'lib/utils/openUrl';
import Text from 'components/Text';

const CommentAction = ({ postUserId, commentId, likes, opt }) => {
  const {
    state: { user },
  } = useContext(UserContext);
  const deleteCheck = postUserId === user._id;
  const commentChecker = ['playlistComment', 'dailyComment', 'relayComment'];
  const {
    state: { currentPlaylist },
    likeComment: playlistCommentLike,
    unLikeComment: playlistCommentUnLike,
    likeRecomment: playlistRecommentLike,
    unLikeRecomment: playlistRecommentUnLike,
    deleteComment: playlistDeleteComment,
    deleteRecomment: playlistDeleteRecomment,
  } = useContext(PlaylistContext);
  const {
    state: { currentDaily },
    likeComment: dailyCommentLike,
    unLikeComment: dailyCommentUnLike,
    likeRecomment: dailyRecommentLike,
    unLikeRecomment: dailyRecommentUnLike,
    deleteComment: dailyDeleteComment,
    deleteRecomment: dailyDeleteRecomment,
  } = useContext(DailyContext);
  const {
    state: { selectedRelay },
    likeComment: relayCommentLike,
    unLikeComment: relayCommentUnLike,
    likeRecomment: relayRecommentLike,
    unLikeRecomment: relayRecommentUnLike,
    deleteComment: relayDeleteComment,
    deleteRecomment: relayDeleteRecomment,
  } = useContext(RelayContext);
  const { commentRef, setCommentInfo } = useComment();
  const [deleteModal, setDeleteModal] = useState(false);

  const onPressLike = () => {
    if (likes.includes(user._id)) {
      if (opt === 'playlistComment') {
        playlistCommentUnLike({ playlistId: currentPlaylist._id, id: commentId });
      } else if (opt === 'playlistRecomment') {
        playlistRecommentUnLike({ playlistId: currentPlaylist._id, id: commentId });
      } else if (opt === 'dailyComment') {
        dailyCommentUnLike({ dailyId: currentDaily._id, id: commentId });
      } else if (opt === 'dailyRecomment') {
        dailyRecommentUnLike({ dailyId: currentDaily._id, id: commentId });
      } else if (opt === 'relayComment') {
        relayCommentUnLike({ relayId: selectedRelay.playlist._id, id: commentId });
      } else if (opt === 'relayRecomment') {
        relayRecommentUnLike({ relayId: selectedRelay.playlist._id, id: commentId });
      }
    } else {
      if (opt === 'playlistComment') {
        playlistCommentLike({ playlistId: currentPlaylist._id, id: commentId });
      } else if (opt === 'playlistRecomment') {
        playlistRecommentLike({ playlistId: currentPlaylist._id, id: commentId });
      } else if (opt === 'dailyComment') {
        dailyCommentLike({ dailyId: currentDaily._id, id: commentId });
      } else if (opt === 'dailyRecomment') {
        dailyRecommentLike({ dailyId: currentDaily._id, id: commentId });
      } else if (opt === 'relayComment') {
        relayCommentLike({ relayId: selectedRelay.playlist._id, id: commentId });
      } else if (opt === 'relayRecomment') {
        relayRecommentLike({ relayId: selectedRelay.playlist._id, id: commentId });
      }
    }
  };

  const onPressDelete = () => {
    setDeleteModal(true);
  };

  const actionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '삭제하기', key: 'delete' },
  ];

  const actionFunction = (key) => {
    if (key === 'delete') {
      if (opt === 'playlistComment') {
        playlistDeleteComment({ id: currentPlaylist._id, commentId });
      } else if (opt === 'playlistRecomment') {
        playlistDeleteRecomment({ id: currentPlaylist._id, commentId });
      } else if (opt === 'dailyComment') {
        dailyDeleteComment({ id: currentDaily._id, commentId });
      } else if (opt === 'dailyRecomment') {
        dailyDeleteRecomment({ id: currentDaily._id, commentId });
      } else if (opt === 'relayComment') {
        relayDeleteComment({ id: selectedRelay.playlist._id, commentId });
      } else if (opt === 'relayRecomment') {
        relayDeleteRecomment({ id: selectedRelay.playlist._id, commentId });
      }
    }
    setDeleteModal(false);
  };

  const onClickRecomment = () => {
    commentRef.current.focus();
    if (opt === 'playlistComment') {
      setCommentInfo('playlistRecomment', commentId);
    } else if (opt === 'dailyComment') {
      setCommentInfo('dailyRecomment', commentId);
    } else if (opt === 'relayComment') {
      setCommentInfo('relayRecomment', commentId);
    }
  };

  return (
    <View style={[style.flexRow, styles.actionContainer]}>
      <TouchableOpacity onPress={onPressLike}>
        <Text style={styles.actionText}>
          <Text style={likes.includes(user._id) && styles.active}>
            좋아요 {likes.length > 0 && likes.length}
          </Text>
        </Text>
      </TouchableOpacity>
      {commentChecker.includes(opt) && (
        <TouchableOpacity onPress={onClickRecomment}>
          <Text style={styles.actionText}>답글</Text>
        </TouchableOpacity>
      )}
      {deleteCheck && (
        <TouchableOpacity onPress={onPressDelete}>
          <Text style={styles.actionText}>지우기</Text>
        </TouchableOpacity>
      )}
      <ActionModal
        modal={deleteModal}
        setModal={setDeleteModal}
        actionInfo={{
          mainTitle: '댓글을 삭제하시겠습니까??',
          func: actionFunction,
          list: actionLists,
        }}
      />
    </View>
  );
};

export default function ({ comment, opt }) {
  const {
    text,
    time,
    postUserId: { name, profileImage, _id: postUserId },
    likes,
    _id: commentId,
  } = comment;
  const timeConverted = timeConverter(time);
  const RecommentChecker = ['playlistRecomment', 'dailyRecomment', 'relayRecomment'];
  const {
    state: { user },
  } = useContext(UserContext);
  const { postReport } = useContext(ReportContext);
  const reportCheck = postUserId === user._id;
  const [reportModal, setReportModal] = useState(false);
  const actionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '신고하기', key: 'report' },
  ];
  const actionFunction = (key) => {
    if (key === 'report') {
      postReport({ type: 'playlistComment', reason: '댓글 부적절', subjectId: id });
    }
    setReportModal(false);
  };

  const onClickReport = () => {
    setReportModal(true);
  };
  return (
    <View
      style={[
        style.flexRow,
        styles.container,
        {
          marginLeft: RecommentChecker.includes(opt) && 47 * SCALE_WIDTH,
        },
      ]}
    >
      <ProfileImage img={profileImage} imgStyle={styles.img} />
      <View style={styles.commentContainer}>
        <View style={[style.flexRow, style.space_between]}>
          <View style={style.flexRow}>
            <Text style={styles.nameText}>{name}</Text>
            {!reportCheck && (
              <TouchableOpacity onPress={onClickReport}>
                <Text style={styles.actionText}>신고</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.timeText}>{timeConverted}</Text>
        </View>
        <Hyperlink linkStyle={styles.link} onPress={(url) => openURL(url)}>
          <Text style={styles.commentText}>{text}</Text>
        </Hyperlink>
        <CommentAction postUserId={postUserId} likes={likes} commentId={commentId} opt={opt} />
      </View>
      <ActionModal
        modal={reportModal}
        setModal={setReportModal}
        actionInfo={{
          mainTitle: '댓글을 신고하시겠습니까?',
          func: actionFunction,
          list: actionLists,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20 * SCALE_HEIGHT,
    alignItems: 'flex-start',
  },
  img: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    borderRadius: 32 * SCALE_HEIGHT,
  },
  commentContainer: {
    flex: 1,
    marginLeft: 16 * SCALE_WIDTH,
  },
  nameText: {
    fontSize: FS(14),
    marginRight: 16 * SCALE_WIDTH,
  },
  timeText: {
    fontSize: FS(12),
    color: 'rgba(80,80,80,0.72)',
  },
  commentText: {
    fontSize: FS(14),
    marginTop: 8 * SCALE_HEIGHT,
  },
  actionContainer: {
    marginTop: 9 * SCALE_HEIGHT,
  },
  actionText: {
    fontSize: FS(12),
    color: '#5D5D5D',
    marginRight: 16 * SCALE_WIDTH,
  },
  active: {
    color: '#E82C2C',
  },
  link: {
    fontSize: FS(14),
    color: '#2980b9',
  },
});
