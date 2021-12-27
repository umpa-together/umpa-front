import React, { useContext, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as DailyContext } from 'context/DailyContext';
import ProfileImage from 'widgets/ProfileImage';
import { tmpWidth } from 'components/FontNormalize';
import { useFocusEffect } from '@react-navigation/native';

const CommnetBar = ({ dailyId }) => {
  const { state: userState } = useContext(UserContext);
  const { addComment } = useContext(DailyContext);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const commentRef = useRef();

  const onKeyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  const addEventListener = () => {
    Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
  };

  const removeEventListener = () => {
    Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
    Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
  };

  const onClickAdd = () => {
    Keyboard.dismiss();
    setKeyboardHeight(0);
    addComment({ id: dailyId, text: commentRef.current.value });
    commentRef.current.value = '';
    commentRef.current.clear();
  };

  useFocusEffect(
    useCallback(() => {
      addEventListener();
      return () => removeEventListener();
    }, []),
  );

  return (
    <View style={{ marginBottom: keyboardHeight }}>
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <ProfileImage img={userState.myInfo.profileImage} imgStyle={styles.commentProfile} />
          <TextInput
            style={styles.textInput}
            onChangeText={(input) => {
              commentRef.current.value = input;
            }}
            placeholder="코멘트를 남겨주세요"
            placeholderTextColor="rgb(164,164,164)"
            autoCapitalize="none"
            autoCorrect={false}
            ref={commentRef}
            multiline
          />
        </View>
        <TouchableOpacity onPress={onClickAdd}>
          <Text style={styles.addText}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 18 * tmpWidth,
    paddingBottom: 18 * tmpWidth,
    backgroundColor: 'rgb(255,255,255)',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      height: -1 * tmpWidth,
      width: 0,
    },
    shadowRadius: 10 * tmpWidth,
    shadowOpacity: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20 * tmpWidth,
    paddingRight: 20 * tmpWidth,
    justifyContent: 'space-between',
  },
  commentProfile: {
    height: 32 * tmpWidth,
    width: 32 * tmpWidth,
    borderRadius: 32 * tmpWidth,
    marginRight: 14 * tmpWidth,
  },
  textInput: {
    width: '80%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addText: {
    fontSize: 16 * tmpWidth,
    color: 'rgb(69,67,80)',
  },
});

export default CommnetBar;
