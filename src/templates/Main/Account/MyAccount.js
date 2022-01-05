/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import { Context as UserContext } from 'context/User';
import { SCALE_WIDTH } from 'lib/utils/normalize';

import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import ResultOpt from 'components/Account/ResultOpt';
import PostingResult from 'components/Account/PostingResult';
import CreateButton from 'components/Account/CreateButton';
import PlaylistImage from 'components/Account/PlaylistImage';
import DailyImage from 'components/Account/DailyImage';
import SideModal from 'components/Modal/SideModal';
import { SongImage } from 'widgets/SongImage';
import { useModal } from 'providers/modal';

export default function MyAccount() {
  const { state } = useContext(UserContext);
  const { user, myContents } = state;
  const postingCount =
    myContents && myContents.playlist.length + myContents.daily.length + myContents.relay.length;
  const [resultOpt, setResultOpt] = useState('playlist');
  const playlistData =
    myContents &&
    myContents.playlist.map((item) => {
      const { title, time, _id } = item;
      return {
        _id,
        image: <PlaylistImage url={item.image} imgStyle={styles.imagePlaylist} />,
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
  const { setIsSideModal } = useModal();

  const onPressMenu = () => {
    setIsSideModal(true);
  };

  return (
    <View style={{ marginTop: 100 }}>
      {state.user ? (
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
          <ResultOpt resultOpt={resultOpt} setResultOpt={setResultOpt} />
          {(resultOpt === 'playlist' || resultOpt === 'daily') && <CreateButton opt={resultOpt} />}
          <PostingResult
            data={
              resultOpt === 'playlist'
                ? playlistData
                : resultOpt === 'daily'
                ? dailyData
                : relayData
            }
          />
          <SideModal />
        </ScrollView>
      ) : null}
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
