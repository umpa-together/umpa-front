/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useState, useEffect, useCallback } from 'react';
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
import LoadingIndicator from 'components/LoadingIndicator';

export default function OtherAccount({ id }) {
  const {
    state: { otherUser, otherContents },
    initRepresentSongs,
    getOtherInformation,
  } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [content, setContent] = useState({ playlist: [], daily: [], relay: [] });
  const [loading, setLoading] = useState(true);

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
      {!loading ? (
        <>
          <AccountHeader user={user} back />
          <PostingInfo posting={postingCount} user={user} />
          <UserInfo user={user} />
          <TabView
            routesMap={[
              { key: 'playlist', title: '플레이리스트' },
              { key: 'daily', title: '데일리' },
              { key: 'relay', title: '릴레이플리' },
            ]}
            renderSceneProps={renderScene}
            renderTabBar={(props) => <AccountTabBar props={props} />}
          />

          <AddedProvider>
            <RepresentModal />
          </AddedProvider>
        </>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}
