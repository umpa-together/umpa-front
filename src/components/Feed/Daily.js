import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as DailyContext } from 'context/DailyContext';
import { tmpWidth } from 'components/FontNormalize';
import { push } from 'navigationRef';
import PostUser from './PostUser';
import Footer from './Footer';
import DailyImage from './DailyImage';
import DailySong from './DailySong';

const Daily = ({ daily, type }) => {
  const { getDaily } = useContext(DailyContext);
  const {
    _id: id,
    hashtag,
    comments,
    likes,
    postUserId: postUser,
    song,
    textcontent: content,
    image,
  } = daily;

  const onClickDaily = async () => {
    await getDaily({ id, postUserId: postUser._id });
    push('SelectedDaily', { id, postUser: postUser._id });
  };

  return (
    <View style={styles.container}>
      <PostUser user={postUser} />
      {image.length > 0 && <DailyImage image={image} />}
      <DailySong song={song} />
      <TouchableOpacity style={styles.contentArea} onPress={onClickDaily}>
        <Text style={styles.content} numberOfLines={3}>
          {content}
        </Text>
      </TouchableOpacity>
      <Footer hashtag={hashtag} likes={likes} comments={comments} id={id} type={type} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1 * tmpWidth,
    borderBottomColor: '#dcdcdc',
    paddingBottom: 4 * tmpWidth,
  },
  contentArea: {
    paddingRight: 18 * tmpWidth,
    paddingTop: 8 * tmpWidth,
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

export default Daily;
