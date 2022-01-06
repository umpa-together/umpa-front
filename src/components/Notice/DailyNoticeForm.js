/* eslint-disable no-nested-ternary */
import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import timeConverter from 'lib/utils/time';

export default function DailyNoticeForm({ notice, onClickProfile }) {
  const {
    noticinguser: user,
    noticetype: type,
    daily,
    dailycomment,
    dailyrecomment,
    time,
  } = notice;
  return (
    <>
      {/*
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
      </TouchableOpacity>
    */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} />
        <Text style={styles.name} numberOfLines={2}>
          {type === 'dlike' ? (
            <Text style={styles.contentText}> 데일리를 좋아합니다.</Text>
          ) : type === 'dcom' ? (
            <Text style={styles.contentText}> 댓글을 달았습니다: {dailycomment.text}</Text>
          ) : type === 'dcomlike' ? (
            <Text style={styles.contentText}> 댓글: {dailycomment.text}를 좋아합니다.</Text>
          ) : type === 'drecom' ? (
            <Text style={styles.contentText}> 대댓글을 달았습니다: {dailyrecomment.text}</Text>
          ) : (
            <Text style={styles.contentText}> 대댓글: {dailyrecomment.text}을 좋아합니다.</Text>
          )}
          <Text style={styles.time}>{timeConverter(time)}</Text>
        </Text>
      </View>
      {daily.image[0] && <Image style={styles.dailyImg} source={{ uri: daily.image[0] }} />}
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
  title: {
    fontSize: FS(12),
    color: '#5d5d5d',
    fontWeight: '400',
    lineHeight: 14 * SCALE_HEIGHT,
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