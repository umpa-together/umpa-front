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
    <View style={style.flexRow}>
      <TouchableOpacity onPress={onPressLike}>
        <Text>{isLike ? `좋아요 취소${likes.length}` : `좋아요${likes.length}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>답글</Text>
      </TouchableOpacity>
      {deleteCheck && (
        <TouchableOpacity onPress={onPressDelete}>
          <Text>지우기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function ({ targetId, comment, opt }) {
  const { text, time, postUserId, likes, _id: id } = comment;
  const { name, profileImage } = postUserId;
  const timeConverted = timeConverter(time);
  return (
    <View style={style.flexRow}>
      <ProfileImage img={profileImage} imgStyle={styles.img} />
      <View>
        <View style={style.flexRow}>
          <Text>{name}</Text>
          <TouchableOpacity>
            <Text>신고</Text>
          </TouchableOpacity>
          <Text>{timeConverted}</Text>
        </View>
        <View style={style.flexRow}>
          <Text>{text}</Text>
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
  img: {
    width: 40,
    height: 40,
    borderWidth: 1,
  },
});
