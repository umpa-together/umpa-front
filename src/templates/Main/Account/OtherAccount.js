/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Provider as AddedProvider } from 'context/Added';
import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import TabView from 'components/TabView';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import AccountHeader from 'components/Account/AccountHeader';
import AccountTabBar from 'components/TabView/AccountTabBar';
import RepresentModal from 'components/Modal/RepresentModal';
import TabSection from 'components/Account/TabSection';

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

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'playlist':
        return <TabSection data={playlist} opt="playlist" />;
      case 'daily':
        return <TabSection data={daily} opt="daily" />;
      case 'relay':
        return <TabSection data={relay} opt="relay" />;
      default:
        return null;
    }
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
            renderSceneProps={renderScene}
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
