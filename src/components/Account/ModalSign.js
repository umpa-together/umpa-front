import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { Context as AuthContext } from 'context/Auth';

export default function ModalSign() {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={[styles.container, style.flexRow]}>
      <TouchableOpacity>
        <Text style={styles.text}>회원탈퇴</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.text}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 36 * SCALE_HEIGHT,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#A6A6A6',
    fontSize: FS(12),
  },
});
