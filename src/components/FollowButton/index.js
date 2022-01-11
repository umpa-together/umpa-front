import React, { useContext, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/User';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';

export default function FollowButton({ id }) {
  const { state, follow, unfollow } = useContext(UserContext);
  const { following: myfollowing } = state.user;
  const [isFollow, setIsFollow] = useState(myfollowing.includes(id));

  const onClickFollow = () => {
    if (isFollow) {
      unfollow({ id });
    } else {
      follow({ id });
    }
    setIsFollow(!isFollow);
  };
  return (
    <TouchableOpacity
      style={isFollow ? styles.unfollowBox : styles.followBox}
      onPress={onClickFollow}
    >
      <Text style={isFollow ? styles.unfolloText : styles.followText}>
        {isFollow ? '팔로잉' : '팔로우'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  followBox: {
    marginLeft: 7 * SCALE_WIDTH,
    width: 50 * SCALE_WIDTH,
    height: 22 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
    borderRadius: 100 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfollowBox: {
    marginLeft: 7 * SCALE_WIDTH,
    width: 50 * SCALE_WIDTH,
    height: 22 * SCALE_HEIGHT,
    borderWidth: 1,
    borderColor: '#A6A6A6',
    borderRadius: 100 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followText: {
    fontSize: FS(12),
    color: 'white',
  },
  unfolloText: {
    fontSize: FS(12),
    color: '#A6A6A6',
  },
});
