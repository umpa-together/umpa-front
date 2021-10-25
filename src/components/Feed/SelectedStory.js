import React, { useEffect, useState, useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import Modal from 'react-native-modal';
import { SongImageBack } from 'components/SongImage';
import HarmfulModal from 'components/HarmfulModal';
import { tmpWidth } from 'components/FontNormalize';
import StatusBarHeight from 'components/StatusBarHeight';
import { useTrackPlayer } from 'providers/trackPlayer';
import SvgUri from 'react-native-svg-uri';
import MoveText from 'components/MoveText';
import { useStory } from 'providers/story';
import ProfileImage from 'components/ProfileImage';

const SelectedStory = () => {
  const { state } = useContext(UserContext);
  const {
    storyModal,
    onClose,
    onClickProfile,
    currentStory,
    onClickStory,
    setIsMyStory,
    isMyStory,
  } = useStory();
  const [song, setSong] = useState(null);
  const [user, setUser] = useState(null);
  const { addtracksong, stoptracksong, isPlayingId } = useTrackPlayer();
  const { story: selectedStory, index: selectedIdx } = currentStory;

  const onClickPrevStory = () => {
    onClickStory({ item: state.otherStory[selectedIdx - 1], index: selectedIdx - 1 });
  };

  const onClickNextStory = () => {
    onClickStory({ item: state.otherStory[selectedIdx + 1], index: selectedIdx + 1 });
  };

  const onClickPlay = () => {
    if (isPlayingId === '0') {
      addtracksong({ data: song });
    } else {
      stoptracksong();
    }
  };

  useEffect(() => {
    if (selectedStory) {
      setSong(selectedStory.song.song ? selectedStory.song.song : state.myStory.song);
      setIsMyStory(!selectedStory.song.song);
      if (selectedStory.song.song) {
        setUser({
          id: selectedStory.id,
          name: selectedStory.name,
          profileImage: selectedStory.profileImage,
        });
      } else {
        setUser({
          id: state.myInfo._id,
          name: state.myInfo.name,
          profileImage: state.myInfo.profileImage,
        });
      }
    }
  }, [selectedStory]);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={storyModal}
      backdropOpacity={1}
      style={styles.container}
    >
      <View style={styles.flex}>
        <TouchableOpacity style={styles.exit} onPress={onClose}>
          <SvgUri width="15" height="15" source={require('assets/icons/storyExit.svg')} />
        </TouchableOpacity>
        {song && (
          <>
            <View style={[styles.box, styles.songBox, styles.flexRow]}>
              <SvgUri
                style={styles.songIcon}
                width="22"
                height="22"
                source={require('assets/icons/storySong.svg')}
              />
              <MoveText
                container={styles.songArea}
                text={`${song.attributes.artistName} - ${song.attributes.name}`}
                isMove={isPlayingId !== '0'}
                isExplicit={false}
                textStyles={styles.name}
              />
            </View>
            <TouchableOpacity style={styles.userBox} onPress={onClickProfile}>
              <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
              <View style={styles.nameArea}>
                <Text style={styles.userName} numberOfLines={1}>
                  {user.name}
                </Text>
              </View>
            </TouchableOpacity>
            <SongImageBack
              url={song.attributes.artwork.url}
              width={375}
              height={812}
              opac={0.8}
              border={0}
              imgStyle={styles.backgroundImg}
            />
          </>
        )}
        {!isMyStory && (
          <View style={[styles.flexRow, styles.flex]}>
            <TouchableOpacity style={styles.flex} onPress={onClickPrevStory} />
            <TouchableOpacity style={styles.flex} onPress={onClickNextStory} />
          </View>
        )}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.icon} onPress={onClickPlay}>
            <SvgUri
              width="40"
              height="40"
              source={
                isPlayingId !== '0'
                  ? require('assets/icons/storyPlay.svg')
                  : require('assets/icons/storyStop.svg')
              }
            />
          </TouchableOpacity>
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
    marginTop: (30 + StatusBarHeight) * tmpWidth,
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
  profileImg: {
    width: 20 * tmpWidth,
    height: 20 * tmpWidth,
    borderRadius: 20 * tmpWidth,
    marginRight: 10 * tmpWidth,
    marginLeft: 8 * tmpWidth,
  },
  userName: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
  },
  userBox: {
    width: 120 * tmpWidth,
    height: 30 * tmpWidth,
    borderRadius: 100 * tmpWidth,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginLeft: 18 * tmpWidth,
    marginTop: 14 * tmpWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameArea: {
    width: 60 * tmpWidth,
  },
});

export default SelectedStory;
