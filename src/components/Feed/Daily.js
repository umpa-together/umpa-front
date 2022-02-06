import React from 'react';
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

export default function Daily({ daily }) {
  const { _id: id, postUserId: postUser, song, textcontent: content, image } = daily;
  const onClickDaily = () => {
    push('SelectedDaily', { post: false, id, postUserId: postUser._id });
  };

  return (
    <View style={styles.container}>
      <PostUser user={postUser} />
      {image.length > 0 && <DailyImage image={image} />}
      <DailySong song={song} containerStyle={styles.dailySongContainer} />
      <TouchableNoDouble style={styles.contentArea} onPress={onClickDaily} activeOpacity={0.8}>
        <Text style={styles.content} numberOfLines={3}>
          {content}
        </Text>
      </TouchableNoDouble>
      <Footer object={daily} type="daily" />
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 4 * SCALE_HEIGHT,
  },
  contentArea: {
    paddingHorizontal: 18 * SCALE_WIDTH,
    paddingTop: 8 * SCALE_HEIGHT,
    marginBottom: 20 * SCALE_HEIGHT,
  },
  content: {
    color: COLOR_1,
    fontSize: FS(14),
    lineHeight: 24 * SCALE_HEIGHT,
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
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1 * SCALE_WIDTH,
    marginLeft: 16 * SCALE_WIDTH,
  },
});
