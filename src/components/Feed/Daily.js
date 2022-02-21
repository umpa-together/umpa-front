import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { push } from 'lib/utils/navigation';
import PostUser from 'components/PostUser';
import DailySong from 'components/Daily/DailySong';
import Footer from 'components/Footer';
import TouchableNoDouble from 'components/TouchableNoDouble';
import DailyImage from 'components/DailyImage';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';
import SelectedHashtag from 'components/SelectedHashtag';
import FollowAction from './FollowAction';

export default memo(function Daily({ daily }) {
  const { _id: id, postUserId: postUser, song, textcontent: content, image, hashtag } = daily;
  const onClickDaily = () => {
    push('SelectedDaily', { id, postUserId: postUser._id });
  };
  return (
    <View style={styles.container}>
      <PostUser user={postUser} action={<FollowAction id={postUser._id} />} />
      <DailySong song={song} containerStyle={styles.dailySongContainer} />
      {image.length > 0 && <DailyImage image={image} />}
      <TouchableNoDouble style={styles.contentArea} onPress={onClickDaily} activeOpacity={0.8}>
        <Text style={styles.content} numberOfLines={3}>
          {content}
        </Text>
        {hashtag.length > 0 && (
          <SelectedHashtag hashtag={hashtag} customContainer={styles.hashtagContainer} />
        )}
        <Footer object={daily} type="daily" />
        <View style={styles.divider} />
      </TouchableNoDouble>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: 4 * SCALE_HEIGHT,
  },
  contentArea: {
    paddingTop: 8 * SCALE_HEIGHT,
  },
  content: {
    color: COLOR_1,
    fontSize: FS(14),
    lineHeight: 24 * SCALE_HEIGHT,
    paddingHorizontal: 18 * SCALE_WIDTH,
  },
  songsContainer: {
    paddingLeft: 18 * SCALE_WIDTH,
    marginTop: 6 * SCALE_HEIGHT,
  },
  dailySongContainer: {
    paddingHorizontal: 16 * SCALE_WIDTH,
    marginTop: 14 * SCALE_HEIGHT,
  },
  divider: {
    width: 343 * SCALE_WIDTH,
    borderBottomColor: 'rgba(220, 220, 220, 0.5)',
    borderBottomWidth: 1 * SCALE_WIDTH,
    marginLeft: 16 * SCALE_WIDTH,
  },
  hashtagContainer: {
    paddingLeft: 15 * SCALE_WIDTH,
    paddingBottom: 11 * SCALE_HEIGHT,
    paddingTop: 16 * SCALE_HEIGHT,
  },
});
