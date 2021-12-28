import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import style from 'constants/styles';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function UserInfo({ songs, name, introduction, genre, profileimage }) {
  return (
    <View style={[styles.container, style.alignCenter]}>
      <View style={[styles.representbox, style.flexRow]}>
        <Text>{songs[0].attributes.name}</Text>
        <Text>{` ${songs[0].attributes.artistName}`}</Text>
      </View>
      <ProfileImage img={profileimage} imgStyle={styles.profileimage} />
      <Text style={styles.name}>{name}</Text>
      {genre !== undefined && (
        <>
          <Text style={styles.smalltext}>{genre}</Text>
        </>
      )}
      {introduction !== undefined && (
        <>
          <Text style={styles.smalltext}>{introduction}</Text>
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
  representbox: {
    borderWidth: 1 * SCALE_WIDTH,
    paddingHorizontal: 12 * SCALE_WIDTH,
    borderRadius: 43 * SCALE_HEIGHT,
  },
  profileimage: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    borderRadius: 90 * SCALE_WIDTH,
    marginTop: 12 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
  },
  name: {
    marginTop: 12 * SCALE_HEIGHT,
  },
  smalltext: {
    marginTop: 12 * SCALE_HEIGHT,
  },
});
