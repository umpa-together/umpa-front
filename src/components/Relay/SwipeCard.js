import React, { useContext, useState, useRef, memo } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import { SongImage } from 'widgets/SongImage';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Text from 'components/Text';
import Icon from 'widgets/Icon';
import { useTrackPlayer } from 'providers/trackPlayer';
import { Context as AddedContext } from 'context/Added';
import { useModal } from 'providers/modal';
import PlayAnimation from 'components/PlayAnimation';
import { navigate } from 'lib/utils/navigation';
import TouchableNoDouble from 'components/TouchableNoDouble';
import FastImage from 'react-native-fast-image';
import MoveText from 'components/MoveText';
import ProgressProvider from 'providers/progress';
import CopySongName from 'components/CopySongName';
import HapticFeedback from 'lib/utils/haptic';

const Footer = memo(({ song, like, setLike }) => {
  const { id } = song;
  const { isPlayingId, onClickPlayBar, state, addTrackSong } = useTrackPlayer();
  const { postAddedSong } = useContext(AddedContext);
  const { onClickAdded } = useModal();

  const onClickAdd = () => {
    postAddedSong({ song });
    onClickAdded({ opt: 'save' });
  };

  const onClickLike = () => {
    if (like === false) {
      HapticFeedback();
    }
    setLike(!like);
  };

  const onClickPlay = () => {
    if (isPlayingId === id) {
      onClickPlayBar();
    } else {
      addTrackSong(song);
    }
  };

  return (
    <View style={[style.flexRow, styles.footerContainer]}>
      <TouchableOpacity onPress={onClickPlay}>
        <Icon
          style={styles.songIcon}
          source={
            id !== isPlayingId || (id === isPlayingId && state !== 'play')
              ? require('public/icons/swipe-play.png')
              : require('public/icons/swipe-stop.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClickLike}>
        <Icon
          style={styles.likeIcon}
          source={
            like
              ? require('public/icons/swipe-heart-full.png')
              : require('public/icons/swipe-heart-empty.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClickAdd}>
        <Icon style={styles.songIcon} source={require('public/icons/swipe-save.png')} />
      </TouchableOpacity>
    </View>
  );
});

export default function SwipeCard({ image, card, like, setLike }) {
  const {
    postUserId: { name, profileImage },
    song,
    playlistId,
  } = card;
  const {
    id,
    attributes: { artwork, artistName, name: songName, contentRating },
  } = song;
  const [topOffset, setTopOffset] = useState(0);
  const { stopTrackSong, isPlayingId } = useTrackPlayer();

  const onClickMove = () => {
    stopTrackSong();
    navigate('SelectedRelay', { id: playlistId });
  };

  const imageTop = {
    top: -1 * topOffset - 2 * SCALE_HEIGHT,
  };

  const ParentView = useRef();

  return (
    <View
      ref={ParentView}
      onLayout={() => {
        ParentView.current.measure((fx, fy, width, height, px, py) => {
          setTopOffset(py);
        });
      }}
      style={styles.container}
    >
      {image && (
        <View style={styles.imgContainer}>
          <View style={styles.blurContainerFirst} />
          <View style={styles.blurContainerSecond} />
          <FastImage
            source={{ uri: image }}
            style={[styles.backImageContainer, topOffset !== 0 && imageTop]}
          />
        </View>
      )}
      <View style={[style.flexRow, styles.headerContainer]}>
        <View style={style.flexRow}>
          <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <TouchableNoDouble onPress={onClickMove}>
          <Text style={styles.rankingText}>현재 순위 보기</Text>
        </TouchableNoDouble>
      </View>
      <SongImage url={artwork.url} imgStyle={styles.songImg} />
      <CopySongName name={songName}>
        <View style={styles.songContainer}>
          <MoveText
            isExplicit={contentRating === 'explicit'}
            text={songName}
            isMove={song.id === isPlayingId}
            textStyle={styles.songTitle}
            iconCustom={styles.adultIcon}
            center
          />
          <MoveText
            text={artistName}
            isMove={song.id === isPlayingId}
            textStyle={styles.songArtist}
          />
        </View>
      </CopySongName>
      <ProgressProvider>
        <PlayAnimation
          songId={id}
          container={styles.progressContainer}
          outContainer={styles.outContainer}
          innerContainer={styles.innerContainer}
          textContainer={styles.textContainer}
          textStyle={styles.textStyle}
        />
      </ProgressProvider>
      <Footer song={song} like={like} setLike={setLike} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 339 * SCALE_WIDTH,
    height: 400 * SCALE_WIDTH,
    marginLeft: 18 * SCALE_WIDTH,
    marginTop: 30 * SCALE_HEIGHT,
    borderRadius: 15 * SCALE_HEIGHT,
    borderWidth: 2 * SCALE_WIDTH,
    borderColor: '#E4E4E450',
    backgroundColor: '#00000050',
  },
  imgContainer: {
    width: 335 * SCALE_WIDTH,
    height: 396 * SCALE_WIDTH,
    borderRadius: 15 * SCALE_HEIGHT,
    overflow: 'hidden',
    position: 'absolute',
  },
  blurContainerFirst: {
    zIndex: -1,
    width: 335 * SCALE_WIDTH,
    height: 396 * SCALE_WIDTH,
    borderRadius: 15 * SCALE_HEIGHT,
    backgroundColor: '#00000050',
    position: 'absolute',
  },
  blurContainerSecond: {
    zIndex: -2,
    width: 335 * SCALE_WIDTH,
    height: 396 * SCALE_WIDTH,
    borderRadius: 15 * SCALE_HEIGHT,
    backgroundColor: '#19191980',
    position: 'absolute',
  },
  backImageContainer: {
    width: 375 * SCALE_WIDTH,
    height: 812 * SCALE_HEIGHT,
    top: -215.5 * SCALE_HEIGHT,
    left: -20 * SCALE_WIDTH,
    borderRadius: 15 * SCALE_HEIGHT,
    position: 'absolute',
    zIndex: -3,
  },
  headerContainer: {
    paddingTop: 16 * SCALE_HEIGHT,
    paddingHorizontal: 16 * SCALE_WIDTH,
    justifyContent: 'space-between',
  },
  songContainer: {
    alignItems: 'center',
    marginLeft: 17 * SCALE_WIDTH,
    width: 301 * SCALE_WIDTH,
  },
  footerContainer: {
    paddingHorizontal: 28 * SCALE_WIDTH,
    justifyContent: 'space-between',
  },
  nameText: {
    paddingLeft: 8 * SCALE_WIDTH,
    fontSize: FS(14),
    color: '#fff',
  },
  rankingText: {
    fontSize: FS(14),
    color: '#fff',
    fontWeight: 'bold',
  },
  profileImg: {
    width: 26,
    height: 26,
    borderRadius: 30,
  },
  songImg: {
    width: 177 * SCALE_WIDTH,
    height: 177 * SCALE_WIDTH,
    marginLeft: 81 * SCALE_WIDTH,
    marginTop: 24 * SCALE_HEIGHT,
    borderRadius: 4 * SCALE_HEIGHT,
  },
  songTitle: {
    marginTop: 20 * SCALE_HEIGHT,
    fontWeight: 'bold',
    fontSize: FS(18),
    color: '#fff',
  },
  songArtist: {
    marginTop: 10 * SCALE_HEIGHT,
    fontSize: FS(14),
    color: '#fff',
  },
  likeIcon: {
    width: 38 * SCALE_WIDTH,
    height: 38 * SCALE_WIDTH,
  },
  songIcon: {
    width: 35 * SCALE_WIDTH,
    height: 35 * SCALE_WIDTH,
  },
  progressContainer: {
    paddingTop: 14 * SCALE_HEIGHT,
    paddingBottom: 4 * SCALE_HEIGHT,
  },
  outContainer: {
    width: 276 * SCALE_WIDTH,
    height: 3.5 * SCALE_WIDTH,
    backgroundColor: '#FFFFFF30',
    marginLeft: 32 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
  },
  innerContainer: {
    height: 3.5 * SCALE_WIDTH,
    width: 276 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
    backgroundColor: '#fff',
  },
  textContainer: {
    marginLeft: 32 * SCALE_WIDTH,
    width: 276 * SCALE_WIDTH,
  },
  textStyle: {
    marginTop: 7 * SCALE_HEIGHT,
    fontSize: FS(12),
    color: '#fff',
  },
  adultIcon: {
    position: 'absolute',
    top: 18 * SCALE_HEIGHT,
    right: 10 * SCALE_WIDTH,
  },
});
