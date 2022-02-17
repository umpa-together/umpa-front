import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLOR_1 } from 'constants/colors';
import FS from 'lib/utils/normalize';
import style from 'constants/styles';
import Header from 'components/Header';
import LogoGreeting from 'components/Auth/LogoGreeting';
import LoginInput from 'components/Auth/LoginInput';
import SocialLogin from 'components/Auth/SocialLogin';
import LoginSignUp from 'components/Auth/LoginSignUp';

export default function SignIn() {
  return (
    <View style={[style.background, styles.container]}>
      <Header title="로그인" titleStyle={styles.header} />
      <LogoGreeting />
      <LoginInput />
      <SocialLogin />
      <LoginSignUp />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: COLOR_1,
    fontSize: FS(18),
  },
  container: {
    alignItems: 'center',
  },
});
