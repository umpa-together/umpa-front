import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/User';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import timeConverter from 'lib/utils/time';

export default function UserNoticeForm({ notice, onClickProfile }) {
  const { noticinguser: user, time } = notice;
  const { state } = useContext(UserContext);

  return (
    <>
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {user.name}
          <Text style={styles.contentText}> 님이 {state.user.name}님을 팔로우 했습니다.</Text>
          <Text style={styles.time}>{timeConverter(time)}</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    height: 48 * SCALE_WIDTH,
    width: 48 * SCALE_WIDTH,
    borderRadius: 48 * SCALE_WIDTH,
  },
  content: {
    flex: 1,
    paddingLeft: 12 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(14),
    fontWeight: '500',
    lineHeight: 18 * SCALE_HEIGHT,
  },
  contentText: {
    fontSize: FS(14),
    fontWeight: '400',
    lineHeight: 18 * SCALE_HEIGHT,
  },
  time: {
    fontSize: FS(12),
    fontWeight: '400',
    color: '#9499a3',
  },
});
