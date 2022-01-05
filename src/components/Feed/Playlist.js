import React, { useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { push } from 'lib/utils/navigation';
import { Context as PlaylistContext } from '../../context/Playlist';
import PostUser from './PostUser';
import SongsLists from './SongsLists';
import Footer from './Footer';

export default function Playlist({ playlist, type }) {
  const { _id: id, hashtag, comments, likes, postUserId: postUser, songs, title } = playlist;
  const { getSelectedPlaylist } = useContext(PlaylistContext);

  const onClickPlaylist = async () => {
    await getSelectedPlaylist({ id, postUserId: postUser._id });
    push('SelectedPlaylist', { id, postUser: postUser._id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClickPlaylist}>
      <PostUser user={postUser} />
      <View style={styles.contentArea}>
        <Text style={styles.content} numberOfLines={3}>
          {title}
        </Text>
      </View>
      <SongsLists songs={songs} />
      <Footer hashtag={hashtag} likes={likes} comments={comments} id={id} type={type} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1 * SCALE_WIDTH,
    borderBottomColor: '#dcdcdc',
    paddingBottom: 4 * SCALE_HEIGHT,
  },
  contentArea: {
    paddingHorizontal: 18 * SCALE_WIDTH,
    marginTop: 8 * SCALE_HEIGHT,
  },
  content: {
    fontSize: FS(14),
    fontWeight: '500',
    lineHeight: 24 * SCALE_HEIGHT,
  },
});
