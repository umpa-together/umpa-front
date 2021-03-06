import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import style from 'constants/styles';
import TouchableNoDouble from 'components/TouchableNoDouble';
import { COLOR_1, COLOR_3 } from 'constants/colors';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { push } from 'lib/utils/navigation';
import Text from 'components/Text';

export default memo(function PostingInfo({ my, user, posting }) {
  const { _id: userId, follower, following, profileImage } = user;
  const onClickFollowing = async () => {
    push('Follow', { opt: 'following', my, id: userId });
  };
  const onClickFollower = async () => {
    push('Follow', { opt: 'follower', id: userId });
  };
  const optionLists = [
    {
      title: '총 게시글',
      count: posting,
      onClick: () => null,
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
      <View style={[style.flexRow, styles.postingContainer]}>
        {optionLists.map((item) => {
          const { count, title, onClick } = item;
          return (
            <TouchableNoDouble onPress={onClick} key={title} style={styles.elementContainer}>
              <Text style={styles.countText}>{count}</Text>
              <Text style={styles.titleText}>{title}</Text>
            </TouchableNoDouble>
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 63 * SCALE_HEIGHT,
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  postingContainer: {
    marginLeft: 149 * SCALE_WIDTH,
    justifyContent: 'flex-end',
    paddingRight: 16 * SCALE_WIDTH,
    width: 210 * SCALE_WIDTH,
  },
  countText: {
    fontSize: FS(14),
    color: COLOR_1,
    marginBottom: 6 * SCALE_HEIGHT,
  },
  titleText: {
    fontSize: FS(11),
    color: COLOR_3,
  },
  elementContainer: {
    marginLeft: 25 * SCALE_WIDTH,
    alignItems: 'center',
  },
  profileImage: {
    bottom: 16 * SCALE_HEIGHT,
    left: 16 * SCALE_WIDTH,
    position: 'absolute',
    zIndex: 1,
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    borderRadius: 90 * SCALE_HEIGHT,
  },
});
