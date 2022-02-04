import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import ProfileImage from 'widgets/ProfileImage';
import { navigate } from 'lib/utils/navigation';
import { COLOR_3 } from 'constants/colors';
import Icon from 'widgets/Icon';

export default function ModalInfo({ name, profileImage, onCloseModal }) {
  const onClickProfileEdit = () => {
    navigate('ProfileEdit');
    onCloseModal();
  };

  return (
    <View style={[styles.container, style.flexRow]}>
      <ProfileImage img={profileImage} imgStyle={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <TouchableOpacity style={[style.flexRow]} onPress={onClickProfileEdit}>
          <Text style={styles.buttonText}>프로필 편집</Text>
          <Icon source={require('public/icons/hamburger-next.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 26 * SCALE_WIDTH,
    paddingRight: 9 * SCALE_WIDTH,
  },
  infoContainer: {
    marginLeft: 9 * SCALE_WIDTH,
  },
  profileImage: {
    width: 56 * SCALE_WIDTH,
    height: 56 * SCALE_WIDTH,
    borderRadius: 56 * SCALE_HEIGHT,
  },
  icon: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
  },
  nameText: {
    fontSize: FS(14),
  },
  buttonText: {
    fontSize: FS(12),
    marginRight: 85 * SCALE_WIDTH,
    color: COLOR_3,
  },
});
