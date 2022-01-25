import React, { useContext, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Context as UserContext } from 'context/User';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { useKeyboard } from 'providers/keyboard';
import { useComment } from 'providers/comment';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function () {
  const {
    state: {
      user: { profileImage },
    },
  } = useContext(UserContext);
  const { keyboardStyle, onKeyboardDidShow, onKeyboardDidHide, keyboardShowOpt, keyboardHideOpt } =
    useKeyboard();
  const { commentRef, commentAction } = useComment();
  const setCommentRef = (text) => {
    commentRef.current.value = text;
  };
  const onPressSubmit = () => {
    commentAction(commentRef.current.value);
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
      <TouchableOpacity style={styles.submitButton} onPress={onPressSubmit}>
        <Text style={styles.submitText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 68 * SCALE_HEIGHT,
    paddingHorizontal: 13 * SCALE_WIDTH,
    shadowColor: '#000',
    shadowOffset: {
      height: -1 * SCALE_WIDTH,
      width: 0,
    },
    backgroundColor: '#fff',
    shadowRadius: 10 * SCALE_WIDTH,
    shadowOpacity: 0.1,
  },
  profileImage: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    borderRadius: 32 * SCALE_HEIGHT,
  },
  textInput: {
    marginLeft: 18 * SCALE_WIDTH,
    width: 257 * SCALE_WIDTH,
  },
  submitButton: {
    width: 45 * SCALE_WIDTH,
    height: 32 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: FS(16),
  },
});
