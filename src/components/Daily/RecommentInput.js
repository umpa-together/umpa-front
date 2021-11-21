import React, { useContext, useRef } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Context as DailyContext } from 'context/DailyContext';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'widgets/ProfileImage';
import { useDaily } from 'providers/daily';

const RecommentInput = () => {
  const { addreComment } = useContext(DailyContext);
  const { state: userState } = useContext(UserContext);
  const { currentComment } = useDaily();
  const { _id: id, dailyId } = currentComment;
  const recommentRef = useRef();

  const onClickAdd = () => {
    Keyboard.dismiss();
    addreComment({ id: dailyId, commentid: id, text: recommentRef.current.value });
    recommentRef.current.value = '';
    recommentRef.current.clear();
  };

  return (
    <View style={styles.container}>
      <ProfileImage img={userState.myInfo.profileImage} imgStyle={styles.profileImg} />
      <TextInput
        style={styles.textInput}
        onChangeText={(input) => {
          recommentRef.current.value = input;
        }}
        placeholder="추가할 답글을 적어주세요."
        placeholderTextColor="rgb(164,164,164)"
        autoCapitalize="none"
        autoCorrect={false}
        ref={recommentRef}
        onSubmitEditing={onClickAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16 * tmpWidth,
    borderBottomWidth: 1 * tmpWidth,
    borderBottomColor: '#8bc0ff',
    paddingLeft: 20 * tmpWidth,
    paddingBottom: 8 * tmpWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: 32 * tmpWidth,
    width: 32 * tmpWidth,
    borderRadius: 32 * tmpWidth,
    marginRight: 14 * tmpWidth,
  },
  textInput: {
    width: '80%',
  },
});

export default RecommentInput;
