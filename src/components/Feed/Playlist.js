import React, { useContext, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { navigate } from 'lib/utils/navigation';
import PostUser from 'components/PostUser';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as UserContext } from 'context/User';
import { MAIN_COLOR } from 'constants/colors';
import SongsLists from './SongsLists';
import Footer from './Footer';

const FollowAction = ({ id }) => {
  const {
    state: {
      user: { following, _id: userId },
    },
    follow,
    unfollow,
  } = useContext(UserContext);
  const [isFollow, setIsFollow] = useState(id === userId || following.includes(id));

  const onClickFollow = () => {
    if (isFollow) {
      unfollow({ id });
    } else {
      follow({ id });
    }
    setIsFollow(!isFollow);
  };

  return (
    <>
      {!isFollow && (
        <TouchableOpacity onPress={onClickFollow} activeOpacity={0.9}>
          <Text style={styles.follow}>팔로우</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default function Playlist({ playlist }) {
  const { _id: id, postUserId: postUser, songs, title, textcontent } = playlist;
  const { getSelectedPlaylist } = useContext(PlaylistContext);

  const onClickPlaylist = async () => {
    await getSelectedPlaylist({ id, postUserId: postUser._id });
    navigate('SelectedPlaylist', { post: false });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClickPlaylist} activeOpacity={0.8}>
      <PostUser user={postUser} action={<FollowAction id={postUser._id} />} />
      <View style={styles.contentArea}>
        <Text style={styles.title}>{title}</Text>
        {textcontent !== undefined && (
          <Text style={styles.content} numberOfLines={3}>
            {textcontent}
          </Text>
        )}
      </View>
      <SongsLists songs={songs} />
      <Footer object={playlist} type="playlist" />
      <View style={styles.divider} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 4 * SCALE_HEIGHT,
  },
  contentArea: {
    paddingHorizontal: 16 * SCALE_WIDTH,
    marginTop: 14 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(14),
    fontWeight: '500',
    lineHeight: 24 * SCALE_HEIGHT,
  },
  content: {
    fontSize: FS(13),
    fontWeight: '400',
    lineHeight: 24 * SCALE_HEIGHT,
    color: '#5d5d5d',
  },
  follow: {
    fontSize: FS(12),
    marginLeft: 12 * SCALE_WIDTH,
    color: MAIN_COLOR,
  },
  divider: {
    width: 343 * SCALE_WIDTH,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1 * SCALE_WIDTH,
    marginLeft: 16 * SCALE_WIDTH,
  },
});
