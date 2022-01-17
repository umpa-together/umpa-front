/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback, useState, memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/User';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import PostingResult from 'components/Account/PostingResult';
import CreateButton from 'components/Account/CreateButton';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';
import DailyImage from 'components/Account/DailyImage';
import SideModal from 'components/Modal/SideModal';
import { SongImage } from 'widgets/SongImage';
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
  const playlistData =
    myContents &&
    myContents.playlist.map((item) => {
      const { image, songs, title, time, _id } = item;
      const convertTime = time.slice(0, 10).replaceAll('-', '.');
      return {
        _id,
        image: <PlaylistAlbumImage image={image} songs={songs} size={85} />,
        title,
        content: `${item.songs[0].attributes.name}외 ${item.songs.length} 곡`,
        time: convertTime,
      };
    });
  const dailyData =
    myContents &&
    myContents.daily.map((item) => {
      const { _id, textcontent, time, song, image } = item;
      const { artwork, name } = song.attributes;
      return {
        _id,
        image: <DailyImage image={image} artwork={artwork} imgStyle={styles.imageDaily} />,
        title: name,
        content: textcontent,
        time,
      };
    });
  const relayData =
    myContents &&
    myContents.relay.map((item) => {
      const { playlist, song } = item;
      const { _id, title, createdTime } = playlist;
      const { artwork, name } = song.attributes;
      return {
        _id,
        image: <SongImage url={artwork.url} imgStyle={styles.imagePlaylist} />,
        title,
        content: name,
        time: createdTime,
      };
    });
  const [sideModal, setSideModal] = useState(false);

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
        <PostingResult data={playlistData} />
      </ScrollView>
    );
  };

  const Daily = () => {
    return (
      <ScrollView>
        <CreateButton opt="daily" />
        <PostingResult data={dailyData} />
      </ScrollView>
    );
  };

  const Relay = () => {
    return (
      <ScrollView>
        <PostingResult data={relayData} />
      </ScrollView>
    );
  };

  return (
    <View style={style.background}>
      {state.user && (
        <>
          <AccountHeader hamburger={onPressMenu} />
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

const styles = StyleSheet.create({
  imagePlaylist: {
    width: 80 * SCALE_WIDTH,
    height: 80 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
  imageDaily: {
    width: 60 * SCALE_WIDTH,
    height: 60 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
