import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import { SongImage } from 'widgets/SongImage';

export default function SwipeCard({ card }) {
  const { postUserId, song } = card;
  const { name, profileImage } = postUserId;
  const { attributes } = song;
  const { artwork, artistName, name: songName } = attributes;

  return (
    <View style={styles.container}>
      <View style={style.flexRow}>
        <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
        <Text>{name}</Text>
        <Text>님의 추천</Text>
      </View>
      <SongImage url={artwork.url} imgStyle={styles.songImg} />
      <Text>{songName}</Text>
      <Text>{artistName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 350,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  songImg: {
    width: '100%',
    height: 350,
  },
});
