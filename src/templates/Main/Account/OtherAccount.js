/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useState, useEffect, useCallback, memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Context as ReportContext } from 'context/Report';
import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import TabView from 'components/TabView';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import AccountHeader from 'components/Account/AccountHeader';
import AccountTabBar from 'components/TabView/AccountTabBar';
import RepresentModal from 'components/Modal/RepresentModal';
import TabSection from 'components/Account/TabSection';
import LoadingIndicator from 'components/LoadingIndicator';
import Icon from 'widgets/Icon';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import SelectModal from 'components/Modal/SelectModal';
import ActionModal from 'components/Modal/ActionModal';

const DotMenu = memo(({ setSelectModal }) => {
  const onPressMenu = () => {
    setSelectModal(true);
  };
  return (
    <TouchableOpacity style={styles.dot} onPress={onPressMenu}>
      <Icon style={style.icons} source={require('public/icons/account-dot.png')} />
    </TouchableOpacity>
  );
});

export default function OtherAccount({ id }) {
  const {
    state: {
      user: { block },
      otherUser,
      otherContents,
    },
    initRepresentSongs,
    getOtherInformation,
    blockUser,
    unblockUser,
  } = useContext(UserContext);
  const { postReport } = useContext(ReportContext);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState({ playlist: [], daily: [], relay: [] });
  const [loading, setLoading] = useState(true);
  const [selectModal, setSelectModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [actions, setActions] = useState(null);
  const selectLists = [
    { title: user && block.includes(user._id) ? '????????????' : '????????????', key: 'block' },
    { title: '????????????', key: 'report' },
  ];
  const reportActionLists = [
    { title: '????????????', key: 'cancel' },
    { title: '????????????', key: 'report' },
  ];
  const blockActionLists = [
    { title: '????????????', key: 'cancel' },
    { title: user && block.includes(user._id) ? '????????????' : '????????????', key: 'block' },
  ];

  const reportActionFunction = (key) => {
    if (key === 'report') {
      postReport({ type: 'user', reason: '?????? ?????????', subjectId: user._id });
    }
    setActionModal(false);
  };

  const blockActionFunction = async (key) => {
    if (key === 'block') {
      if (user && block.includes(user._id)) {
        unblockUser({ id: user._id });
      } else {
        blockUser({ id: user._id });
      }
    }
    setActionModal(false);
  };

  const selectFunction = (key) => {
    setSelectModal(false);
    if (key === 'report') {
      setActions({
        mainTitle: '?????? ????????? ?????????????????????????',
        func: reportActionFunction,
        list: reportActionLists,
      });
    } else if (key === 'block') {
      setActions({
        mainTitle:
          user && block.includes(user._id)
            ? '????????? ?????????????????????????'
            : '?????? ????????? ?????????????????????????',
        func: blockActionFunction,
        list: blockActionLists,
      });
    }
    setTimeout(() => {
      setActionModal(true);
    }, 500);
  };
  const selectInfo = { func: selectFunction, list: selectLists };

  const postingCount =
    content && content.playlist.length + content.daily.length + content.relay.length;

  useFocusEffect(
    useCallback(() => {
      initRepresentSongs();
    }, []),
  );

  const getUser = async () => {
    if (id) {
      await getOtherInformation({ id });
    }
  };
  const setSelected = () => {
    if (otherUser != null && otherUser._id === id) {
      setUser(otherUser);
      setContent(otherContents);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  useEffect(() => {
    setSelected();
  }, [otherUser]);

  const { playlist, daily, relay } = content;

  const relayData = relay.map((item) => {
    // eslint-disable-next-line no-shadow
    const { playlist, song } = item;
    return {
      _id: playlist._id,
      title: playlist.title,
      likes: playlist.likes,
      time: playlist.createdTime,
      song,
    };
  });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'playlist':
        return <TabSection data={playlist} opt="playlist" />;
      case 'daily':
        return <TabSection data={daily} opt="daily" />;
      case 'relay':
        return <TabSection data={relayData} opt="relay" />;
      default:
        return null;
    }
  };

  const routesMap = [
    { key: 'playlist', title: '??????????????????' },
    { key: 'daily', title: '?????????' },
    { key: 'relay', title: '???????????????' },
  ];
  const renderTabBar = useCallback((props) => <AccountTabBar props={props} />, []);
  return (
    <View style={style.background}>
      {!loading ? (
        <>
          <AccountHeader user={user} back actions={<DotMenu setSelectModal={setSelectModal} />} />
          <PostingInfo posting={postingCount} user={user} />
          <UserInfo user={user} />
          <TabView
            routesMap={routesMap}
            renderSceneProps={renderScene}
            renderTabBar={renderTabBar}
          />
          <RepresentModal />
        </>
      ) : (
        <LoadingIndicator />
      )}
      <ActionModal modal={actionModal} setModal={setActionModal} actionInfo={actions} />
      <SelectModal modal={selectModal} setModal={setSelectModal} selectInfo={selectInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    bottom: 40 * SCALE_HEIGHT,
    right: 5 * SCALE_WIDTH,
  },
});
