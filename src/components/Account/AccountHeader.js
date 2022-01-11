import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { MAIN_COLOR } from 'constants/colors';
import { useModal } from 'providers/modal';
import { goBack } from 'lib/utils/navigation';

export default function AccountHeader({ back, hamburger }) {
  const { setSideModal } = useModal();
  const onPressMenu = () => {
    setSideModal(true);
  };
  const onPressBack = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.menuContainer, style.flexRow]}>
        {back && (
          <TouchableOpacity style={styles.back} onPress={onPressBack}>
            <View style={[styles.borderWidth, style.icons]} />
          </TouchableOpacity>
        )}
        {hamburger && (
          <TouchableOpacity style={styles.hamburger} onPress={onPressMenu}>
            <View style={[styles.borderWidth, style.icons]} />
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
    backgroundColor: MAIN_COLOR,
  },
  menuContainer: {
    marginTop: 60 * SCALE_HEIGHT,
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
});
