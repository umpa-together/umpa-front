/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import timeConverter from 'lib/utils/time';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';
import FastImage from 'react-native-fast-image';

export default function RelayNoticeForm({ notice, onClickProfile }) {
  const {
    noticinguser: user,
    noticetype: type,
    relay,
    relaycomment,
    relayrecomment,
    relaysong: {
      song: {
        attributes: { artistName, name },
      },
    },
    time,
  } = notice;
  const { image } = relay;
  const textLists = {
    relay: (
      <Text style={styles.contentText}>
        {`${name} - ${artistName} 곡이 릴레이 플리에 선정되었습니다.`}
      </Text>
    ),
    rcomlike: (
      <Text style={styles.contentText}>
        댓글: {relaycomment && relaycomment.text}를 좋아합니다.
      </Text>
    ),
    rrecom: (
      <Text style={styles.contentText}>
        대댓글을 달았습니다: {relayrecomment && relayrecomment.text}
      </Text>
    ),
    rrecomlike: (
      <Text style={styles.contentText}>
        대댓글: {relayrecomment && relayrecomment.text}을 좋아합니다.
      </Text>
    ),
  };

  return (
    <>
      {user && (
        <TouchableOpacity onPress={onClickProfile}>
          <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
        </TouchableOpacity>
      )}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {user && `${user.name} 님이 `}
          {textLists[type]}
          <Text style={styles.time}>{`  ${timeConverter(time)}`}</Text>
        </Text>
      </View>
      <FastImage style={styles.img} source={{ uri: image }} />
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
  playlistImg: {
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
  img: {
    height: 48 * SCALE_WIDTH,
    width: 48 * SCALE_WIDTH,
  },
});
