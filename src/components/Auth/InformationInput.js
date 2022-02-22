import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_3, MAIN_COLOR, COLOR_5 } from 'constants/colors';
import { useSignUp } from 'providers/signUp';
import Text from 'components/Text';

export default function InformationInput() {
  const { validity, information, onChangeValue } = useSignUp();
  const infoLists = [
    { title: '이메일', placeholder: '이메일을 입력해주세요', key: 'email' },
    { title: '비밀번호', placeholder: '비밀번호를 입력해주세요', key: 'password' },
    {
      title: '비밀번호 체크',
      placeholder: '비밀번호를 한번 더 입력해주세요',
      key: 'passwordCheck',
    },
  ];

  const validityLists = {
    email: '※ 이메일을 입력해주세요.',
    password: '※ 6~14자 영문 대소문자, 숫자, 특수문자 모두 조합',
    passwordCheck: '※ 비밀번호가 일치하지 않습니다.',
  };

  return (
    <View>
      {infoLists.map((info) => {
        const { title, key, placeholder } = info;
        return (
          <View
            key={key}
            style={
              key === 'password' && {
                marginTop: validity.email ? 30 * SCALE_HEIGHT : 10 * SCALE_HEIGHT,
              }
            }
          >
            {key !== 'passwordCheck' && (
              <Text style={styles.title}>
                {title}
                <Text style={styles.active}> *</Text>
              </Text>
            )}
            <TextInput
              value={information[key]}
              placeholder={placeholder}
              onChangeText={(text) => onChangeValue(key, text)}
              autoCapitalize="none"
              placeholderTextColor={COLOR_5}
              autoCorrect={false}
              style={styles.textBox}
              secureTextEntry={key !== 'email'}
              maxLength={key !== 'email' ? 14 : null}
              allowFontScaling={false}
            />
            {!validity[key] && <Text style={styles.validity}>{validityLists[key]}</Text>}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(12),
    color: COLOR_3,
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
  validity: {
    fontSize: FS(11),
    color: '#ff2f2f',
    marginTop: 7 * SCALE_HEIGHT,
  },
});
