import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import { Context as AddedContext, Provider as AddedProvider } from 'context/Added';
import { Context as StoryContext } from 'context/Story';
import Icon from 'widgets/Icon';
import { useStory } from 'providers/story';
import { SongImageBackStory, SongImage } from 'widgets/SongImage';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import MoveText from 'components/MoveText';
import { useTrackPlayer } from 'providers/trackPlayer';
import { useModal } from 'providers/modal';
import AddedModal from 'components/Modal/AddedModal';
import StoryViewerModal from 'components/Modal/StoryViewerModal';
import ActionModal from 'components/Modal/ActionModal';
import HarmfulModal from 'components/Modal/HarmfulModal';
import Text from 'components/Text';
import Modal from '.';

const Header = ({ onClose }) => {
  const { stoptracksong } = useTrackPlayer();
  const {
    state: { user },
    follow,
  } = useContext(UserContext);
  const { deleteStory } = useContext(StoryContext);
  const {
    currentSong: {
      postUserId: { profileImage, name, _id: id },
      _id: storyId,
    },
  } = useStory();
  const isMyStory = user._id === id;
  const [deleteModal, setDeleteModal] = useState(false);
  const onExit = () => {
    onClose();
    stoptracksong();
  };

  const onClickOption = () => {
    if (isMyStory) {
      setDeleteModal(true);
    } else {
      follow({ id });
    }
  };

  const actionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '삭제하기', key: 'delete' },
  ];

  const actionFunction = (key) => {
    if (key === 'cancel') {
      setDeleteModal(false);
    } else {
      onClose();
      deleteStory({ storyId });
    }
  };

  return (
    <View style={[style.flexRow, styles.profileContainer, style.space_between]}>
      <View style={style.flexRow}>
        <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
        <Text style={styles.profileName}>{name}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onClickOption}>
          <Text style={styles.optionText}>
            {isMyStory ? '스토리 삭제' : !user.following.includes(id) && '팔로우'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onExit} activeOpacity={0.8}>
        <Icon source={require('public/icons/story-exit.png')} style={styles.exitIcon} />
      </TouchableOpacity>
      <ActionModal
        modal={deleteModal}
        setModal={setDeleteModal}
        actionInfo={{
          mainTitle: '스토리를 삭제하겠습니까?',
          func: actionFunction,
          list: actionLists,
        }}
      />
    </View>
  );
};

const SongBody = () => {
  const { isPlayingId } = useTrackPlayer();
  const {
    currentSong: {
      song: {
        attributes: { name, artistName, contentRating, artwork },
        id,
      },
    },
  } = useStory();
  return (
    <View style={styles.songContainer}>
      <SongImage url={artwork.url} imgStyle={styles.songImg} />
      <MoveText
        isExplicit={contentRating === 'explicit'}
        container={styles.textArea}
        text={name}
        isMove={id === isPlayingId}
        textStyle={styles.name}
        center
      />
      <MoveText
        container={[styles.textArea, styles.textBetween]}
        text={artistName}
        isMove={id === isPlayingId}
        textStyle={styles.artist}
        center
      />
    </View>
  );
};

const ProgressBar = () => {
  const { position, duration } = useTrackPlayer();
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);

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
    } else {
      reactive.setValue(-1000);
    }
  }, [position, width, duration]);
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBox}>
        <View
          onLayout={(e) => {
            const newWidth = e.nativeEvent.layout.width;
            setWidth(newWidth);
          }}
          style={styles.progressBar}
        >
          <Animated.View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              height: '100%',
              transform: [
                {
                  translateX: animatedValue,
                },
              ],
            }}
          />
        </View>
      </View>
      <View style={[style.flexRow, style.space_between, { width: '100%' }]}>
        <Text style={styles.time}>
          00:{Math.floor(position) < 10 ? `0${Math.floor(position)}` : Math.floor(position)}
        </Text>
        <Text style={styles.time}>00:30</Text>
      </View>
    </View>
  );
};

const ViewerImage = () => {
  const {
    state: { storyViewer },
  } = useContext(StoryContext);
  return (
    <>
      {storyViewer.slice(0, 2).map((item, index) => {
        const { profileImage } = item;
        return (
          <ProfileImage
            key={profileImage}
            img={profileImage}
            imgStyle={[
              styles.profileImg,
              storyViewer.length >= 2 && index === 0
                ? styles.profileLeft
                : storyViewer.length >= 2 && index === 1 && styles.profileRight,
            ]}
          />
        );
      })}
    </>
  );
};

const Footer = ({ onClose }) => {
  const { onClickSong, isPlayingId, onClickPause, isStop } = useTrackPlayer();
  const { postAddedSong } = useContext(AddedContext);
  const {
    currentSong: {
      song,
      likes,
      postUserId: { _id: id },
      _id: songId,
    },
  } = useStory();
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    likeStory,
    unlikeStory,
    state: { storyViewer },
  } = useContext(StoryContext);
  const { onClickAdded } = useModal();
  const isMyStory = user._id === id;
  const [isLike, setIsLike] = useState(likes.includes(user._id));
  const [viewerModal, setViewerModal] = useState(false);

  const onClickPlay = () => {
    if (isPlayingId !== song.id) {
      onClickSong(song);
    } else {
      onClickPause();
    }
  };

  const onClickLeftOption = () => {
    if (isMyStory) {
      setViewerModal(true);
    } else {
      postAddedSong({ song });
      onClickAdded();
    }
  };

  const onClickRightOption = () => {
    if (isLike) {
      unlikeStory({ id: songId });
    } else {
      likeStory({ id: songId });
    }
    setIsLike(!isLike);
  };

  useEffect(() => {
    setIsLike(likes.includes(user._id));
  }, [song]);

  return (
    <View style={[styles.footerContainer, style.flexRow, { justifyContent: 'center' }]}>
      <TouchableOpacity onPress={onClickLeftOption} style={styles.left}>
        {isMyStory ? (
          <>
            {storyViewer.length > 0 && (
              <View style={style.alignCenter}>
                <ViewerImage />
                <Text
                  style={[
                    styles.optionText,
                    { marginTop: storyViewer.length >= 2 ? 45 * SCALE_HEIGHT : 7 * SCALE_HEIGHT },
                  ]}
                >
                  {storyViewer.length}명 읽음
                </Text>
              </View>
            )}
          </>
        ) : (
          <Icon source={require('public/icons/story-add-song.png')} style={styles.icon} />
        )}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onClickPlay}>
        <Icon
          source={
            isPlayingId === song.id && !isStop
              ? require('public/icons/story-pause.png')
              : require('public/icons/story-play.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      {isMyStory ? (
        <>
          {likes.length > 0 && (
            <View style={[style.alignCenter, styles.right]}>
              <Icon source={require('public/icons/story-heart-filled.png')} style={styles.icon} />
              <Text style={styles.optionText}>{likes.length}명</Text>
            </View>
          )}
        </>
      ) : (
        <TouchableOpacity onPress={onClickRightOption} style={styles.right}>
          <Icon
            source={
              isLike
                ? require('public/icons/story-heart-filled.png')
                : require('public/icons/story-heart-empty.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      <StoryViewerModal modal={viewerModal} setModal={setViewerModal} onClose={onClose} />
    </View>
  );
};

const ModalView = ({ onClose }) => {
  const { onClickSong, stoptracksong } = useTrackPlayer();
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    currentSong: { song, _id: storyId },
    currentSong: {
      song: {
        attributes: { artwork, contentRating },
      },
      postUserId: { _id: id },
    },
    onClickLeft,
    onClickRight,
  } = useStory();
  const { readStory } = useContext(StoryContext);
  const { addedModal } = useModal();
  const isMyStory = user._id === id;
  const touchableLists = [
    { key: 'left', func: onClickLeft },
    { key: 'right', func: onClickRight },
  ];

  useEffect(() => {
    readStory({ id: storyId });
    if (contentRating !== 'explicit') {
      onClickSong(song);
    } else {
      stoptracksong();
    }
  }, [song]);

  return (
    <View style={[styles.viewContainer, { flexDirection: 'row' }]}>
      <SongImageBackStory url={artwork.url} border={0} imgStyle={styles.backgroundImg} />
      {!isMyStory &&
        touchableLists.map(({ key, func }) => {
          return <TouchableOpacity style={styles.touchable} key={key} onPress={func} />;
        })}
      <View style={styles.viewBox}>
        <Header onClose={onClose} />
        <SongBody />
        <ProgressBar />
        <AddedProvider>
          <Footer onClose={onClose} />
        </AddedProvider>
      </View>
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
      <HarmfulModal />
    </View>
  );
};

export default function StoryModal({ modal, setModal }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };
  return (
    <Modal
      isVisible={modal}
      onBackdropPress={onBackdropPress}
      style={styles.container}
      backdropOpacity={0.7}
    >
      <ModalView onClose={onBackdropPress} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  viewContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  touchable: {
    flex: 1,
    zIndex: 98,
  },
  viewBox: {
    position: 'absolute',
    left: 29 * SCALE_WIDTH,
    top: 119 * SCALE_HEIGHT,
    zIndex: 98,
    alignItems: 'center',
  },
  profileContainer: {
    marginBottom: 32 * SCALE_HEIGHT,
    width: '100%',
  },
  profileImg: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
    borderRadius: 30 * SCALE_HEIGHT,
  },
  profileName: {
    fontSize: FS(14),
    color: '#fff',
    marginHorizontal: 7 * SCALE_WIDTH,
  },
  songContainer: {
    width: 317 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
    backgroundColor: 'rgba(25,25,25,0.8)',
    alignItems: 'center',
  },
  songImg: {
    width: 317 * SCALE_WIDTH,
    height: 317 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  textArea: {
    width: 270 * SCALE_WIDTH,
    textAlign: 'center',
    marginTop: 16 * SCALE_HEIGHT,
  },
  textBetween: {
    marginTop: 3 * SCALE_HEIGHT,
  },
  name: {
    fontSize: FS(18),
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 9 * SCALE_WIDTH,
  },
  artist: {
    fontSize: FS(14),
    marginBottom: 19 * SCALE_HEIGHT,
    color: '#fff',
  },
  exitIcon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    zIndex: 98,
  },
  optionText: {
    fontSize: FS(12),
    color: '#fff',
  },
  progressContainer: {
    width: 276 * SCALE_WIDTH,
    marginTop: 30 * SCALE_HEIGHT,
  },
  progressBox: {
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: 3.5 * SCALE_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 100 * SCALE_HEIGHT,
  },
  icon: {
    width: 45 * SCALE_WIDTH,
    height: 45 * SCALE_WIDTH,
  },
  footerContainer: {
    width: '100%',
    paddingHorizontal: 11 * SCALE_WIDTH,
    marginTop: 17 * SCALE_HEIGHT,
  },
  time: {
    marginTop: 11 * SCALE_HEIGHT,
    fontSize: FS(12),
    color: '#fff',
  },
  left: {
    position: 'absolute',
    left: 0,
  },
  right: {
    position: 'absolute',
    right: 0,
  },
  profileLeft: {
    position: 'absolute',
    left: 0 * SCALE_WIDTH,
    top: 10 * SCALE_HEIGHT,
  },
  profileRight: {
    position: 'absolute',
    right: 0 * SCALE_WIDTH,
    top: 10 * SCALE_HEIGHT,
  },
});
