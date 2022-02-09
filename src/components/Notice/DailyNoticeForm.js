/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import timeConverter from 'lib/utils/time';
import { COLOR_1 } from 'constants/colors';
import FastImage from 'react-native-fast-image';
import Text from 'components/Text';

export default function DailyNoticeForm({ notice, onClickProfile }) {
  const {
    noticinguser: user,
    noticetype: type,
    daily,
    dailycomment,
    dailyrecomment,
    time,
  } = notice;
  const textLists = {
    dlike: <Text style={styles.contentText}>데일리를 좋아합니다.</Text>,
    dcom: (
      <Text style={styles.contentText}>댓글을 달았습니다: {dailycomment && dailycomment.text}</Text>
    ),
    dcomlike: (
      <Text style={styles.contentText}>
        댓글: {dailycomment && dailycomment.text}를 좋아합니다.
      </Text>
    ),
    drecom: (
      <Text style={styles.contentText}>
        대댓글을 달았습니다: {dailyrecomment && dailyrecomment.text}
      </Text>
    ),
    drecomlike: (
      <Text style={styles.contentText}>
        대댓글: {dailyrecomment && dailyrecomment.text}을 좋아합니다.
      </Text>
    ),
  };
  return (
    <>
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {`${user.name} 님이 `}
          {textLists[type]}
          <Text style={styles.time}>{`  ${timeConverter(time)}`}</Text>
        </Text>
      </View>
      {daily && <FastImage style={styles.dailyImg} source={{ uri: daily.image[0] }} />}
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 12 * SCALE_WIDTH,
  },
  profileImg: {
    height: 48 * SCALE_WIDTH,
    width: 48 * SCALE_WIDTH,
    borderRadius: 48 * SCALE_WIDTH,
  },
  dailyImg: {
    height: 48 * SCALE_WIDTH,
    width: 48 * SCALE_WIDTH,
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
