import React, { useContext, useRef, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Context as UserContext } from 'context/User';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { useKeyboard } from 'providers/keyboard';

export default function ({ targetId, action }) {
  const { state } = useContext(UserContext);
  const { profileImage } = state.user;

  const { keyboardStyle, onKeyboardDidShow, onKeyboardDidHide, keyboardShowOpt, keyboardHideOpt } =
    useKeyboard();
  const commentRef = useRef();

  const setCommentRef = (text) => {
    commentRef.current.value = text;
  };
  const onPressSubmit = () => {
    action({ id: targetId, text: commentRef.current.value });
    commentRef.current.clear();
  };

  useFocusEffect(
    useCallback(() => {
      const showSubscription = Keyboard.addListener(keyboardShowOpt, onKeyboardDidShow);
      const hideSubscription = Keyboard.addListener(keyboardHideOpt, onKeyboardDidHide);

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []),
  );

  return (
    <View style={[keyboardStyle, style.flexRow, styles.container]}>
      <ProfileImage img={profileImage} imgStyle={styles.profileImage} />
      <TextInput
        style={styles.textInput}
        onChangeText={(txt) => {
          setCommentRef(txt);
        }}
        placeholder="코멘트를 남겨주세요"
        autoCorrect={false}
        ref={commentRef}
        multiline
      />
      <TouchableOpacity onPress={onPressSubmit}>
        <Text>등록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderWidth: 1,
  },
  textInput: {
    width: '80%',
  },
});
