import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Header from 'components/Header';
import { COLOR_1, MAIN_COLOR } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import Terms from 'components/Auth/Terms';
import { useSignUp } from 'providers/signUp';
import InformationInput from 'components/Auth/InformationInput';

export default function SignUp({ data }) {
  const { information, onClickComplete, onInitialize } = useSignUp();
  const [isComplete, setIsComplete] = useState(false);
  const { social } = data;

  useEffect(() => {
    onInitialize(data);
  }, []);
  useEffect(() => {
    setIsComplete(
      information.allTerm &&
        information.email.length > 0 &&
        information.password.length > 0 &&
        information.passwordCheck.length > 0,
    );
  }, [information]);
  return (
    <View style={[styles.container, style.background]}>
      <Header title="회원가입" back titleStyle={styles.header} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {!social && <InformationInput />}
        <View>
          <Terms />
          <TouchableOpacity
            style={[styles.completeBox, isComplete && styles.active]}
            onPress={() => onClickComplete(social)}
            activeOpacity={0.8}
          >
            <Text style={styles.complete}>완료</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: COLOR_1,
    fontSize: FS(18),
  },
  container: {
    paddingLeft: 16 * SCALE_WIDTH,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  completeBox: {
    width: 343 * SCALE_WIDTH,
    height: 49 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    borderRadius: 20 * SCALE_HEIGHT,
    marginTop: 20 * SCALE_HEIGHT,
    marginBottom: 53 * SCALE_HEIGHT,
  },
  complete: {
    fontSize: FS(16),
    color: '#fff',
  },
  active: {
    backgroundColor: MAIN_COLOR,
  },
});
