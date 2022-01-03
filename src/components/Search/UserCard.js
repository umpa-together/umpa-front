import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';

export default function UserCard({ user }) {
  const { _id: id, genre, name, songs, profileImage } = user;

  return (
    <TouchableOpacity style={styles.container}>
      <ProfileImage img={profileImage} imgStyle={styles.img} />
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
