import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import { navigate, push } from 'lib/utils/navigation';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';

export default function PostUser({ user }) {
  const { _id: id, profileImage: img, name } = user;

  const onClickProfile = async () => {
    // if (id === state.myInfo._id) {
    //  navigate('Account');
    // } else {
    //  await Promise.all([getOtheruser({ id }), getSongs({ id })]);
    //  push('OtherAccount', { otherUserId: id });
    // }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={img} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9 * SCALE_HEIGHT,
    paddingLeft: 18 * SCALE_WIDTH,
  },
  profileImg: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    borderRadius: 40 * SCALE_HEIGHT,
    marginRight: 11 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(14),
    fontWeight: '400',
  },
});
