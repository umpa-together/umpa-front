import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import timeConverter from 'lib/utils/time';
import style from 'constants/styles';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';

export default function UserNoticeForm({ notice, onClickProfile }) {
  const { noticinguser: user, time } = notice;

  return (
    <View style={style.flexRow}>
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {`${user.name} 님이 `}
          <Text style={styles.contentText}>회원님을 팔로우 했습니다.</Text>
          <Text style={styles.time}>{`  ${timeConverter(time)}`}</Text>
        </Text>
      </View>
    </View>
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
    color: COLOR_1,
    lineHeight: 18 * SCALE_HEIGHT,
  },
  contentText: {
    fontSize: FS(14),
    color: COLOR_1,
    lineHeight: 18 * SCALE_HEIGHT,
  },
  time: {
    fontSize: FS(12),
    color: '#9499a3',
  },
});
