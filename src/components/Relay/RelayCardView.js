import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FastImage from 'react-native-fast-image';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_1, COLOR_5 } from 'constants/colors';
import Timer from 'components/Timer';
import Icon from 'widgets/Icon';
import completeChecker from 'lib/utils/relayPlaylist';
import { push } from 'lib/utils/navigation';

export default function RelayCardView({ relay }) {
  const { _id: id, image, title, postUserId, createdTime } = relay;
  const currentStatus = completeChecker(createdTime);

  const onClickRelayPlaylist = () => {
    push('SelectedRelay', { id });
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={onClickRelayPlaylist}>
      <FastImage source={{ uri: image }} style={[styles.img, style.space_between]}>
        <View style={style.flexRow}>
          <View style={[styles.progressContainer, !currentStatus && styles.finishedStyle]}>
            <Text style={styles.statusText}>{!currentStatus ? '마감' : '진행중'}</Text>
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
            <Text style={styles.titleText}>{title}</Text>
            <Icon style={styles.moveIcon} source={require('public/icons/relay-card-move.png')} />
          </View>
          <View style={[style.flexRow, styles.peopleContainer]}>
            <Icon
              style={styles.peopleIcon}
              source={require('public/icons/relay-card-people.png')}
            />
            <Text style={styles.peopleText}>도전자 {postUserId.length}명</Text>
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
  },
  infoContainer: {
    width: 344 * SCALE_WIDTH,
    paddingLeft: 12 * SCALE_WIDTH,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: 18.6 * SCALE_HEIGHT,
    marginBottom: 11 * SCALE_HEIGHT,
  },
  img: {
    width: 344 * SCALE_WIDTH,
    height: 217 * SCALE_HEIGHT,
    borderRadius: 6 * SCALE_HEIGHT,
  },
  statusText: {
    fontSize: FS(11),
    color: '#FFF',
    paddingHorizontal: 6 * SCALE_WIDTH,
    paddingVertical: 2 * SCALE_HEIGHT,
  },
  progressContainer: {
    backgroundColor: MAIN_COLOR,
    borderRadius: 4 * SCALE_HEIGHT,
    marginLeft: 13 * SCALE_WIDTH,
    marginTop: 14 * SCALE_HEIGHT,
  },
  finishedStyle: {
    backgroundColor: COLOR_5,
  },
  timeContainer: {
    backgroundColor: '#85A0FF',
    borderRadius: 4 * SCALE_HEIGHT,
    marginLeft: 3 * SCALE_WIDTH,
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
    marginLeft: 6.5 * SCALE_WIDTH,
  },
  peopleContainer: {
    marginBottom: 14.2 * SCALE_HEIGHT,
  },
  peopleIcon: {
    width: 11.5 * SCALE_WIDTH,
    height: 13 * SCALE_HEIGHT,
    marginRight: 4 * SCALE_WIDTH,
  },
  peopleText: {
    color: COLOR_5,
    fontSize: FS(12),
  },
});
