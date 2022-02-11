import { StyleSheet, TextInput, View } from 'react-native';
import React, { useRef, useContext } from 'react';
import { COLOR_5, COLOR_3, MAIN_COLOR } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import TouchableNoDouble from 'components/TouchableNoDouble';
import { Context as AuthContext } from 'context/Auth';
import Text from 'components/Text';

export default function LoginInput() {
  const email = useRef();
  const password = useRef();
  const {
    state: { errorMessage },
    signIn,
  } = useContext(AuthContext);

  const infoLists = [
    { title: '이메일', placeholder: '이메일을 입력해주세요', key: 'email' },
    { title: '비밀번호', placeholder: '비밀번호를 입력해주세요', key: 'password' },
  ];

  const onChangeValue = (txt, key) => {
    if (key === 'email') {
      email.current.value = txt;
    } else {
      password.current.value = txt;
    }
  };

  const onPressLogin = () => {
    signIn({ email: email.current.value, password: password.current.value });
  };
  return (
    <View>
      {infoLists.map((info) => {
        const { title, key, placeholder } = info;
        return (
          <View key={key}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
              ref={key === 'email' ? email : password}
              placeholder={placeholder}
              autoCapitalize="none"
              placeholderTextColor={COLOR_5}
              onChangeText={(txt) => {
                onChangeValue(txt, key);
              }}
              returnKeyType="done"
              autoCorrect={false}
              style={styles.textBox}
              secureTextEntry={key !== 'email'}
              maxLength={key !== 'email' ? 14 : null}
            />
          </View>
        );
      })}
      <Text style={styles.errorText}>{errorMessage}</Text>
      <TouchableNoDouble onPress={onPressLogin} style={styles.loginBox}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableNoDouble>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(12),
    color: COLOR_3,
    marginTop: 18 * SCALE_HEIGHT,
  },
  active: {
    color: MAIN_COLOR,
  },
  textBox: {
    paddingVertical: 12 * SCALE_HEIGHT,
    width: 343 * SCALE_WIDTH,
    borderWidth: 1 * SCALE_HEIGHT,
    borderColor: '#dbdbdb',
    borderRadius: 6 * SCALE_HEIGHT,
    paddingHorizontal: 12 * SCALE_WIDTH,
    marginTop: 10 * SCALE_HEIGHT,
  },
  loginBox: {
    marginTop: 8.5 * SCALE_HEIGHT,
    width: 343 * SCALE_WIDTH,
    backgroundColor: MAIN_COLOR,
    borderRadius: 20 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    marginVertical: 15 * SCALE_HEIGHT,
    fontSize: FS(16),
    color: '#fff',
  },
  errorText: {
    marginTop: 8.5 * SCALE_HEIGHT,
    fontSize: FS(11),
    color: '#FF2F2F',
  },
});
