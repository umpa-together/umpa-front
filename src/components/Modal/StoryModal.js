import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import { Context as AddedContext } from 'context/Added';
import { Context as StoryContext } from 'context/Story';
import { Context as FeedContext } from 'context/Feed';
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
import PlayAnimation from 'components/PlayAnimation';
import ProgressProvider from 'providers/progress';
import CopySongName from 'components/CopySongName';
import { navigate, push } from 'lib/utils/navigation';
import TouchableNoDouble from 'components/TouchableNoDouble';
import Modal from '.';

const Header = ({ onClose }) => {
  const { stopTrackSong } = useTrackPlayer();
  const {
    state: { user },
    follow,
  } = useContext(UserContext);
  const { deleteStory, getOtherStoryWithAll, getOtherStoryWithFollower } = useContext(StoryContext);
  const {
    state: { type },
  } = useContext(FeedContext);
  const {
    currentSong: {
      postUserId: { profileImage, name, _id: id },
      _id: storyId,
    },
  } = useStory();
  const isMyStory = user._id === id;
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickProfile = () => {
    if (isMyStory) {
      navigate('MyAccount');
    } else {
      push('OtherAccount', { id });
    }
    onClose();
  };

  const onExit = () => {
    onClose();
    stopTrackSong();
    if (type) {
      getOtherStoryWithAll();
    } else {
      getOtherStoryWithFollower();
    }
  };

  const onClickOption = () => {
    if (isMyStory) {
      setDeleteModal(true);
    } else {
      follow({ id });
    }
  };

  const actionLists = [
    { title: '????????????', key: 'cancel' },
    { title: '????????????', key: 'delete' },
  ];

  const actionFunction = (key) => {
    if (key === 'cancel') {
      setDeleteModal(false);
    } else {
      onClose();
      deleteStory({ storyId });
    }
  };

  const actionInfo = {
    mainTitle: '???????????? ??????????????????????',
    func: actionFunction,
    list: actionLists,
  };

  return (
    <View style={[style.flexRow, styles.profileContainer, style.space_between]}>
      <View style={style.flexRow}>
        <TouchableOpacity onPress={onClickProfile}>
          <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
        </TouchableOpacity>
        <Text style={styles.profileName}>{name}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onClickOption}>
          <Text style={styles.optionText}>
            {isMyStory ? '????????? ??????' : !user.following.includes(id) && '?????????'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onExit} activeOpacity={0.8}>
        <Icon source={require('public/icons/story-exit.png')} style={styles.exitIcon} />
      </TouchableOpacity>
      <ActionModal modal={deleteModal} setModal={setDeleteModal} actionInfo={actionInfo} />
    </View>
  );
};

const SongBody = () => {
  const {
    currentSong: {
      song: {
        attributes: { name, artistName, contentRating, artwork },
      },
    },
  } = useStory();
  return (
    <View style={styles.songContainer}>
      <SongImage url={artwork.url} imgStyle={styles.songImg} />
      <CopySongName>
        <MoveText
          isExplicit={contentRating === 'explicit'}
          container={styles.textArea}
          text={name}
          isMove
          textStyle={styles.name}
          center
        />
        <MoveText
          container={[styles.textArea, styles.textBetween]}
          text={artistName}
          isMove
          textStyle={styles.artist}
          center
        />
      </CopySongName>
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
            key={Math.random()}
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
  const { onClickPlayBar, state, currentSong, onClickSong } = useTrackPlayer();
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

  const onClickLeftOption = () => {
    if (isMyStory) {
      setViewerModal(true);
    } else {
      postAddedSong({ song });
      onClickAdded({ opt: 'save' });
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

  const viewerMargin = {
    marginTop: storyViewer.length >= 2 ? 45 * SCALE_HEIGHT : 7 * SCALE_HEIGHT,
  };

  const onClickPlay = () => {
    if (currentSong) {
      onClickPlayBar();
    } else {
      onClickSong(song);
    }
  };

  useEffect(() => {
    setIsLike(likes.includes(user._id));
  }, [song]);

  return (
    <View style={[styles.footerContainer, style.flexRow]}>
      <TouchableNoDouble onPress={onClickLeftOption} style={styles.left}>
        {isMyStory ? (
          <>
            {storyViewer.length > 0 && (
              <View style={style.alignCenter}>
                <ViewerImage />
                <Text style={[styles.optionText, viewerMargin]}>{storyViewer.length}??? ??????</Text>
              </View>
            )}
          </>
        ) : (
          <Icon source={require('public/icons/story-add-song.png')} style={styles.icon} />
        )}
      </TouchableNoDouble>
      <TouchableOpacity activeOpacity={0.8} onPress={onClickPlay}>
        <Icon
          source={
            state === 'play'
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
              <Text style={styles.optionText}>{likes.length}???</Text>
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
  const { addTrackSong, stopTrackSong } = useTrackPlayer();
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
  const onClickStoryLeft = () => {
    if (!isMyStory) {
      onClickLeft();
    }
  };
  const onClickStoryRight = () => {
    if (!isMyStory) {
      onClickRight();
    } else {
      stopTrackSong();
      onClose();
    }
  };
  const touchableLists = [
    { key: 'left', func: onClickStoryLeft },
    { key: 'right', func: onClickStoryRight },
  ];

  useEffect(() => {
    readStory({ id: storyId });
    if (contentRating !== 'explicit') {
      addTrackSong(song);
    } else {
      stopTrackSong();
    }
  }, [song]);

  return (
    <View style={styles.viewContainer}>
      <SongImageBackStory url={artwork.url} border={0} imgStyle={styles.backgroundImg} />
      {touchableLists.map(({ key, func }) => {
        return <TouchableOpacity style={styles.touchable} key={key} onPress={func} />;
      })}
      <View style={styles.viewBox}>
        <Header onClose={onClose} />
        <SongBody />
        <ProgressProvider>
          <PlayAnimation
            container={styles.progressContainer}
            outContainer={styles.progressBar}
            innerContainer={styles.innerContainer}
            textContianer={styles.textContianer}
            textStyle={styles.time}
          />
        </ProgressProvider>
        <Footer onClose={onClose} />
      </View>
      {addedModal && <AddedModal />}
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
    flexDirection: 'row',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  touchable: {
    flex: 1,
  },
  viewBox: {
    position: 'absolute',
    left: 29 * SCALE_WIDTH,
    top: 119 * SCALE_HEIGHT,
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
    marginTop: 16 * SCALE_HEIGHT,
  },
  textBetween: {
    marginTop: 3 * SCALE_HEIGHT,
  },
  name: {
    fontSize: FS(18),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    fontSize: FS(14),
    marginBottom: 19 * SCALE_HEIGHT,
    color: '#fff',
    textAlign: 'center',
  },
  exitIcon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    zIndex: 99,
  },
  optionText: {
    fontSize: FS(12),
    color: '#fff',
  },
  progressContainer: {
    width: 276 * SCALE_WIDTH,
    marginTop: 30 * SCALE_HEIGHT,
  },
  progressBar: {
    width: '100%',
    height: 3.5 * SCALE_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 100 * SCALE_HEIGHT,
  },
  innerContainer: {
    backgroundColor: '#fff',
    height: '100%',
  },
  textContianer: {
    width: '100%',
  },
  icon: {
    width: 45 * SCALE_WIDTH,
    height: 45 * SCALE_WIDTH,
    zIndex: 99,
  },
  footerContainer: {
    width: '100%',
    paddingHorizontal: 11 * SCALE_WIDTH,
    marginTop: 17 * SCALE_HEIGHT,
    justifyContent: 'center',
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
