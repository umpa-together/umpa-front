import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/User';
import ProfileImage from 'widgets/ProfileImage';
import TouchableNoDouble from 'components/TouchableNoDouble';
import { navigate, push } from 'lib/utils/navigation';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';
import Text from 'components/Text';

export default function ({ user, action }) {
  const { _id: id, profileImage: img, name } = user;
  const { state } = useContext(UserContext);

  const onClickProfile = () => {
    if (id === state.user._id) {
      navigate('MyAccount');
    } else {
      push('OtherAccount', { id });
    }
  };

  return (
    <View style={[styles.container, style.space_between]}>
      <View style={style.flexRow}>
        <TouchableNoDouble onPress={onClickProfile} activeOpacity={0.9}>
          <ProfileImage img={img} imgStyle={styles.profileImg} />
        </TouchableNoDouble>
        <Text style={styles.name}>{name}</Text>
      </View>
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
