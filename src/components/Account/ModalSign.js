import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';
import { Context as AuthContext } from 'context/Auth';
import Text from 'components/Text';
import { navigate } from 'lib/utils/navigation';
import { Context as NoticeContext } from 'context/Notice';

export default function ModalSign({ onCloseModal }) {
  const { signOut } = useContext(AuthContext);
  const { deleteNoticeToken } = useContext(NoticeContext);

  const onClickWithDrawal = () => {
    onCloseModal();
    navigate('Side', { type: 'WithDrawal' });
  };
  const onClickSignOut = async () => {
    await deleteNoticeToken();
    signOut();
  };

  return (
    <View style={[styles.container, style.flexRow]}>
      <TouchableOpacity onPress={onClickWithDrawal} style={styles.touchableArea}>
        <Text style={styles.text}>회원탈퇴</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClickSignOut} style={styles.touchableArea}>
        <Text style={styles.text}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 36 * SCALE_HEIGHT,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#A6A6A6',
    fontSize: FS(12),
  },
  touchableArea: {
    padding: 10 * SCALE_WIDTH,
  },
});
