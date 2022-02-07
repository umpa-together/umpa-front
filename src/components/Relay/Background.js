import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import FastImage from 'react-native-fast-image';
import Text from 'components/Text';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { useTrackPlayer } from 'providers/trackPlayer';
import ParticipantCount from './ParticipantCount';

export default function Background() {
  const { state } = useContext(RelayContext);
  const { playlist } = state.selectedRelay;
  const { title, image, representSong, evaluateCount, postUserId } = playlist;
  const { attributes } = representSong;
  const { artistName, name } = attributes;

  const { onClickSong, isPlayingId } = useTrackPlayer();
  const playingCheck = representSong.id === isPlayingId;

  return (
    <View>
      <View style={styles.blurContainer} />
      <FastImage source={{ uri: image }} style={styles.backgroundImg} />
      <View style={styles.infoContainer}>
        <Text style={[styles.whiteText, styles.playlistTitle]}>{title}</Text>
        <Text style={[styles.whiteText, styles.header]}>첫 곡</Text>
        <TouchableOpacity
          onPress={() => onClickSong(representSong)}
          style={[style.flexRow, styles.songContainer]}
        >
          <Icon
            style={styles.playIcon}
            source={
              playingCheck
                ? require('public/icons/swipe-play-small.png')
                : require('public/icons/swipe-play-small.png')
            }
          />
          <Text style={[styles.whiteText, styles.songText]}>
            {name} - {artistName}
          </Text>
        </TouchableOpacity>
        <ParticipantCount
          challenge={postUserId.length}
          vote={evaluateCount}
          container={styles.customContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    zIndex: -2,
    width: 375 * SCALE_WIDTH,
    height: 812 * SCALE_HEIGHT,
    backgroundColor: '#19191980',
    position: 'absolute',
  },
  infoContainer: {
    width: 339 * SCALE_WIDTH,
    paddingHorizontal: 33 * SCALE_WIDTH,
  },
  songContainer: {
    paddingTop: 6 * SCALE_HEIGHT,
  },
  backgroundImg: {
    width: 375 * SCALE_WIDTH,
    height: 812 * SCALE_HEIGHT,
    zIndex: -3,
    position: 'absolute',
  },
  whiteText: {
    color: '#fff',
  },
  playlistTitle: {
    fontSize: FS(20),
    marginTop: 90 * SCALE_HEIGHT,
  },
  header: {
    marginTop: 11 * SCALE_HEIGHT,
    fontSize: FS(12),
  },
  songText: {
    fontSize: FS(14),
  },
  playIcon: {
    width: 14 * SCALE_WIDTH,
    height: 14 * SCALE_WIDTH,
    marginRight: 4 * SCALE_WIDTH,
  },
  customContainer: {
    paddingTop: 5 * SCALE_HEIGHT,
  },
});
