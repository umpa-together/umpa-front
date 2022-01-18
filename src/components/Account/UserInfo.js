import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

import TrackPlayerProvider from 'providers/trackPlayer';
import UserName from './UserName';
import UserGenre from './UserGenre';
import UserIntroduction from './UserIntroduction';

export default function UserInfo({ myaccount, user }) {
  const { songs, name, introduction, genre, _id: id } = user;

  return (
    <View style={[styles.container]}>
      <UserName id={id} myaccount={myaccount} name={name} />
      <UserGenre genre={genre} />
      <TrackPlayerProvider>
        <UserIntroduction introduction={introduction} song={songs[0]} id={id} />
      </TrackPlayerProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    widht: '100%',
    marginBottom: 20 * SCALE_HEIGHT,
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
});
