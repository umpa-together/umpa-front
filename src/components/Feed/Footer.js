import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as DailyContext } from 'context/Daily';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';

export default function Footer({ hashtag, likes, comments, id, type }) {
  const { state } = useContext(UserContext);
  const { likesPlaylist, unlikesPlaylist } = useContext(PlaylistContext);
  const { likesDaily, unlikesDaily } = useContext(DailyContext);
  const [isLike, setIsLike] = useState(likes.includes(state.user._id));

  const onClickLikes = () => {
    if (isLike) {
      if (type === 'playlist') {
        unlikesPlaylist({ id });
      } else {
        unlikesDaily({ id });
      }
    } else if (type === 'playlist') {
      likesPlaylist({ id });
    } else {
      likesDaily({ id });
    }
    setIsLike(!isLike);
  };

  return (
    <View style={[styles.container, hashtag.length !== 0 && styles.isHashtag]}>
      <View style={[style.space_between, style.flexRow]}>
        <View>
          <View style={[style.flexRow, styles.wrap]}>
            {hashtag.map((item) => (
              <View style={styles.box} key={item}>
                <Text style={styles.hashtag}>#{item}</Text>
              </View>
            ))}
          </View>
          <View style={[style.flexRow, hashtag.length === 0 && styles.isHashtag]}>
            <View style={styles.icon} />
            <Text style={styles.indicator}>{likes.length}</Text>
            <View style={styles.icon} />
            <Text style={styles.indicator}>{comments.length}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClickLikes}>
          <View style={styles.heart} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18 * SCALE_WIDTH,
  },
  isHashtag: {
    marginTop: 14 * SCALE_HEIGHT,
  },
  box: {
    borderRadius: 100 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: '#8bc0ff',
    marginRight: 8 * SCALE_WIDTH,
  },
  hashtag: {
    paddingHorizontal: 11 * SCALE_WIDTH,
    paddingVertical: 4 * SCALE_HEIGHT,
    color: '#8bc0ff',
    fontWeight: '400',
    fontSize: FS(14),
  },
  wrap: {
    flexWrap: 'wrap',
  },
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    marginTop: 4 * SCALE_HEIGHT,
    borderWidth: 1,
  },
  indicator: {
    fontWeight: '400',
    fontSize: FS(12),
    marginLeft: -5 * SCALE_WIDTH,
  },
  heart: {
    width: 50 * SCALE_WIDTH,
    height: 50 * SCALE_WIDTH,
    borderWidth: 1,
  },
});
