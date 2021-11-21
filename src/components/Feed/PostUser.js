import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import ProfileImage from 'components/ProfileImage';
import { tmpWidth } from 'components/FontNormalize';
import { navigate, push } from 'lib/utils/navigation';

const PostUser = ({ user }) => {
  const { state, getOtheruser } = useContext(UserContext);
  const { getSongs } = useContext(DJContext);
  const { _id: id, profileImage: img, name } = user;

  const onClickProfile = async () => {
    if (id === state.myInfo._id) {
      navigate('Account');
    } else {
      await Promise.all([getOtheruser({ id }), getSongs({ id })]);
      push('OtherAccount', { otherUserId: id });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={img} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9 * tmpWidth,
    paddingLeft: 18 * tmpWidth,
  },
  profileImg: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    borderRadius: 40 * tmpWidth,
    marginRight: 11 * tmpWidth,
  },
  name: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
  },
});

export default PostUser;
