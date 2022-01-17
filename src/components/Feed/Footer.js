import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as DailyContext } from 'context/Daily';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';

export default function Footer({ likes, comments, id, type }) {
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
    <View style={[styles.container, style.flexRow]}>
      <View style={styles.icon} />
      <Text style={styles.indicator}>{likes.length}</Text>
      <View style={styles.icon} />
      <Text style={styles.indicator}>{comments.length}</Text>
      <View style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16 * SCALE_WIDTH,
    paddingRight: 12 * SCALE_WIDTH,
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
