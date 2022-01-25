import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { goBack } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import ProfileBackground from './ProfileBackground';

export default function AccountHeader({ user, back, hamburger }) {
  const { backgroundImage } = user;
  const onPressBack = () => {
    goBack();
  };
  return (
    <View style={styles.container}>
      <ProfileBackground img={backgroundImage} imgStyle={styles.backgroundImage} />
      <View style={[styles.menuContainer, style.flexRow]}>
        {back && (
          <TouchableOpacity style={styles.back} onPress={onPressBack}>
            <View style={[styles.borderWidth, style.icons]} />
          </TouchableOpacity>
        )}
        {hamburger && (
          <TouchableOpacity style={styles.hamburger} onPress={hamburger}>
            <Icon style={style.icons} source={require('public/icons/account-hamburger.png')} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 122 * SCALE_HEIGHT,
    width: '100%',
  },
  menuContainer: {
    bottom: 54 * SCALE_HEIGHT,
  },
  back: {
    position: 'absolute',
    left: 9 * SCALE_WIDTH,
  },
  hamburger: {
    position: 'absolute',
    right: 9 * SCALE_WIDTH,
  },
  borderWidth: {
    borderWidth: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});
