import React, { useContext, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/User';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';

export default function FollowAction({ id }) {
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
}

const styles = StyleSheet.create({
  follow: {
    fontSize: FS(12),
    color: MAIN_COLOR,
    marginRight: 16 * SCALE_WIDTH,
  },
});
