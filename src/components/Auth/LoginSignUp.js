import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MAIN_COLOR, COLOR_5 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { navigate } from 'lib/utils/navigation';

export default function LoginSignUp() {
  const onPress = () => {
    navigate('SignUp', { data: { email: '', password: '', social: false } });
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.normal}>
        아직 회원이 아닌가요? <Text style={styles.highlight}>회원가입</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 56.5 * SCALE_HEIGHT,
  },
  normal: {
    fontSize: FS(12),
    color: COLOR_5,
  },
  highlight: {
    color: MAIN_COLOR,
    marginLeft: 5 * SCALE_WIDTH,
  },
});
