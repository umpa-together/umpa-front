import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import FastImage from 'react-native-fast-image';
import Text from 'components/Text';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { useTrackPlayer } from 'providers/trackPlayer';
import { goBack } from 'lib/utils/navigation';
import ParticipantCount from './ParticipantCount';

export default function Background() {
  const {
    state: {
      selectedRelay: {
        playlist: { title, image, representSong, evaluateUserId, postUserId },
      },
    },
  } = useContext(RelayContext);
  const {
    id: representSongId,
    attributes: { artistName, name },
  } = representSong;
  const { onClickSong, isPlayingId, state } = useTrackPlayer();
  const playingCheck = representSongId === isPlayingId && state === 'play';
  const paddingStyle = {
    paddingLeft: Platform.OS === 'ios' ? 17 * SCALE_WIDTH : 33 * SCALCW,
  };
  return (
    <View>
      <View style={styles.blurContainer} />
      <FastImage source={{ uri: image }} style={styles.backgroundImg} />
      <View style={[styles.infoContainer, paddingStyle, style.flexRow]}>
        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={goBack}>
            <Icon source={require('public/icons/relay-back.png')} style={styles.back} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={[styles.whiteText, styles.playlistTitle]}>
            {title.map((item) => `${item} `)}
          </Text>
          <Text style={[styles.whiteText, styles.header]}>첫 곡</Text>
          <TouchableOpacity
            onPress={() => onClickSong(representSong)}
            style={[style.flexRow, styles.songContainer]}
          >
            <Icon
              style={styles.playIcon}
              source={
                playingCheck
                  ? require('public/icons/swipe-stop-small.png')
                  : require('public/icons/swipe-play-small.png')
              }
            />
            <Text style={[styles.whiteText, styles.songText]}>
              {name} - {artistName}
            </Text>
          </TouchableOpacity>
          <ParticipantCount
            challenge={postUserId.length}
            vote={evaluateUserId.length}
            container={styles.customContainer}
          />
        </View>
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
    paddingRight: 33 * SCALE_WIDTH,
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
  back: {
    width: 24 * SCALE_WIDTH,
    height: 24 * SCALE_WIDTH,
    marginRight: 4 * SCALE_WIDTH,
  },
});
