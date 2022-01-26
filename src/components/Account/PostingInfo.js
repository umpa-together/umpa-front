import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import TouchableNoDouble from 'components/TouchableNoDouble';
import { COLOR_1, COLOR_3 } from 'constants/colors';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { push } from 'lib/utils/navigation';
import { Context as UserContext } from 'context/User';

export default function PostingInfo({ user, posting }) {
  const { getFollow } = useContext(UserContext);
  const { _id: userId, follower, following, profileImage } = user;
  const onClickFollowing = async () => {
    await getFollow({ id: userId, opt: 'following' });
    push('Follow', { opt: 'following' });
  };
  const onClickFollower = async () => {
    await getFollow({ id: userId, opt: 'follower' });
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
    <View style={[style.flexRow, styles.container]}>
      <ProfileImage img={profileImage} imgStyle={styles.profileImage} />
      <View style={[style.flexRow, style.spaceEven, styles.postingContainer]}>
        {optionLists.map((item) => {
          const { count, title } = item;
          return (
            <TouchableNoDouble onPress={item.onClick} key={title} style={styles.elementContainer}>
              <Text style={styles.countText}>{count}</Text>
              <Text style={styles.titleText}>{title}</Text>
            </TouchableNoDouble>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 63 * SCALE_HEIGHT,
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  postingContainer: {
    marginLeft: 159 * SCALE_WIDTH,
    width: 200 * SCALE_WIDTH,
  },
  countText: {
    fontSize: FS(14),
    color: COLOR_1,
  },
  titleText: {
    fontSize: FS(11),
    color: COLOR_3,
  },
  elementContainer: {
    width: 44 * SCALE_WIDTH,
    height: 34 * SCALE_WIDTH,
    alignItems: 'center',
  },
  profileImage: {
    top: -45 * SCALE_HEIGHT,
    left: 16 * SCALE_WIDTH,
    position: 'absolute',
    zIndex: 1,
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    borderRadius: 90 * SCALE_HEIGHT,
  },
});
