import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import { Context as ReportContext } from 'context/Report';
import { Context as UserContext } from 'context/User';
import style from 'constants/styles';
import Information from 'components/Relay/Information';
import MusicSection from 'components/Relay/MusicSection';
import NavButton from 'components/Relay/NavButton';
import { useFocusEffect } from '@react-navigation/native';
import Header from 'components/Header';
import { COLOR_1 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import SongActionsProvider from 'providers/songActions';
import AddedModal from 'components/Modal/AddedModal';
import HarmfulModal from 'components/Modal/HarmfulModal';
import ValidityModal from 'components/Modal/ValidityModal';
import { useModal } from 'providers/modal';
import completeChecker from 'lib/utils/relayPlaylist';
import HashtagView from 'components/Relay/HashtagView';
import Participant from 'components/Relay/Participant';
import Divider from 'widgets/Divider';
import Footer from 'components/Footer';
import CommentBar from 'components/CommentBar';
import CommentProvider from 'providers/comment';
import KeyboardProvider from 'providers/keyboard';
import SelectedComment from 'components/SelectedComment';
import SelectModal from 'components/Modal/SelectModal';
import ActionModal from 'components/Modal/ActionModal';
import Icon from 'widgets/Icon';
import SendList from 'lib/utils/kakaoShare';
import PlayBar from 'components/PlayBar';

const UserAction = ({ setSelectModal }) => {
  const onClickMenu = () => {
    setSelectModal(true);
  };
  return (
    <TouchableOpacity onPress={onClickMenu} activeOpacity={0.5}>
      <Icon source={require('public/icons/dot-menu.png')} style={[styles.actions, style.icons]} />
    </TouchableOpacity>
  );
};

const NotCompletedRelay = () => {
  const {
    state: {
      selectedRelay: { playlist, songs },
      swipeSongs,
    },
  } = useContext(RelayContext);
  const {
    state: { user },
  } = useContext(UserContext);
  const { validityModal } = useModal();
  const [validityMsg, setValidityMsg] = useState(null);
  const challengeSong = songs.filter((song) => {
    const {
      postUser: { _id: postUserId },
    } = song;
    if (postUserId === user._id) {
      return song;
    }
    return null;
  });

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Information />
        <SongActionsProvider>
          <NavButton isSwipe={swipeSongs.length > 0} setValidityMsg={setValidityMsg} />
        </SongActionsProvider>
        {challengeSong.length > 0 && <MusicSection title="내가 도전한 곡" songs={challengeSong} />}
        <MusicSection title="릴레이 플리 첫 곡" songs={[playlist.representSong]} icon />
        {songs.length > 0 && <MusicSection title="실시간 순위" songs={songs} />}
      </ScrollView>
      <PlayBar />
      {validityModal && <ValidityModal title={validityMsg} />}
    </>
  );
};

const CompletedRelay = () => {
  const {
    state: {
      selectedRelay: { playlist, songs },
      currentComments,
    },
  } = useContext(RelayContext);

  const FooterData = {
    likes: playlist.likes,
    comments: playlist.comments,
    _id: playlist._id,
    title: playlist.title,
    songs: songs.map(({ song }) => {
      return song;
    }),
  };
  return (
    <>
      <CommentProvider>
        <ScrollView>
          <Information />
          <HashtagView />
          <MusicSection title={`총 ${songs.length}곡`} songs={songs} />
          <Divider />
          <Participant />
          <Footer object={FooterData} type="relay" />
          <Divider containerStyle={styles.dividerContainer} />
          <SelectedComment opt="relay" comments={currentComments} />
        </ScrollView>
        <KeyboardProvider>
          <CommentBar />
        </KeyboardProvider>
      </CommentProvider>
    </>
  );
};

export default function ({ id }) {
  const {
    getSelectedRelay,
    getRelaySong,
    state: { selectedRelay, swipeSongs },
  } = useContext(RelayContext);
  const { postReport } = useContext(ReportContext);
  const [actionModal, setActionModal] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const { addedModal } = useModal();
  const actionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '신고하기', key: 'report' },
  ];

  const selectLists = [
    { title: '신고하기', key: 'report' },
    { title: '플레이리스트 공유', key: 'share' },
  ];

  const dataFetch = async () => {
    await Promise.all([getSelectedRelay({ id }), getRelaySong({ id })]);
  };
  const selectFunction = (key) => {
    setSelectModal(false);
    if (key === 'report') {
      setTimeout(() => {
        setActionModal(true);
      }, 400);
    } else if (key === 'share') {
      SendList({
        playlist: {
          title: selectedRelay.playlist.title,
          songs: selectedRelay.songs.map(({ song }) => {
            return song;
          }),
        },
      });
    }
  };

  const reportActionFunction = async (key) => {
    if (key === 'report') {
      postReport({
        type: 'relay',
        reason: '릴레이 플리 부적절',
        subjectId: selectedRelay.playlist._id,
      });
    }
    setActionModal(false);
  };

  useFocusEffect(
    useCallback(() => {
      dataFetch();
    }, []),
  );

  const selectInfo = { func: selectFunction, list: selectLists };
  const actionInfo = {
    mainTitle: '플레이리스트를 신고하시겠습니까?',
    func: reportActionFunction,
    list: actionLists,
  };

  return (
    <View style={style.background}>
      {selectedRelay && swipeSongs && (
        <>
          <Header
            title="릴레이 플리"
            back
            titleStyle={styles.header}
            actions={[
              !completeChecker(selectedRelay.playlist.createdTime) && (
                <UserAction setSelectModal={setSelectModal} />
              ),
            ]}
          />
          {completeChecker(selectedRelay.playlist.createdTime) ? (
            <NotCompletedRelay />
          ) : (
            <CompletedRelay />
          )}
          {addedModal && <AddedModal />}
          <HarmfulModal />
        </>
      )}
      <SelectModal modal={selectModal} setModal={setSelectModal} selectInfo={selectInfo} />
      <ActionModal modal={actionModal} setModal={setActionModal} actionInfo={actionInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: COLOR_1,
    fontSize: FS(18),
  },
  contentContainer: {
    paddingBottom: 30 * SCALE_HEIGHT,
  },
  dividerContainer: {
    height: 1 * SCALE_HEIGHT,
    backgroundColor: '#DCDCDC',
    marginTop: 8 * SCALE_HEIGHT,
    marginBottom: 17 * SCALE_HEIGHT,
    width: 343 * SCALE_WIDTH,
    marginLeft: 16 * SCALE_WIDTH,
  },
  actions: {
    right: -10 * SCALE_WIDTH,
  },
});
