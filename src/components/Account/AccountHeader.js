import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { goBack } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import ProfileBackground from './ProfileBackground';

export default memo(function AccountHeader({ user, back, actions }) {
  const { backgroundImage } = user;
  const onPressBack = () => {
    goBack();
  };
  return (
    <View style={styles.container}>
      <ProfileBackground img={backgroundImage} imgStyle={styles.backgroundImage} />
      <View>
        {back && (
          <TouchableOpacity style={styles.back} onPress={onPressBack}>
            <Icon style={style.icons} source={require('public/icons/account-back.png')} />
          </TouchableOpacity>
        )}
        {actions}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 122 * SCALE_HEIGHT,
    width: '100%',
  },
  back: {
    position: 'absolute',
    bottom: 48 * SCALE_HEIGHT,
    left: 9 * SCALE_WIDTH,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});
