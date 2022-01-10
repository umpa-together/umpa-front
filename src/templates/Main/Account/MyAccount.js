/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
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
import { useModal } from 'providers/modal';
import TabView from 'components/TabView';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';

export default function MyAccount() {
  const { state, initRepresentSongs, initOtherInformation } = useContext(UserContext);
  const { user, myContents } = state;
  const postingCount =
    myContents && myContents.playlist.length + myContents.daily.length + myContents.relay.length;
  const playlistData =
    myContents &&
    myContents.playlist.map((item) => {
      const { title, time, _id } = item;
      return {
        _id,
        image: <PlaylistAlbumImage image={image} songs={songs} size={80} />,
        title,
        content: item.songs[0].attributes.name,
        time,
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
  const { setSideModal } = useModal();

  const onPressMenu = () => {
    setSideModal(true);
  };

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
          <Button title="햄버거" onPress={onPressMenu} />
          <UserInfo info={user} />
          <PostingInfo
            // eslint-disable-next-line no-underscore-dangle
            userId={user._id}
            posting={postingCount}
            follower={user.follower}
            following={user.following}
          />
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
