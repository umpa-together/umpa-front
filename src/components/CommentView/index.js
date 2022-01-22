/* eslint-disable no-lonely-if */
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import timeConverter from 'lib/utils/time';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as DailyContext } from 'context/Daily';
import { Context as UserContext } from 'context/User';
import { useModal } from 'providers/modal';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

const CommentAction = ({ postUserId, id, targetId, likes, opt }) => {
  const { state } = useContext(UserContext);
  const { setDeleteModal, changeDeleteParams } = useModal();
  const [isLike, setIsLike] = useState(likes.includes(state.user._id));
  const deleteCheck = postUserId._id === state.user._id;
  const { likeComment: playlistLike, unLikeComment: playlistUnLike } = useContext(PlaylistContext);
  const { likeComment: dailyLike, unLikeComment: dailyUnLike } = useContext(DailyContext);

  const onPressLike = () => {
    if (isLike) {
      if (opt === 'playlist') {
        playlistUnLike({ playlistId: targetId, id });
      } else if (opt === 'daily') {
        dailyUnLike({ dailyId: targetId, id });
      }
    } else {
      if (opt === 'playlist') {
        playlistLike({ playlistId: targetId, id });
      } else if (opt === 'daily') {
        dailyLike({ dailyId: targetId, id });
      }
    }
    setIsLike(!isLike);
  };
  const onPressDelete = () => {
    if (opt === 'playlist') {
      changeDeleteParams({ data: { opt: 'playlistcomment', targetId, childId: id } });
    } else if (opt === 'daily') {
      changeDeleteParams({ data: { opt: 'dailycomment', targetId, childId: id } });
    }
    setDeleteModal(true);
  };

  return (
    <View style={[style.flexRow, styles.actionContainer]}>
      <TouchableOpacity onPress={onPressLike}>
        <Text style={styles.actionText}>
          {isLike ? `좋아요 취소 ${likes.length}` : `좋아요 ${likes.length}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.actionText}>답글</Text>
      </TouchableOpacity>
      {deleteCheck && (
        <TouchableOpacity onPress={onPressDelete}>
          <Text style={styles.actionText}>지우기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function ({ targetId, comment, opt }) {
  const { text, time, postUserId, likes, _id: id } = comment;
  const { name, profileImage } = postUserId;
  const timeConverted = timeConverter(time);
  const { state } = useContext(UserContext);
  const reportCheck = postUserId._id === state.user._id;

  return (
    <View style={[style.flexRow, styles.container]}>
      <ProfileImage img={profileImage} imgStyle={styles.img} />
      <View style={styles.commentContainer}>
        <View style={[style.flexRow, style.space_between]}>
          <View style={style.flexRow}>
            <Text style={styles.nameText}>{name}</Text>
            {!reportCheck && (
              <TouchableOpacity>
                <Text style={styles.actionText}>신고</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.timeText}>{timeConverted}</Text>
        </View>
        <View style={style.flexRow}>
          <Text style={styles.commentText}>{text}</Text>
        </View>
        <CommentAction
          postUserId={postUserId}
          id={id}
          likes={likes}
          targetId={targetId}
          commentId={id}
          opt={opt}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 343 * SCALE_WIDTH,
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
});
