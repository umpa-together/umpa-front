import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { tmpWidth } from 'components/FontNormalize';
import { push } from 'lib/utils/navigation';
import SongsLists from 'components/Playlist/SongsLists';
import PostUser from './PostUser';
import Footer from './Footer';

const Playlist = ({ playList, type }) => {
  const { _id: id, hashtag, comments, likes, postUserId: postUser, songs, title } = playList;
  const { getPlaylist } = useContext(PlaylistContext);

  const onClickPlaylist = async () => {
    await getPlaylist({ id, postUserId: postUser._id });
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
      <SongsLists songs={songs} container={styles.songsContainer} />
      <Footer hashtag={hashtag} likes={likes} comments={comments} id={id} type={type} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1 * tmpWidth,
    borderBottomColor: '#dcdcdc',
    paddingBottom: 4 * tmpWidth,
  },
  contentArea: {
    marginRight: 18 * tmpWidth,
    marginTop: 8 * tmpWidth,
    paddingLeft: 18 * tmpWidth,
  },
  content: {
    fontSize: 14 * tmpWidth,
    fontWeight: '500',
    lineHeight: 24 * tmpWidth,
  },
  songsContainer: {
    paddingLeft: 18 * tmpWidth,
    marginTop: 6 * tmpWidth,
  },
});

export default Playlist;
