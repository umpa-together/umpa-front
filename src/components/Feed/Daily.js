import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import PostUser from './PostUser';
import Footer from './Footer';
import DailyImage from './DailyImage';
// import DailySong from './DailySong';

export default function Daily({ daily, type }) {
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

  return (
    <View style={styles.container}>
      <PostUser user={postUser} />
      {image.length > 0 && <DailyImage image={image} />}
      <TouchableOpacity style={styles.contentArea}>
        <Text style={styles.content} numberOfLines={3}>
          {content}
        </Text>
      </TouchableOpacity>
      <Footer hashtag={hashtag} likes={likes} comments={comments} id={id} type={type} />
    </View>
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
    paddingTop: 8 * SCALE_HEIGHT,
  },
  content: {
    fontSize: FS(14),
    fontWeight: '500',
    lineHeight: 24 * SCALE_HEIGHT,
  },
  songsContainer: {
    paddingLeft: 18 * SCALE_WIDTH,
    marginTop: 6 * SCALE_HEIGHT,
  },
});
