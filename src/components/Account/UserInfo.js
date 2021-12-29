import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import ProfileImage from 'widgets/ProfileImage';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function UserInfo({ info }) {
  const { songs, name, introduction, genre, profileimage } = info;
  return (
    <View style={[styles.container, style.alignCenter]}>
      <View style={[styles.representBox, style.flexRow]}>
        <Text>{songs[0].attributes.name}</Text>
        <Text>{` ${songs[0].attributes.artistName}`}</Text>
      </View>
      <ProfileImage img={profileimage} imgStyle={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>
      {genre !== undefined && (
        <>
          <Text style={styles.smallText}>{genre}</Text>
        </>
      )}
      {introduction !== undefined && (
        <>
          <Text style={styles.smallText}>{introduction}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    widht: 375 * SCALE_WIDTH,
    height: 313 * SCALE_HEIGHT,
    borderWidth: 1,
  },
  representBox: {
    borderWidth: 1 * SCALE_WIDTH,
    paddingHorizontal: 12 * SCALE_WIDTH,
    borderRadius: 43 * SCALE_HEIGHT,
  },
  profileImage: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    borderRadius: 90 * SCALE_WIDTH,
    marginTop: 12 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
  },
  name: {
    marginTop: 12 * SCALE_HEIGHT,
  },
  smallText: {
    marginTop: 12 * SCALE_HEIGHT,
  },
});
