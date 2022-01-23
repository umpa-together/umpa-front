import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from 'components/Header';
import style from 'constants/styles';
import SelectedInfo from 'components/Playlist/SelectedInfo';
import SelectedSong from 'components/Playlist/SelectedSong';
import Divider from 'widgets/Divider';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as UserContext } from 'context/User';
import CommentBar from 'components/CommentBar';
// import DeleteModal from 'components/Modal/DeleteMoal';
import SelectedComment from 'components/SelectedComment';
import { navigate, goBack } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import SelectModal from 'components/Modal/SelectModal';
import SelectedHashtag from 'components/Playlist/SelectedHashtag';
import { useModal } from 'providers/modal';
import AddedModal from 'components/Modal/AddedModal';
import Footer from 'components/Feed/Footer';
import { Provider as AddedProvider, Context as AddedContext } from 'context/Added';
import HarmfulModal from 'components/Modal/HarmfulModal';
import PlayBar from 'components/PlayBar';
import { useTrackPlayer } from 'providers/trackPlayer';
import ActionModal from 'components/Modal/ActionModal';
import SendList from 'lib/utils/kakaoShare';

const PostUserAction = ({ setSelectModal }) => {
  const onClickMenu = () => {
    setSelectModal(true);
  };
  return (
    <TouchableOpacity onPress={onClickMenu} activeOpacity={0.5}>
      <Icon source={require('public/icons/dot-menu.png')} style={[styles.actions, style.icons]} />
    </TouchableOpacity>
  );
};

const LandingAction = () => {
  const onPressLanding = () => {
    navigate('Feed');
  };
  return (
    <TouchableOpacity onPress={onPressLanding} style={styles.back} activeOpacity={0.9}>
      <Icon source={require('public/icons/back-40.png')} style={style.icons} />
    </TouchableOpacity>
  );
};

export default function SelectedPlaylist({ post, playlistId, postUser }) {
  const [selectModal, setSelectModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const { state, addComment, deletePlaylist } = useContext(PlaylistContext);
  const { postAddedPlaylist } = useContext(AddedContext);
  const { addedModal } = useModal();
  const {
    state: { user },
    getMyInformation,
  } = useContext(UserContext);
  const checkMyPost = postUser === user._id;
  const { currentComments, currentPlaylist } = state;
  const { currentSong, duration } = useTrackPlayer();
  const { hashtag } = currentPlaylist;
  const passData = {
    _id: currentPlaylist._id,
    likes: currentPlaylist.likes,
    comments: currentComments,
  };
  const selectLists = checkMyPost
    ? [
        { title: '편집하기', key: 'edit' },
        { title: '삭제하기', key: 'delete' },
      ]
    : [
        { title: '신고하기', key: 'report' },
        { title: '플레이리스트 저장', key: 'save' },
        { title: '플레이리스트 공유', key: 'share' },
      ];

  const actionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '삭제하기', key: 'delete' },
  ];

  const actionFunction = async (key) => {
    if (key === 'cancel') {
      setActionModal(false);
    } else {
      setActionModal(false);
      await deletePlaylist({ id: currentPlaylist._id });
      getMyInformation();
      goBack();
    }
  };

  const selectFunction = checkMyPost
    ? (key) => {
        if (key === 'edit') {
          console.log('edit');
        } else if (key === 'delete') {
          setActionModal(true);
        }
        setSelectModal(false);
      }
    : (key) => {
        if (key === 'report') {
          console.log('report');
        } else if (key === 'save') {
          postAddedPlaylist({ id: currentPlaylist._id });
        } else if (key === 'share') {
          SendList({ playlist: currentPlaylist });
        }
        setSelectModal(false);
      };

  return (
    <View style={style.background}>
      <ScrollView>
        <Header
          title="플레이리스트"
          titleStyle={style.headertitle}
          landings={post && [<LandingAction />]}
          back={!post}
          actions={[<PostUserAction setSelectModal={setSelectModal} />]}
        />
        <SelectedInfo playlistinfo={currentPlaylist} />
        <SelectedHashtag hashtags={hashtag} />
        <AddedProvider>
          <SelectedSong songs={currentPlaylist.songs} />
        </AddedProvider>
        <Footer object={passData} type="playlist" />
        <Divider containerStyle={styles.dividerContainer} />
        <SelectedComment opt="playlist" targetId={playlistId} comments={currentComments} />
      </ScrollView>
      {currentSong && duration !== 0 && <PlayBar />}
      <CommentBar targetId={playlistId} action={addComment} />
      <ActionModal
        modal={actionModal}
        setModal={setActionModal}
        actionInfo={{
          mainTitle: '삭제된 플레이리스트는 복구할 수 없습니다. 삭제하시겠습니까?',
          func: actionFunction,
          list: actionLists,
        }}
      />
      <SelectModal
        modal={selectModal}
        setModal={setSelectModal}
        selectInfo={{ func: selectFunction, list: selectLists }}
      />
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
      <HarmfulModal />
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    left: -15 * SCALE_WIDTH,
  },
  dividerContainer: {
    marginLeft: 19 * SCALE_WIDTH,
    marginRight: 13 * SCALE_WIDTH,
    height: 1 * SCALE_HEIGHT,
    backgroundColor: '#DCDCDC',
    marginTop: 2 * SCALE_HEIGHT,
    marginBottom: 16 * SCALE_HEIGHT,
  },
  actions: {
    right: -10 * SCALE_WIDTH,
  },
});
