import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from 'components/Header';
import style from 'constants/styles';
import SelectedInfo from 'components/Playlist/SelectedInfo';
import SelectedSong from 'components/Playlist/SelectedSong';
import Divider from 'widgets/Divider';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as UserContext } from 'context/User';
import { Context as ReportContext } from 'context/Report';
import CommentBar from 'components/CommentBar';
import SelectedComment from 'components/SelectedComment';
import { navigate, goBack } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import SelectModal from 'components/Modal/SelectModal';
import SelectedHashtag from 'components/Playlist/SelectedHashtag';
import { useModal } from 'providers/modal';
import AddedModal from 'components/Modal/AddedModal';
import Footer from 'components/Footer';
import { Provider as AddedProvider, Context as AddedContext } from 'context/Added';
import HarmfulModal from 'components/Modal/HarmfulModal';
import PlayBar from 'components/PlayBar';
import { useTrackPlayer } from 'providers/trackPlayer';
import ActionModal from 'components/Modal/ActionModal';
import SendList from 'lib/utils/kakaoShare';
import CommentProvider from 'providers/comment';

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

export default function SelectedPlaylist({ post }) {
  const [selectModal, setSelectModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [actions, setActions] = useState(null);
  const {
    state: { currentComments, currentPlaylist },
    deletePlaylist,
  } = useContext(PlaylistContext);
  const { postAddedPlaylist } = useContext(AddedContext);
  const { postReport } = useContext(ReportContext);
  const { addedModal } = useModal();
  const {
    state: { user },
    getMyInformation,
  } = useContext(UserContext);
  const checkMyPost = currentPlaylist.postUserId._id === user._id;
  const { currentSong, duration } = useTrackPlayer();
  const footerData = {
    _id: currentPlaylist._id,
    likes: currentPlaylist.likes,
    comments: currentPlaylist.comments,
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

  const deleteActionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '삭제하기', key: 'delete' },
  ];

  const deleteActionFunction = async (key) => {
    if (key === 'delete') {
      await deletePlaylist({ id: currentPlaylist._id });
      getMyInformation();
      goBack();
    }
    setActionModal(false);
  };

  const reportActionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '신고하기', key: 'report' },
  ];

  const reportActionFunction = async (key) => {
    if (key === 'report') {
      postReport({ type: 'playlist', reason: '플리 부적절', subjectId: currentPlaylist._id });
    }
    setActionModal(false);
  };

  const selectFunction = checkMyPost
    ? (key) => {
        if (key === 'edit') {
          navigate('PlaylistCreate', {
            edit: true,
            data: {
              information: {
                title: currentPlaylist.title,
                content: currentPlaylist.textcontent,
                hashtags: currentPlaylist.hashtag,
                playlistId: currentPlaylist._id,
              },
              songs: currentPlaylist.songs,
              image: currentPlaylist.image && { uri: currentPlaylist.image },
            },
          });
        } else if (key === 'delete') {
          setActions({
            mainTitle: '삭제된 플레이리스트는 복구할 수 없습니다. 삭제하시겠습니까?',
            func: deleteActionFunction,
            list: deleteActionLists,
          });
          setActionModal(true);
        }
        setSelectModal(false);
      }
    : (key) => {
        if (key === 'report') {
          setActions({
            mainTitle: '플레이리스트를 신고하시겠습니까?',
            func: reportActionFunction,
            list: reportActionLists,
          });
          setActionModal(true);
        } else if (key === 'save') {
          postAddedPlaylist({ id: currentPlaylist._id });
        } else if (key === 'share') {
          SendList({ playlist: currentPlaylist });
        }
        setSelectModal(false);
      };

  return (
    <View style={style.background}>
      <CommentProvider>
        <ScrollView>
          <Header
            title="플레이리스트"
            titleStyle={style.headertitle}
            landings={post && [<LandingAction />]}
            back={!post}
            actions={[<PostUserAction setSelectModal={setSelectModal} />]}
          />
          <SelectedInfo />
          <SelectedHashtag />
          <AddedProvider>
            <SelectedSong />
          </AddedProvider>
          <Footer object={footerData} type="playlist" />
          <Divider containerStyle={styles.dividerContainer} />
          <SelectedComment opt="playlist" comments={currentComments} />
        </ScrollView>
        {currentSong && duration !== 0 && <PlayBar />}
        <CommentBar />
      </CommentProvider>
      <SelectModal
        modal={selectModal}
        setModal={setSelectModal}
        selectInfo={{ func: selectFunction, list: selectLists }}
      />
      <ActionModal modal={actionModal} setModal={setActionModal} actionInfo={actions} />

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
