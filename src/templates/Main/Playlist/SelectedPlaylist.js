import React, { useContext, useState, useEffect } from 'react';
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
import SelectedHashtag from 'components/SelectedHashtag';
import { useModal } from 'providers/modal';
import AddedModal from 'components/Modal/AddedModal';
import Footer from 'components/Footer';
import { Context as AddedContext } from 'context/Added';
import HarmfulModal from 'components/Modal/HarmfulModal';
import ActionModal from 'components/Modal/ActionModal';
import CommentProvider from 'providers/comment';
import LoadingIndicator from 'components/LoadingIndicator';
import KeyboardProvider from 'providers/keyboard';
import GuideModal from 'components/Modal/GuideModal';
import TouchableNoDouble from 'components/TouchableNoDouble';
import guideChecker from 'lib/utils/guideChecker';

const AddedAction = ({ playlistId }) => {
  const {
    state: { playlists },
    postAddedPlaylist,
    deleteAddedPlaylist,
  } = useContext(AddedContext);
  const { onClickAdded } = useModal();

  const isAdded = playlists.map((added) => added.playlistId._id).includes(playlistId);
  const onClickAddedPlaylist = () => {
    if (isAdded) {
      deleteAddedPlaylist({
        id: playlists.filter((item) => item.playlistId._id === playlistId)[0]._id,
      });
    } else {
      postAddedPlaylist({ id: playlistId });
      onClickAdded({ opt: 'playlist' });
    }
  };

  return (
    <TouchableNoDouble onPress={onClickAddedPlaylist}>
      <Icon
        source={
          isAdded
            ? require('public/icons/playlist-add-active.png')
            : require('public/icons/playlist-add-inactive.png')
        }
        style={styles.icon}
      />
    </TouchableNoDouble>
  );
};

const PostUserAction = ({ setSelectModal }) => {
  const onClickMenu = () => {
    setSelectModal(true);
  };
  return (
    <TouchableOpacity onPress={onClickMenu} activeOpacity={0.5}>
      <Icon
        source={require('public/icons/playlist-dot.png')}
        style={[styles.actions, style.icons]}
      />
    </TouchableOpacity>
  );
};

export default function SelectedPlaylist({ id, postUserId }) {
  const [selectModal, setSelectModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [actions, setActions] = useState(null);
  const [comment, setComment] = useState(null);
  const [playlist, setPlaylist] = useState({
    _id: '',
    postUserId: '',
    title: '',
    textcontent: '',
    hashtag: [],
    image: '',
    time: '',
    likes: [],
    songs: [],
  });
  const {
    state: { currentComments, currentPlaylist },
    getSelectedPlaylist,
    deletePlaylist,
  } = useContext(PlaylistContext);
  const { postReport } = useContext(ReportContext);
  const { addedModal, guideModal, setGuideModal } = useModal();

  const {
    state: { user },
    getMyInformation,
  } = useContext(UserContext);

  const getPlaylist = async () => {
    if (id) {
      await getSelectedPlaylist({ id, postUserId });
    }
  };
  const setSelected = () => {
    if (currentPlaylist && currentPlaylist._id === id) {
      setPlaylist(currentPlaylist);
      setComment(currentComments);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [id]);

  useEffect(() => {
    setSelected();
  }, [currentPlaylist, currentComments]);

  const { postUserId: postUser, _id, title, textcontent, hashtag, songs, image } = playlist;

  const checkMyPost = postUser._id === user._id;

  const selectLists = checkMyPost
    ? [
        { title: '????????????', key: 'edit' },
        { title: '????????????', key: 'delete' },
      ]
    : [{ title: '????????????', key: 'report' }];

  const deleteActionLists = [
    { title: '????????????', key: 'cancel' },
    { title: '????????????', key: 'delete' },
  ];

  const deleteActionFunction = async (key) => {
    if (key === 'delete') {
      await deletePlaylist({ id: _id });
      getMyInformation();
      goBack();
    }
    setActionModal(false);
  };

  const reportActionLists = [
    { title: '????????????', key: 'cancel' },
    { title: '????????????', key: 'report' },
  ];

  const reportActionFunction = async (key) => {
    if (key === 'report') {
      postReport({ type: 'playlist', reason: '?????? ?????????', subjectId: _id });
    }
    setActionModal(false);
  };

  const selectFunction = checkMyPost
    ? (key) => {
        setSelectModal(false);
        if (key === 'edit') {
          navigate('PlaylistCreate', {
            edit: true,
            data: {
              information: {
                title,
                content: textcontent,
                hashtags: hashtag,
                playlistId: _id,
              },
              songs,
              image: image && { uri: image },
            },
          });
        } else if (key === 'delete') {
          setActions({
            mainTitle: '????????? ????????????????????? ????????? ??? ????????????. \n?????????????????????????',
            func: deleteActionFunction,
            list: deleteActionLists,
          });
          setTimeout(() => {
            setActionModal(true);
          }, 400);
        }
      }
    : (key) => {
        setSelectModal(false);
        if (key === 'report') {
          setActions({
            mainTitle: '????????????????????? ?????????????????????????',
            func: reportActionFunction,
            list: reportActionLists,
          });
          setTimeout(() => {
            setActionModal(true);
          }, 400);
        }
      };

  useEffect(() => {
    guideChecker('playlist', setGuideModal);
  }, []);

  const selectInfo = { func: selectFunction, list: selectLists };
  return (
    <View style={style.background}>
      <Header
        title="??????????????????"
        titleStyle={style.headertitle}
        back
        actions={[
          <AddedAction playlistId={playlist._id} />,
          <PostUserAction setSelectModal={setSelectModal} />,
        ]}
      />
      {comment ? (
        <>
          <CommentProvider>
            <ScrollView>
              <SelectedInfo playlist={playlist} />
              <SelectedHashtag hashtag={hashtag} />
              <SelectedSong songs={songs} />
              <Footer object={currentPlaylist} type="playlist" />
              <Divider containerStyle={styles.dividerContainer} />
              <SelectedComment opt="playlist" comments={comment} />
            </ScrollView>
            <KeyboardProvider>
              <CommentBar />
            </KeyboardProvider>
          </CommentProvider>
          <ActionModal modal={actionModal} setModal={setActionModal} actionInfo={actions} />
          <SelectModal modal={selectModal} setModal={setSelectModal} selectInfo={selectInfo} />
          {addedModal && <AddedModal />}
          <HarmfulModal />
        </>
      ) : (
        <LoadingIndicator />
      )}
      <GuideModal modal={guideModal === 'playlist'} setModal={setGuideModal} />
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
    right: -15 * SCALE_WIDTH,
  },
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    right: -15 * SCALE_WIDTH,
  },
});
