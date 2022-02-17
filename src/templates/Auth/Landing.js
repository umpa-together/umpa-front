import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from 'context/Auth';
import Header from 'components/Header';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1, MAIN_COLOR } from 'constants/colors';
import Text from 'components/Text';

export default function Landing() {
  const { tryLocalSignIn } = useContext(AuthContext);

  const onClickStart = async () => {
    tryLocalSignIn();
  };

  return (
    <View style={style.background}>
      <Header title="가입완료" titleStyle={styles.title} />
      <View style={styles.container}>
        <Icon source={require('public/icons/landing-icon.png')} style={styles.icon} />
        <Text style={styles.introduction}>회원가입 완료</Text>
        <Text style={styles.introduction}>음파에서 음악으로 놀아봐요!</Text>
      </View>
      <TouchableOpacity style={styles.box} onPress={onClickStart}>
        <Text style={styles.start}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLOR_1,
    fontSize: FS(18),
  },
  icon: {
    width: 72 * SCALE_WIDTH,
    height: 72 * SCALE_WIDTH,
    marginTop: 193 * SCALE_HEIGHT,
    marginBottom: 12 * SCALE_HEIGHT,
  },
  introduction: {
    color: COLOR_1,
    fontSize: FS(18),
    marginTop: 4 * SCALE_HEIGHT,
  },
  box: {
    position: 'absolute',
    bottom: 53 * SCALE_HEIGHT,
    left: 16 * SCALE_WIDTH,
    width: 343 * SCALE_WIDTH,
    height: 49 * SCALE_HEIGHT,
    borderRadius: 20 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: {
    fontSize: FS(16),
    color: '#fff',
  },
});
