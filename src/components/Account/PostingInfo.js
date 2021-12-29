import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import { push } from 'lib/utils/navigation';
import { Context as UserContext } from 'context/User';

export default function PostingInfo({ userId, posting, follower, following }) {
  const { getFollower, getFollowing } = useContext(UserContext);
  const onClickFollowing = async () => {
    await getFollowing({ id: userId });
    push('Follow', { opt: 'following' });
  };
  const onClickFollower = async () => {
    await getFollower({ id: userId });
    push('Follow', { opt: 'follower' });
  };
  const optionLists = [
    {
      title: '총 게시글',
      count: posting,
    },
    {
      title: '팔로워',
      count: follower.length,
      onClick: onClickFollower,
    },
    {
      title: '팔로잉',
      count: following.length,
      onClick: onClickFollowing,
    },
  ];

  return (
    <View style={[style.flexRow, style.spaceEven]}>
      {optionLists.map((item) => {
        return (
          <TouchableOpacity onPress={item.onClick} key={item.title} style={styles.elementContainer}>
            <Text>{item.count}</Text>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  elementContainer: {
    width: 80 * SCALE_WIDTH,
    height: 80 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_WIDTH,
    alignItems: 'center',
  },
});
