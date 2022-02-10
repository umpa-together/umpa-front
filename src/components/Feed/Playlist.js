import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { push } from 'lib/utils/navigation';
import PostUser from 'components/PostUser';
import TouchableNoDouble from 'components/TouchableNoDouble';
import Footer from 'components/Footer';
import { MAIN_COLOR, COLOR_1 } from 'constants/colors';
import Text from 'components/Text';
import SongsLists from './SongsLists';
import FollowAction from './FollowAction';

export default memo(function Playlist({ playlist }) {
  const { _id: id, postUserId: postUser, songs, title, textcontent } = playlist;

  const onClickPlaylist = async () => {
    push('SelectedPlaylist', { id, postUserId: postUser._id });
  };

  return (
    <TouchableNoDouble style={styles.container} onPress={onClickPlaylist} activeOpacity={0.8}>
      <PostUser user={postUser} action={<FollowAction id={postUser._id} />} />
      <View style={styles.contentArea}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content} numberOfLines={3}>
          {textcontent}
        </Text>
      </View>
      <SongsLists songs={songs} />
      <Footer object={playlist} type="playlist" />
      <View style={styles.divider} />
    </TouchableNoDouble>
  );
});

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
    color: COLOR_1,
    lineHeight: 24 * SCALE_HEIGHT,
  },
  content: {
    fontSize: FS(13),
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
