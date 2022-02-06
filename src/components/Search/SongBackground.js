import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import { SongImage, SongImageBack } from 'widgets/SongImage';
import { useTrackPlayer } from 'providers/trackPlayer';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import { goBack } from 'lib/utils/navigation';
import MoveText from 'components/MoveText';
import { COLOR_4 } from 'constants/colors';
import style from 'constants/styles';
import { useModal } from 'providers/modal';

export default function Songbackground({ song }) {
  const { name, artistName, artwork, contentRating, releaseDate } = song.attributes;
  const { onClickSong, isPlayingId } = useTrackPlayer();
  const { postAddedSong } = useContext(AddedContext);
  const { onClickAdded } = useModal();

  const onClickPlay = () => {
    onClickSong(song);
  };

  const onClickAdd = () => {
    postAddedSong({ song });
    onClickAdded();
  };

  const optionLists = [
    {
      title: '곡 재생',
      icon: (
        <Icon
          source={
            song.id === isPlayingId
              ? require('public/icons/stop.png')
              : require('public/icons/play.png')
          }
          style={styles.icon}
        />
      ),
      func: onClickPlay,
    },
    {
      title: '곡 담기',
      icon: <Icon source={require('public/icons/add-song.png')} style={styles.icon} />,
      func: onClickAdd,
    },
  ];

  return (
    <View style={styles.container}>
      <SongImageBack url={artwork.url} imgStyle={styles.background} border={0} />
      <TouchableOpacity onPress={goBack} activeOpacity={0.9}>
        <Icon source={require('public/icons/back-40.png')} style={styles.back} />
      </TouchableOpacity>
      <SongImage url={artwork.url} imgStyle={styles.img} />
      <View style={styles.infoContainer}>
        <MoveText
          isExplicit={contentRating === 'explicit'}
          text={name}
          isMove={song.id === isPlayingId}
          textStyle={styles.title}
        />
        <MoveText text={artistName} isMove={song.id === isPlayingId} textStyle={styles.artist} />
        <Text style={styles.release}>{releaseDate.replaceAll('-', '.')}</Text>
      </View>
      <View style={[styles.optionContainer, style.flexRow]}>
        {optionLists.map((option) => {
          const { title, icon, func } = option;
          return (
            <TouchableOpacity
              key={title}
              style={[style.flexRow, styles.box]}
              onPress={func}
              activeOpacity={0.8}
            >
              {icon}
              <Text style={styles.option}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300 * SCALE_HEIGHT,
  },
  background: {
    width: '100%',
    height: 140 * SCALE_HEIGHT,
    opacity: 0.5,
  },
  back: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_HEIGHT,
    position: 'absolute',
    top: -93 * SCALE_HEIGHT,
    left: 6 * SCALE_WIDTH,
  },
  img: {
    width: 122 * SCALE_HEIGHT,
    height: 122 * SCALE_HEIGHT,
    borderRadius: 6 * SCALE_HEIGHT,
    zIndex: 98,
    position: 'absolute',
    left: 22 * SCALE_WIDTH,
    top: 101 * SCALE_HEIGHT,
  },
  infoContainer: {
    marginLeft: 157 * SCALE_WIDTH,
    marginTop: 8 * SCALE_HEIGHT,
    width: 200 * SCALE_WIDTH,
  },
  title: {
    fontSize: FS(18),
    fontWeight: 'bold',
  },
  artist: {
    fontSize: FS(14),
    marginTop: 8 * SCALE_HEIGHT,
    marginBottom: 6 * SCALE_HEIGHT,
  },
  release: {
    fontSize: FS(13),
    color: COLOR_4,
  },
  optionContainer: {
    marginTop: 26 * SCALE_HEIGHT,
    paddingHorizontal: 15.5 * SCALE_WIDTH,
  },
  box: {
    width: 159 * SCALE_WIDTH,
    height: 40 * SCALE_HEIGHT,
    backgroundColor: 'rgba(228, 228, 228, 0.25)',
    borderRadius: 8 * SCALE_HEIGHT,
    marginHorizontal: 6.5 * SCALE_WIDTH,
    alignItems: 'center',
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_HEIGHT,
    marginLeft: 31 * SCALE_WIDTH,
  },
  option: {
    fontSize: FS(14),
    marginLeft: 10 * SCALE_WIDTH,
  },
});
