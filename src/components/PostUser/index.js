import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/User';
import ProfileImage from 'widgets/ProfileImage';
import { navigate } from 'lib/utils/navigation';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';

export default function ({ user, action }) {
  const { _id: id, profileImage: img, name } = user;
  const { state, getOtherInformation } = useContext(UserContext);

  const onClickProfile = async () => {
    if (id === state.user._id) {
      navigate('Account');
    } else {
      await getOtherInformation({ id });
      navigate('OtherAccount', { id });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClickProfile} activeOpacity={0.9}>
        <ProfileImage img={img} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10 * SCALE_HEIGHT,
    paddingLeft: 16 * SCALE_WIDTH,
  },
  profileImg: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    borderRadius: 40 * SCALE_HEIGHT,
    marginRight: 8 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(14),
    fontWeight: '500',
  },
});
