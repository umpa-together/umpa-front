import React, { useRef, useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTrackPlayer } from 'providers/trackPlayer';
import { Context as AddedContext } from 'context/Added';
import Icon from 'widgets/Icon';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';
import { MAIN_COLOR, COLOR_2 } from 'constants/colors';
import MoveText from 'components/MoveText';
import { useModal } from 'providers/modal';
import AddedModal from 'components/Modal/AddedModal';

export default function PlayBar() {
  const { currentSong, position, duration, isPlayingId, onClickPause, isStop } = useTrackPlayer();
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);
  const { name, artistName, contentRating } = currentSong.attributes;
  const { postAddedSong } = useContext(AddedContext);
  const { onClickAdded, addedModal } = useModal();
  const onClickAdd = () => {
    postAddedSong({ song: currentSong });
    onClickAdded();
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (duration !== 0) {
      reactive.setValue(-width + width * (position / duration));
    }
  }, [position, width, duration]);

  return (
    <View style={styles.container}>
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={styles.statusBar}
      >
        <Animated.View
          style={{
            width: '100%',
            backgroundColor: MAIN_COLOR,
            height: '100%',
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
      </View>
      <View style={[style.flexRow, styles.infoContainer, style.space_between]}>
        <View style={styles.textArea}>
          <MoveText
            isExplicit={contentRating === 'explicit'}
            text={name}
            isMove={currentSong.id === isPlayingId}
            textStyle={styles.name}
          />
          <MoveText
            text={artistName}
            isMove={currentSong.id === isPlayingId}
            textStyle={styles.artist}
          />
        </View>
        <View style={style.flexRow}>
          <TouchableOpacity onPress={onClickPause} activeOpacity={0.8}>
            <Icon
              source={!isStop ? require('public/icons/stop.png') : require('public/icons/play.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClickAdd} activeOpacity={0.8}>
            <Icon source={require('public/icons/add-song.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  infoContainer: {
    height: 56 * SCALE_HEIGHT,
    paddingLeft: 24 * SCALE_WIDTH,
    paddingRight: 11 * SCALE_WIDTH,
  },
  textArea: {
    width: 250 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(14),
    fontWeight: 'bold',
    color: COLOR_2,
  },
  artist: {
    fontSize: FS(13),
    color: COLOR_2,
    marginTop: 3 * SCALE_HEIGHT,
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    marginRight: 5 * SCALE_WIDTH,
  },
  statusBar: {
    height: 2 * SCALE_HEIGHT,
    backgroundColor: '#dcdcdc',
  },
});
