import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import Timer from 'components/Timer';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import completeChecker from 'lib/utils/relayPlaylist';
import { MAIN_COLOR, COLOR_5 } from 'constants/colors';
import YoutubeLink from 'components/youtubeLink';
import FastImage from 'react-native-fast-image';
import Text from 'components/Text';

export default function Information() {
  const {
    state: {
      selectedRelay: {
        playlist: { createdTime, postUserId, title, image, evaluateCount, youtubeUrl },
      },
    },
  } = useContext(RelayContext);
  const currentStatus = completeChecker(createdTime);

  return (
    <View style={styles.container}>
      <FastImage source={{ uri: image }} style={styles.img} />
      <View style={styles.infoContainer}>
        <View style={[styles.statusBox, !currentStatus && styles.completeBox]}>
          <Text style={styles.statusText}>{currentStatus ? '진행중' : '마감'}</Text>
        </View>
        <Text style={styles.title}>{title.map((item) => `${item} `)}</Text>
        <View style={[style.flexRow, styles.callengerContainer]}>
          <Icon source={require('public/icons/challenger.png')} style={styles.icon} />
          <Text style={styles.challenger}>
            도전 {postUserId.length}명 / 평가 {evaluateCount.length}명
          </Text>
        </View>
        {currentStatus && <Timer time={createdTime} timeStyle={styles.time} />}
        {youtubeUrl !== '' && <YoutubeLink url={youtubeUrl} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 17 * SCALE_HEIGHT,
    paddingLeft: 22 * SCALE_WIDTH,
    flexDirection: 'row',
  },
  img: {
    width: 140 * SCALE_WIDTH,
    height: 140 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
  },
  infoContainer: {
    marginLeft: 15 * SCALE_WIDTH,
    marginRight: 18 * SCALE_WIDTH,
    flex: 1,
  },
  title: {
    fontSize: FS(16),
    color: '#000',
    lineHeight: 22 * SCALE_HEIGHT,
  },
  callengerContainer: {
    marginTop: 8 * SCALE_HEIGHT,
    marginBottom: 12 * SCALE_HEIGHT,
  },
  challenger: {
    fontSize: FS(11),
    color: COLOR_5,
  },
  time: {
    fontSize: FS(16),
    color: '#FF3975',
    fontWeight: 'bold',
  },
  icon: {
    width: 13 * SCALE_WIDTH,
    height: 13 * SCALE_WIDTH,
    marginRight: 5 * SCALE_WIDTH,
  },
  statusBox: {
    paddingVertical: 4 * SCALE_HEIGHT,
    width: 50 * SCALE_WIDTH,
    borderRadius: 4 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12 * SCALE_HEIGHT,
  },
  statusText: {
    fontSize: FS(11),
    color: '#fff',
  },
  completeBox: {
    backgroundColor: COLOR_5,
  },
});
