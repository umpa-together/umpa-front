/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import { Context as UserContext } from 'context/User';
import { SCALE_WIDTH } from 'lib/utils/normalize';

import UserInfo from 'components/Account/UserInfo';
import PostingInfo from 'components/Account/PostingInfo';
import ResultOpt from 'components/Account/ResultOpt';
import PostingResult from 'components/Account/PostingResult';
import PlaylistImage from 'components/Account/PlaylistImage';
import DailyImage from 'components/Account/DailyImage';
import { SongImage } from 'widgets/SongImage';
import { goBack } from 'lib/utils/navigation';

export default function OtherAccount({ id }) {
  const { state } = useContext(UserContext);
  const [otherUser, setOtherUser] = useState();
  const [contents, setContents] = useState();
  const postingCount =
    contents && contents.playlist.length + contents.daily.length + contents.relay.length;
  const [resultOpt, setResultOpt] = useState('playlist');
  useEffect(() => {
    setOtherUser(state.otherUser);
    setContents(state.otherContents);
  }, [id]);

  const playlistData =
    contents &&
    contents.playlist.map((item) => {
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
  return (
    <View style={{ marginTop: 100 }}>
      <Button title="back" onPress={onClickBack} />
      {otherUser ? (
        <ScrollView>
          <UserInfo info={otherUser} />
          <PostingInfo
            userId={otherUser._id}
            posting={postingCount}
            follower={otherUser.follower}
            following={otherUser.following}
          />
          <ResultOpt resultOpt={resultOpt} setResultOpt={setResultOpt} />
          <PostingResult
            data={
              resultOpt === 'playlist'
                ? playlistData
                : resultOpt === 'daily'
                ? dailyData
                : relayData
            }
          />
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
