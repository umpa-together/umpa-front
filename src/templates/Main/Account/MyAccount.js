/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Provider as AddedProvider } from 'context/Added';
import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import SideModal from 'components/Modal/SideModal';
import TabView from 'components/TabView';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import AccountHeader from 'components/Account/AccountHeader';
import AccountTabBar from 'components/TabView/AccountTabBar';
import RepresentModal from 'components/Modal/RepresentModal';
import TabSection from './TabSection';

export default function MyAccount() {
  const { state, initRepresentSongs, initOtherInformation } = useContext(UserContext);
  const { user, myContents } = state;
  const postingCount =
    myContents && myContents.playlist.length + myContents.daily.length + myContents.relay.length;
  const [sideModal, setSideModal] = useState(false);
  const { playlist, daily, relay } = myContents;
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
      {state.user && (
        <>
          <AccountHeader user={user} hamburger={onPressMenu} />
          <PostingInfo posting={postingCount} user={user} />
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
      <SideModal modal={sideModal} setModal={setSideModal} />
      <AddedProvider>
        <RepresentModal />
      </AddedProvider>
    </View>
  );
}
