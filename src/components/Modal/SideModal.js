import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SCALE_WIDTH } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import Divider from 'widgets/Divider';
import { useModal } from 'providers/modal';
import Modal from 'components/Modal';
import SideMenu from '../Account/SideMenu';

const SideModalView = () => {
  const { state } = useContext(UserContext);
  const { name } = state.user;
  const emptyfunction = () => {};
  const menuListsTop = [
    {
      title: '담은 곡',
      onClick: emptyfunction,
    },
    {
      title: '담은 플레이리스트',
      onClick: emptyfunction,
    },
  ];
  const menuListsBottom = [
    {
      title: '계정 정보 설정',
      onClick: emptyfunction,
    },
    {
      title: '알림 설정',
      onClick: emptyfunction,
    },
    {
      title: '공지 사항',
      onClick: emptyfunction,
    },
    {
      title: '서비스 이용약관',
      onClick: emptyfunction,
    },
    {
      title: '개인정보 처리방침',
      onClick: emptyfunction,
    },
    {
      title: '피드맥 건의사항',
      onClick: emptyfunction,
    },
  ];

  return (
    <View style={[styles.modal, { marginTop: 100 }]}>
      <Text>{name}</Text>
      <TouchableOpacity>
        <Text>프로필 편집</Text>
      </TouchableOpacity>
      {menuListsTop.map((item) => {
        return <SideMenu key={item.title} title={item.title} onClick={item.onClick} />;
      })}
      <Divider />
      {menuListsBottom.map((item) => {
        return <SideMenu key={item.title} title={item.title} onClick={item.onClick} />;
      })}
      <TouchableOpacity>
        <Text>회원탈퇴</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function SideModal() {
  const { sideModal, onCloseSideModal } = useModal();

  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={sideModal}
      onBackdropPress={onCloseSideModal} // Android back press
      onSwipeComplete={onCloseSideModal} // Swipe to discard
      animationIn="slideInRight" // Has others, we want slide in from the left
      animationOut="slideOutRight" // When discarding the drawer
      swipeDirection="right" // Discard the drawer with swipe to left
      useNativeDriver // Faster animation
      hideModalContentWhileAnimating // Better performance, try with/without
      propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
      style={styles.container} // Needs to contain the width, 75% of screen width in our case
    >
      <SideModalView />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  modal: {
    position: 'absolute',
    right: 0,
    width: 280 * SCALE_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
  },
});
