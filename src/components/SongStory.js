import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import Modal from 'react-native-modal';
import { SongImageBack } from 'widgets/SongImage';
import HarmfulModal from 'components/Modal/HarmfulModal';
import { tmpWidth } from 'components/FontNormalize';
import StatusBarHeight from 'components/StatusBarHeight';
import { useTrackPlayer } from 'providers/trackPlayer';
import SvgUri from 'react-native-svg-uri';
import { navigate } from 'lib/utils/navigation';
import MoveText from 'components/MoveText';

const SongStory = ({ setArchiveModal, archive }) => {
  const { state } = useContext(UserContext);
  const [idx, setIdx] = useState(0);
  const { addtracksong, stoptracksong, isPlayingId, isMute, onClickVolume } = useTrackPlayer();
  const { songs, _id: board } = archive;
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [likeCheck, setLikeCheck] = useState(songs[0].likes.includes(state.myInfo._id));

  const onClose = () => {
    setArchiveModal(false);
    stoptracksong();
  };

  const onClickPrevious = () => {
    if (idx === 0) return;
    setCurrentSong(songs[idx - 1]);
    setIdx((prev) => prev - 1);
    addtracksong({ data: songs[idx - 1].song });
  };

  const onClickNext = () => {
    if (idx === songs.length - 1) return;
    setCurrentSong(songs[idx + 1]);
    setIdx((prev) => prev + 1);
    addtracksong({ data: songs[idx + 1].song });
  };

  const onClickLikes = () => {
    if (likeCheck) {
      setLikeCheck(false);
    } else {
      setLikeCheck(true);
    }
  };

  const onClickAddSong = () => {
    setArchiveModal(false);
    navigate('SearchMusic', { isMusicArchive: true, boardId: board._id });
  };

  useEffect(() => {
    addtracksong({ data: currentSong.song });
  }, []);

  useEffect(() => {
    setLikeCheck(currentSong.likes.includes(state.myInfo._id));
  }, [currentSong]);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible
      backdropOpacity={1}
      style={styles.container}
    >
      <View style={styles.flex}>
        <View style={styles.header}>
          {songs.map((item, index) => (
            <View
              style={[
                styles.songBar,
                { width: `${100 / songs.length}%` },
                idx >= index && styles.active,
              ]}
              key={item.id}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.exit} onPress={onClose}>
          <SvgUri width="15" height="15" source={require('assets/icons/storyExit.svg')} />
        </TouchableOpacity>
        <View style={[styles.box, styles.songBox, styles.flexRow]}>
          <SvgUri
            style={styles.songIcon}
            width="22"
            height="22"
            source={require('assets/icons/storySong.svg')}
          />
          <MoveText
            container={styles.songArea}
            text={`${currentSong.song.attributes.artistName} - ${currentSong.song.attributes.name}`}
            isMove={isPlayingId !== '0'}
            isExplicit={false}
            textStyles={styles.name}
          />
        </View>
        <SongImageBack
          url={currentSong.song.attributes.artwork.url}
          width={375}
          height={812}
          opac={0.8}
          border={0}
          imgStyle={styles.backgroundImg}
        />
        <View style={[styles.flexRow, styles.flex]}>
          <TouchableOpacity style={styles.flex} onPress={onClickPrevious} />
          <TouchableOpacity style={styles.flex} onPress={onClickNext} />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.icon} onPress={onClickVolume}>
            <SvgUri
              width="40"
              height="40"
              source={
                !isMute
                  ? require('assets/icons/storyPlay.svg')
                  : require('assets/icons/storyStop.svg')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.plusBox} onPress={onClickAddSong}>
            <SvgUri width="15" height="15" source={require('assets/icons/storyPlus.svg')} />
          </TouchableOpacity>
          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.icon} onPress={onClickLikes}>
              <SvgUri
                width="40"
                height="40"
                source={
                  likeCheck
                    ? require('assets/icons/storyHearto.svg')
                    : require('assets/icons/storyHeart.svg')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <HarmfulModal />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  header: {
    width: '100%',
    paddingTop: StatusBarHeight * tmpWidth,
    height: (30 + StatusBarHeight) * tmpWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songBar: {
    height: 3 * tmpWidth,
    borderRadius: 100 * tmpWidth,
    backgroundColor: 'rgba(139, 192, 255, 0.3)',
  },
  active: {
    backgroundColor: '#ffffff',
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 100 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4 * tmpWidth,
    marginLeft: 18 * tmpWidth,
  },
  name: {
    color: '#ffffff',
    fontSize: 14 * tmpWidth,
    fontWeight: '500',
    textAlign: 'center',
  },
  boardName: {
    paddingLeft: 23 * tmpWidth,
    paddingRight: 23 * tmpWidth,
    paddingTop: 7 * tmpWidth,
    paddingBottom: 7 * tmpWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {
    position: 'absolute',
    zIndex: -1,
  },
  icon: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 35 * tmpWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 24 * tmpWidth,
    paddingRight: 24 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
  },
  plusBox: {
    width: 88 * tmpWidth,
    height: 34 * tmpWidth,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 100 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 15 * tmpWidth,
    position: 'absolute',
    left: 144 * tmpWidth,
  },
  flex: {
    flex: 1,
  },
  exit: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 60 * tmpWidth,
  },
  songBox: {
    width: 240 * tmpWidth,
    height: 33 * tmpWidth,
  },
  songArea: {
    width: 180 * tmpWidth,
  },
  songIcon: {
    marginLeft: 8 * tmpWidth,
    marginRight: 8 * tmpWidth,
  },
  boardBox: {
    width: 132 * tmpWidth,
    height: 33 * tmpWidth,
  },
  boardArea: {
    width: 100 * tmpWidth,
  },
});

export default SongStory;
