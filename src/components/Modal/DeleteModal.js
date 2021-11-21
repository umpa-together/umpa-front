import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { tmpWidth } from 'components/FontNormalize';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as BoardContext } from 'context/BoardContext';
import { Context as DailyContext } from 'context/DailyContext';
import { Context as FeedContext } from 'context/FeedContext';
import { goBack } from 'lib/utils/navigation';

const DeleteModal = ({ deleteModal, setDeleteModal, type, subjectId, playlistId, dailyId }) => {
  const [title, setTitle] = useState('');
  const { state, deletePlaylist, deleteComment, deletereComment } = useContext(PlaylistContext);
  const { getMyInfo, deleteStory } = useContext(UserContext);
  const {
    state: boardState,
    deleteContent,
    deleteComment: deleteBoardComment,
    deleteRecomment,
  } = useContext(BoardContext);
  const {
    state: daily,
    deleteDaily,
    deleteComment: dailydeleteComment,
    deletereComment: dailydeletereComment,
  } = useContext(DailyContext);
  const { getFeeds } = useContext(FeedContext);

  const onClose = () => {
    setDeleteModal(false);
  };
  const deleteSelection = async () => {
    setDeleteModal(false);
    if (type === 'playlist') {
      await deletePlaylist({ id: state.current_playlist._id });
      getMyInfo();
      getFeeds();
      goBack();
    } else if (type === 'daily') {
      await deleteDaily({ id: daily.current_daily._id });
      getMyInfo();
      goBack();
      getFeeds();
    } else if (type === 'playlistComment') {
      await deleteComment({ id: playlistId, commentid: subjectId });
    } else if (type === 'playlistReComment') {
      deletereComment({ commentid: subjectId });
    } else if (type === 'dailyComment') {
      await dailydeleteComment({ id: dailyId, commentid: subjectId });
    } else if (type === 'dailyReComment') {
      dailydeletereComment({ commentid: subjectId });
    } else if (type === 'boardContent') {
      await deleteContent({
        contentId: boardState.currentContent._id,
        boardId: boardState.currentContent.boardId,
      });
      getMyInfo();
      goBack();
    } else if (type === 'boardComment') {
      deleteBoardComment({ contentId: boardState.currentContent._id, commentId: subjectId });
    } else if (type === 'boardReComment') {
      deleteRecomment({ contentId: boardState.currentContent._id, commentId: subjectId });
    } else if (type === 'todaySong') {
      deleteStory();
    }
  };

  useEffect(() => {
    if (type === 'boardContent') {
      setTitle('게시글을');
    } else if (
      type === 'boardComment' ||
      type === 'boardReComment' ||
      type === 'playlistComment' ||
      type === 'playlistReComment' ||
      type === 'dailyComment' ||
      type === 'dailyReComment'
    ) {
      setTitle('댓글을');
    } else if (type === 'playlist') {
      setTitle('플레이리스트를');
    } else if (type === 'daily') {
      setTitle('데일리를');
    } else {
      setTitle('오늘의 곡을');
    }
  }, []);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={deleteModal}
      backdropOpacity={0.4}
      onBackdropPress={onClose}
      style={{ margin: 0, alignItems: 'center' }}
    >
      <View style={styles.deleteContainer}>
        <Text style={{ fontSize: 14 * tmpWidth, marginTop: 32 * tmpWidth }}>
          {title} 삭제하시겠습니까?
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 26 * tmpWidth }}>
          <TouchableOpacity style={styles.cancelBox} onPress={() => setDeleteModal(false)}>
            <Text style={{ fontSize: 12 * tmpWidth, color: 'rgb(133,133,133)' }}>취소하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBox}
            onPress={async () => {
              deleteSelection();
            }}
          >
            <Text style={{ fontSize: 12 * tmpWidth, color: 'rgb(86,86,86)' }}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  deleteContainer: {
    width: 285 * tmpWidth,
    height: 131 * tmpWidth,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 4 * tmpWidth,
    alignItems: 'center',
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
    marginRight: 5.5 * tmpWidth,
  },
  deleteBox: {
    width: 105 * tmpWidth,
    height: 34 * tmpWidth,
    borderRadius: 8 * tmpWidth,
    borderWidth: 1 * tmpWidth,
    borderColor: 'rgb(169,193,255)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5.5 * tmpWidth,
  },
});

export default DeleteModal;
