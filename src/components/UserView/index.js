/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import { push } from 'lib/utils/navigation';
import { COLOR_1 } from 'constants/colors';
import FollowButton from 'components/FollowButton';
import UserRepresentSong from 'components/UserRepresentSong';

export default function UserView({ user }) {
  const { name, profileImage, _id: id, songs } = user;
  const { getOtherInformation } = useContext(UserContext);
  const onClickAccount = async () => {
    await getOtherInformation({ id });
    push('OtherAccount', { id });
  };
  return (
    <TouchableOpacity onPress={onClickAccount} style={[styles.container, style.flexRow]}>
      <ProfileImage img={profileImage} imgStyle={styles.img} />
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <UserRepresentSong song={songs[0]} />
      </View>
      <FollowButton id={id} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 26 * SCALE_HEIGHT,
    height: 56 * SCALE_WIDTH,
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  img: {
    width: 56 * SCALE_WIDTH,
    height: 56 * SCALE_WIDTH,
    borderRadius: 56 * SCALE_HEIGHT,
  },
  infoContainer: {
    marginLeft: 16 * SCALE_WIDTH,
    width: 202 * SCALE_WIDTH,
    marginRight: 10 * SCALE_WIDTH,
  },
  nameText: {
    fontSize: FS(14),
    color: COLOR_1,
    marginBottom: 5 * SCALE_HEIGHT,
  },
});
