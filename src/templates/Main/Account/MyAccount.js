/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/User';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
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
import { MAIN_COLOR, COLOR_5, COLOR_1 } from 'constants/colors';
import { TabBar } from 'react-native-tab-view';

const TabViewHeader = (props) => {
  const indicatorStyle = {
    backgroundColor: MAIN_COLOR,
    height: 3 * SCALE_HEIGHT,
  };
  const indicatorContainerStyle = {
    marginTop: 44 * SCALE_WIDTH,
    backgroundColor: COLOR_5,
    height: 3 * SCALE_HEIGHT,
  };
  const labelStyle = {
    fontSize: FS(14),
    color: COLOR_1,
  };
  return (
    <TabBar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      indicatorStyle={indicatorStyle}
      indicatorContainerStyle={indicatorContainerStyle}
      style={{
        backgroundColor: '#fff',
      }}
      renderLabel={({ route }) => <Text style={labelStyle}>{route.title}</Text>}
    />
  );
};
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

  useFocusEffect(
    useCallback(() => {
      initOtherInformation();
      initRepresentSongs();
    }, []),
  );

  return (
    <View style={style.background}>
      {state.user && (
        <ScrollView>
          <AccountHeader hamburger />
          <PostingInfo
            // eslint-disable-next-line no-underscore-dangle
            posting={postingCount}
            user={user}
          />
          <UserInfo myaccount user={user} />
          <TabView
            routesMap={[
              { key: 'playlist', title: '플레이리스트' },
              { key: 'daily', title: '데일리' },
              { key: 'relay', title: '릴레이플리' },
            ]}
            sceneMap={{
              playlist: () => (
                <>
                  <CreateButton opt="playlist" />
                  <PostingResult data={playlistData} />
                </>
              ),
              daily: () => (
                <>
                  <CreateButton opt="daily" />
                  <PostingResult data={dailyData} />
                </>
              ),
              relay: () => <PostingResult data={relayData} />,
            }}
            renderTabBar={(props) => TabViewHeader(props)}
          />
        </ScrollView>
      )}
      <SideModal />
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
