/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import TouchableNoDouble from 'components/TouchableNoDouble';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import { push } from 'lib/utils/navigation';
import { COLOR_1 } from 'constants/colors';
import FollowButton from 'components/FollowButton';
import UserRepresentSong from 'components/UserRepresentSong';

export default function UserView({ user, func }) {
  const { name, profileImage, _id: id, songs } = user;
  const { getOtherInformation } = useContext(UserContext);
  const onClickAccount = async () => {
    if (func) func();
    await getOtherInformation({ id });
    push('OtherAccount', { id });
  };
  return (
    <View style={[styles.container, style.flexRow]}>
      <TouchableNoDouble onPress={onClickAccount}>
        <ProfileImage img={profileImage} imgStyle={styles.img} />
      </TouchableNoDouble>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <UserRepresentSong song={songs[0]} />
      </View>
      <FollowButton id={id} />
    </View>
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
