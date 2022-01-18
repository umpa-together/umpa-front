/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback, useState, memo } from 'react';
import { View, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/User';
import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import PostingResult from 'components/PostingCard/PostingResult';
import CreateButton from 'components/Account/CreateButton';

import SideModal from 'components/Modal/SideModal';
import TabView from 'components/TabView';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import AccountHeader from 'components/Account/AccountHeader';
import AccountTabBar from 'components/TabView/AccountTabBar';

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

  const Playlist = () => {
    return (
      <ScrollView>
        <CreateButton opt="playlist" />
        <PostingResult data={playlist} opt="playlist" />
      </ScrollView>
    );
  };

  const Daily = () => {
    return (
      <ScrollView>
        <CreateButton opt="daily" />
        <PostingResult data={daily} opt="daily" />
      </ScrollView>
    );
  };

  const Relay = () => {
    return (
      <ScrollView>
        <PostingResult data={relay} opt="relay" />
      </ScrollView>
    );
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
            sceneMap={{
              playlist: memo(Playlist),
              daily: memo(Daily),
              relay: memo(Relay),
            }}
            renderTabBar={(props) => <AccountTabBar props={props} />}
          />
        </>
      )}
      <SideModal modal={sideModal} setModal={setSideModal} />
    </View>
  );
}
