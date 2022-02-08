/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback, useState } from 'react';
import { View } from 'react-native';
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

export default function MyAccount() {
  const {
    state: {
      user,
      myContents: { playlist, daily, relay },
    },
    initRepresentSongs,
    initOtherInformation,
  } = useContext(UserContext);

  const postingCount = playlist.length + daily.length + relay.length;
  const [sideModal, setSideModal] = useState(false);
  const { addedModal } = useModal();

  const onPressMenu = () => {
    setSideModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      initOtherInformation();
      initRepresentSongs();
    }, []),
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'playlist':
        return <TabSection my data={playlist} opt="playlist" />;
      case 'daily':
        return <TabSection my data={daily} opt="daily" />;
      case 'relay':
        return <TabSection my data={relay} opt="relay" />;
      default:
        return null;
    }
  };

  return (
    <View style={style.background}>
      {user && (
        <>
          <AccountHeader user={user} hamburger={onPressMenu} />
          <PostingInfo my posting={postingCount} user={user} />
          <UserInfo myaccount user={user} />
          <TabView
            routesMap={[
              { key: 'playlist', title: '플레이리스트' },
              { key: 'daily', title: '데일리' },
              { key: 'relay', title: '릴레이플리' },
            ]}
            renderSceneProps={renderScene}
            renderTabBar={(props) => <AccountTabBar props={props} />}
          />
        </>
      )}
      <PlayBar />
      <SideModal modal={sideModal} setModal={setSideModal} />
      <RepresentModal />
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
    </View>
  );
}
