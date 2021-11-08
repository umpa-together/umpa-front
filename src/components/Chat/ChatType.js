import React, { useContext } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import Hyperlink from 'react-native-hyperlink';
import { SongImage } from 'components/SongImage';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import SvgUri from 'react-native-svg-uri';

const TextType = ({ sender, text }) => {
  const { state: userState } = useContext(UserContext);
  const isMyText = sender === userState.myInfo._id;
  const onClickUrl = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={isMyText ? styles.myContainer : styles.yourContainer}>
      <View style={[styles.textBox, isMyText ? styles.me : styles.you]}>
        <Hyperlink linkStyle={styles.link} onPress={(url) => onClickUrl(url)}>
          <Text style={[styles.text, isMyText && { color: 'white' }]}>{text}</Text>
        </Hyperlink>
      </View>
    </View>
  );
};

export const SongType = ({ sender, song }) => {
  const { isPlayingId, addtracksong, stoptracksong } = useTrackPlayer();
  // eslint-disable-next-line no-shadow
  const onClickCover = (song) => {
    if (isPlayingId === song.id) {
      stoptracksong();
    } else {
      addtracksong({ data: song });
    }
  };

  const { state: userState } = useContext(UserContext);
  const isMyText = sender === userState.myInfo._id;
  return (
    <View style={isMyText ? styles.myContainer : styles.yourContainer}>
      <View style={styles.image}>
        <TouchableOpacity
          onPress={() => {
            onClickCover(song);
          }}
        >
          <SongImage size={200} border={0} url={song.attributes.artwork.url} />
          <SvgUri
            width="30"
            height="30"
            source={
              isPlayingId !== song.id
                ? require('assets/icons/modalPlay.svg')
                : require('assets/icons/modalStop.svg')
            }
            style={styles.playIcon}
          />
        </TouchableOpacity>
        <MoveText
          container={
            song.attributes.contentRating === 'explicit' ? styles.explicitName : styles.nameBox
          }
          text={song.attributes.name}
          isMove={song.id === isPlayingId}
          isExplicit={song.attributes.contentRating === 'explicit'}
          textStyles={styles.name}
        />
        <MoveText
          container={styles.artistBox}
          text={song.attributes.artistName}
          isMove={song.id === isPlayingId}
          isExplicit={false}
          textStyles={styles.artist}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myContainer: {
    alignItems: 'flex-end',
    marginRight: 10 * tmpWidth,
  },
  yourContainer: {
    alignItems: 'flex-start',
    marginLeft: 10 * tmpWidth,
  },
  textBox: {
    marginBottom: 6 * tmpWidth,
    maxWidth: 280 * tmpWidth,
    paddingVertical: 11 * tmpWidth,
    paddingHorizontal: 18 * tmpWidth,
    borderRadius: 10 * tmpWidth,
  },
  me: {
    backgroundColor: '#8bc0ff',
  },
  you: {
    borderWidth: 1 * tmpWidth,
    borderColor: '#8bc0ff',
  },
  text: {
    fontSize: 16 * tmpWidth,
    lineHeight: 20 * tmpWidth,
  },
  link: {
    fontSize: 14 * tmpWidth,
    lineHeight: 20 * tmpWidth,
    fontWeight: '400',
    color: '#2980b9',
  },
  image: {
    width: 200 * tmpWidth,
    height: 250 * tmpWidth,
  },
  imageitem: {
    width: '100%',
    height: '100%',
  },
  nameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9 * tmpWidth,
    width: 200 * tmpWidth,
  },
  explicitName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9 * tmpWidth,
    width: 178 * tmpWidth,
  },
  artistBox: {
    width: 200 * tmpWidth,
  },
  name: {
    fontSize: 14 * tmpWidth,
    lineHeight: 16 * tmpWidth,
  },
  artist: {
    fontSize: 13 * tmpWidth,
    color: '#838383',
    marginTop: 4 * tmpWidth,
  },
  playIcon: {
    position: 'absolute',
    right: 6 * tmpWidth,
    bottom: 6 * tmpWidth,
  },
});

export default TextType;
