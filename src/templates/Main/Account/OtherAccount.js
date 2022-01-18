/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useState, useCallback, memo } from 'react';
import { View, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Provider as AddedProvider } from 'context/Added';
import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import PostingResult from 'components/PostingCard/PostingResult';
import TabView from 'components/TabView';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import AccountHeader from 'components/Account/AccountHeader';
import AccountTabBar from 'components/TabView/AccountTabBar';
import RepresentModal from 'components/Modal/RepresentModal';

export default function OtherAccount() {
  const { state, initRepresentSongs } = useContext(UserContext);
  const [otherUser] = useState(state.otherUser);
  const [contents] = useState(state.otherContents);
  const postingCount =
    contents && contents.playlist.length + contents.daily.length + contents.relay.length;

  useFocusEffect(
    useCallback(() => {
      initRepresentSongs();
    }, []),
  );
  const { playlist, daily, relay } = contents;

  const Playlist = () => {
    return (
      <ScrollView>
        <PostingResult data={playlist} opt="playlist" />
      </ScrollView>
    );
  };

  const Daily = () => {
    return (
      <ScrollView>
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
      {otherUser && (
        <>
          <AccountHeader user={otherUser} back />
          <PostingInfo posting={postingCount} user={otherUser} />
          <UserInfo user={otherUser} />
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
      <AddedProvider>
        <RepresentModal />
      </AddedProvider>
    </View>
  );
}
