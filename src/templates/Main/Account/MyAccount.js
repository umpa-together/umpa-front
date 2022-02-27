/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback, useState, memo } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/User';
import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import SideModal from 'components/Modal/SideModal';
import TabView from 'components/TabView';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import AccountHeader from 'components/Account/AccountHeader';
import AccountTabBar from 'components/TabView/AccountTabBar';
import RepresentModal from 'components/Modal/RepresentModal';
import TabSection from 'components/Account/TabSection';
import PlayBar from 'components/PlayBar';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';
import { Provider as NoticeProvider } from 'context/Notice';
import Icon from 'widgets/Icon';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

const HamburgerMenu = memo(({ setSideModal }) => {
  const onPressMenu = () => {
    setSideModal(true);
  };
  return (
    <TouchableOpacity style={styles.hamburger} onPress={onPressMenu}>
      <Icon style={style.icons} source={require('public/icons/account-hamburger.png')} />
    </TouchableOpacity>
  );
});

export default function MyAccount() {
  const {
    state: {
      user,
      myContents: { playlist, daily, relay },
    },
    initRepresentSongs,
    initOtherInformation,
    initFollow,
  } = useContext(UserContext);

  const postingCount = playlist.length + daily.length + relay.length;
  const [sideModal, setSideModal] = useState(false);
  const { addedModal } = useModal();

  useFocusEffect(
    useCallback(() => {
      initOtherInformation();
      initRepresentSongs();
      initFollow();
    }, []),
  );

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
        return <TabSection my data={playlist} opt="playlist" />;
      case 'daily':
        return <TabSection my data={daily} opt="daily" />;
      case 'relay':
        return <TabSection my data={relayData} opt="relay" />;
      default:
        return null;
    }
  };

  const routesMap = [
    { key: 'playlist', title: '플레이리스트' },
    { key: 'daily', title: '데일리' },
    { key: 'relay', title: '릴레이플리' },
  ];
  const renderTabBar = useCallback((props) => <AccountTabBar props={props} />, []);

  return (
    <View style={style.background}>
      {user && (
        <>
          <AccountHeader user={user} actions={<HamburgerMenu setSideModal={setSideModal} />} />
          <PostingInfo my posting={postingCount} user={user} />
          <UserInfo myaccount user={user} />
          <TabView
            routesMap={routesMap}
            renderSceneProps={renderScene}
            renderTabBar={renderTabBar}
          />
        </>
      )}
      <PlayBar />
      <NoticeProvider>
        <SideModal modal={sideModal} setModal={setSideModal} />
      </NoticeProvider>
      <RepresentModal />
      {addedModal && <AddedModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  hamburger: {
    position: 'absolute',
    bottom: 40 * SCALE_HEIGHT,
    right: 9 * SCALE_WIDTH,
  },
});
