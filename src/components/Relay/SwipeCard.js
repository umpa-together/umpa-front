import React, { useContext } from 'react';
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

const Footer = ({ song }) => {
  const { id } = song;
  const { onClickSong, isPlayingId, onClickPause, isStop } = useTrackPlayer();
  const { postAddedSong } = useContext(AddedContext);
  const { onClickAdded } = useModal();

  const onClickAdd = () => {
    postAddedSong({ song });
    onClickAdded();
  };

  const onClickPlay = () => {
    if (isPlayingId !== song.id) {
      onClickSong(song);
    } else {
      onClickPause();
    }
  };

  return (
    <View style={[style.flexRow, styles.footerContainer]}>
      <TouchableOpacity onPress={onClickPlay}>
        <Icon
          style={styles.songIcon}
          source={
            id === isPlayingId && !isStop
              ? require('public/icons/swipe-stop.png')
              : require('public/icons/swipe-play.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon style={styles.likeIcon} source={require('public/icons/swipe-heart-empty.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onClickAdd}>
        <Icon style={styles.songIcon} source={require('public/icons/swipe-save.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default function SwipeCard({ card }) {
  const { postUserId, song } = card;
  const { name, profileImage } = postUserId;
  const { attributes } = song;
  const { artwork, artistName, name: songName } = attributes;
  return (
    <View style={styles.container}>
      <View style={[style.flexRow, styles.headerContainer]}>
        <View style={style.flexRow}>
          <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.rankingText}>현재 순위 보기</Text>
        </TouchableOpacity>
      </View>
      <SongImage url={artwork.url} imgStyle={styles.songImg} />
      <View style={styles.songContainer}>
        <Text style={styles.songTitle}>{songName}</Text>
        <Text style={styles.songArtist}>{artistName}</Text>
      </View>
      <PlayAnimation
        container={styles.progressContainer}
        outContainer={styles.outContainer}
        innerContainer={styles.innerContainer}
        textContainer={styles.textContainer}
        textStyle={styles.textStyle}
      />
      <Footer song={song} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 339 * SCALE_WIDTH,
    height: 400 * SCALE_WIDTH,
    marginLeft: 18 * SCALE_WIDTH,
    marginTop: 30 * SCALE_HEIGHT,
    borderRadius: 15 * SCALE_HEIGHT,
    borderWidth: 2 * SCALE_WIDTH,
    borderColor: '#E4E4E450',
    backgroundColor: '#00000050',
  },
  headerContainer: {
    paddingTop: 16 * SCALE_HEIGHT,
    paddingHorizontal: 16 * SCALE_WIDTH,
    justifyContent: 'space-between',
  },
  songContainer: {
    alignItems: 'center',
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
});
