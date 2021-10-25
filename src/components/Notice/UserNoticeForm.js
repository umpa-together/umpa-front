import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { Context as NoticeContext } from 'context/NoticeContext';
import { tmpWidth } from 'components/FontNormalize';
import { push } from 'navigationRef';
import ProfileImage from 'components/ProfileImage';

const UserNoticeForm = ({ notice }) => {
  const { noticinguser: user, time, _id: id, isRead } = notice;
  const { state, getOtheruser } = useContext(UserContext);
  const { getSongs } = useContext(DJContext);
  const { readNotice } = useContext(NoticeContext);

  const onClickProfile = async () => {
    await Promise.all([getOtheruser({ id: user._id }), getSongs({ id: user._id })]);
    push('OtherAccount', { otherUserId: user._id });
  };

  const onClickNotice = () => {
    if (!isRead) readNotice({ id });
    onClickProfile();
  };

  return (
    <TouchableOpacity style={[styles.container, styles.flexRow]} onPress={onClickNotice}>
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {user.name}
          <Text style={styles.contentText}> 님이 {state.myInfo.name}님을 팔로우 했습니다.</Text>
          <Text style={styles.time}> {time}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
    marginBottom: 7 * tmpWidth,
    marginTop: 7 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: 48 * tmpWidth,
    width: 48 * tmpWidth,
    borderRadius: 48 * tmpWidth,
  },
  content: {
    flex: 1,
    paddingLeft: 12 * tmpWidth,
  },
  name: {
    fontSize: 14 * tmpWidth,
    fontWeight: '500',
    lineHeight: 18 * tmpWidth,
  },
  contentText: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    lineHeight: 18 * tmpWidth,
  },
  time: {
    fontSize: 12 * tmpWidth,
    fontWeight: '400',
    color: '#9499a3',
  },
});

export default UserNoticeForm;
