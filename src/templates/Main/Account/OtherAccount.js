/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import { Context as UserContext } from 'context/User';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import PostingResult from 'components/Account/PostingResult';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';
import DailyImage from 'components/Account/DailyImage';
import { SongImage } from 'widgets/SongImage';
import { goBack } from 'lib/utils/navigation';
import TabView from 'components/TabView';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';

export default function OtherAccount() {
  const { state, initRepresentSongs } = useContext(UserContext);
  const [otherUser] = useState(state.otherUser);
  const [contents] = useState(state.otherContents);
  const postingCount =
    contents && contents.playlist.length + contents.daily.length + contents.relay.length;

  const playlistData =
    contents &&
    contents.playlist.map((item) => {
      const { image, songs, title, time, _id } = item;
      return {
        _id,
        image: <PlaylistAlbumImage image={image} songs={songs} size={80} />,
        title,
        content: item.songs[0].attributes.name,
        time,
      };
    });

  const dailyData =
    contents &&
    contents.daily.map((item) => {
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
    contents &&
    contents.relay.map((item) => {
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

  const onClickBack = () => {
    goBack();
  };

  useFocusEffect(
    useCallback(() => {
      initRepresentSongs();
    }, []),
  );

  return (
    <View style={style.background}>
      <Button title="back" onPress={onClickBack} />
      {otherUser && (
        <ScrollView>
          <UserInfo info={otherUser} />
          <PostingInfo
            userId={otherUser._id}
            posting={postingCount}
            follower={otherUser.follower}
            following={otherUser.following}
          />
          <TabView
            routesMap={[
              { key: 'playlist', title: '플레이리스트' },
              { key: 'daily', title: '데일리' },
              { key: 'relay', title: '릴레이플리' },
            ]}
            sceneMap={{
              playlist: () => <PostingResult data={playlistData} />,
              daily: () => <PostingResult data={dailyData} />,
              relay: () => <PostingResult data={relayData} />,
            }}
          />
        </ScrollView>
      )}
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
