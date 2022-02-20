import React, { useContext, useEffect, useState } from 'react';
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
    getMyInformation,
  } = useContext(UserContext);
  const [isFollow, setIsFollow] = useState(id === userId || following.includes(id));

  const onClickFollow = async () => {
    if (isFollow) {
      await unfollow({ id });
    } else {
      await follow({ id });
    }
    getMyInformation();
    setIsFollow(!isFollow);
  };

  useEffect(() => {
    setIsFollow(id === userId || following.includes(id));
  }, [following]);

  return (
    <>
      {!isFollow && (
        <TouchableOpacity onPress={onClickFollow}>
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
