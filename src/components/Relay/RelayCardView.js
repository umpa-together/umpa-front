import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FastImage from 'react-native-fast-image';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_1, COLOR_5 } from 'constants/colors';
import Timer from 'components/Timer';
import Icon from 'widgets/Icon';
import completeChecker from 'lib/utils/relayPlaylist';
import { push } from 'lib/utils/navigation';
import Text from 'components/Text';
import ParticipantCount from './ParticipantCount';

export default function RelayCardView({ relay }) {
  const { _id: id, image, title, postUserId, createdTime, hashtags, evaluateUserId } = relay;
  const currentStatus = completeChecker(createdTime);

  const onClickRelayPlaylist = () => {
    push('SelectedRelay', { id });
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onClickRelayPlaylist}>
      <FastImage source={{ uri: image }} style={[styles.img, style.space_between]}>
        <View style={style.flexRow}>
          <View style={[styles.progressContainer, !currentStatus && styles.finishedStyle]}>
            <Text style={styles.statusTextBig}>{!currentStatus ? '플리완성' : '진행중'}</Text>
          </View>
          {currentStatus && (
            <Timer
              containerStyle={styles.timeContainer}
              timeStyle={styles.statusText}
              time={createdTime}
            />
          )}
        </View>
        <View style={styles.infoContainer}>
          <View style={[style.flexRow, styles.titleContainer]}>
            <Icon style={styles.icon} source={require('public/icons/relay-card-icon.png')} />
            <Text style={styles.titleText} numberOfLines={1}>
              {title.map((item) => `${item} `)}
            </Text>
            <Icon style={styles.moveIcon} source={require('public/icons/relay-card-move.png')} />
          </View>
          <View style={[style.flexRow, styles.peopleContainer]}>
            {hashtags.map((hashtag) => {
              return (
                <View key={hashtag} style={styles.box}>
                  <Text style={styles.text}># {hashtag}</Text>
                </View>
              );
            })}
            <ParticipantCount
              challenge={postUserId.length}
              vote={evaluateUserId.length}
              container={styles.customContainer}
            />
          </View>
        </View>
      </FastImage>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 344 * SCALE_WIDTH,
    marginBottom: 30 * SCALE_HEIGHT,
    borderRadius: 6 * SCALE_HEIGHT,
    backgroundColor: '#fff',
    shadowOffset: {
      height: 2 * SCALE_WIDTH,
      width: 0,
    },
    shadowRadius: 3 * SCALE_WIDTH,
    shadowOpacity: 0.2,
    elevation: 2,
    marginHorizontal: 17 * SCALE_WIDTH,
  },
  infoContainer: {
    width: '100%',
    height: 77 * SCALE_HEIGHT,
    paddingLeft: 13 * SCALE_WIDTH,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: 6.6 * SCALE_HEIGHT,
    width: 317 * SCALE_WIDTH,
  },
  img: {
    width: '100%',
    height: 217 * SCALE_HEIGHT,
    borderRadius: 6 * SCALE_HEIGHT,
  },
  statusText: {
    fontSize: FS(11),
    color: '#FFF',
    paddingHorizontal: 6 * SCALE_WIDTH,
    paddingVertical: 2.8 * SCALE_HEIGHT,
  },
  statusTextBig: {
    fontSize: FS(11),
    color: '#FFF',
    paddingHorizontal: 6 * SCALE_WIDTH,
    paddingVertical: 4 * SCALE_HEIGHT,
  },
  progressContainer: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 4 * SCALE_HEIGHT,
    marginLeft: 13 * SCALE_WIDTH,
    marginTop: 14 * SCALE_HEIGHT,
  },
  finishedStyle: {
    backgroundColor: '#85A0FF',
  },
  timeContainer: {
    backgroundColor: '#rgba(166,166,166,0.5)',
    borderRadius: 4 * SCALE_HEIGHT,
    marginLeft: 3.3 * SCALE_WIDTH,
    marginTop: 14 * SCALE_HEIGHT,
  },
  icon: {
    width: 17 * SCALE_WIDTH,
    height: 14 * SCALE_HEIGHT,
  },
  moveIcon: {
    width: 28 * SCALE_WIDTH,
    height: 28 * SCALE_WIDTH,
  },
  titleText: {
    fontSize: FS(14),
    color: COLOR_1,
    fontWeight: 'bold',
    marginLeft: 5.4 * SCALE_WIDTH,
    maxWidth: 280 * SCALE_WIDTH,
  },
  peopleContainer: {
    marginTop: 3 * SCALE_HEIGHT,
  },
  customContainer: {
    marginLeft: 3 * SCALE_WIDTH,
  },
  box: {
    paddingHorizontal: 7 * SCALE_WIDTH,
    paddingVertical: 3 * SCALE_HEIGHT,
    borderRadius: 43 * SCALE_HEIGHT,
    borderColor: COLOR_5,
    borderWidth: 1 * SCALE_HEIGHT,
    marginRight: 4 * SCALE_WIDTH,
  },
  text: {
    color: COLOR_5,
    fontSize: FS(11),
  },
});
