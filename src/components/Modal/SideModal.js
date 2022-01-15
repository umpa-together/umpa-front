import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import Divider from 'widgets/Divider';
import Modal from 'components/Modal';
import { navigate } from 'lib/utils/navigation';
import ModalInfo from 'components/Account/ModalInfo';
import SideMenu from 'components/Account/SideMenu';
import ModalSign from 'components/Account/ModalSign';

const SideModalView = ({ onCloseModal }) => {
  const { state } = useContext(UserContext);

  const { name, profileImage } = state.user;
  const emptyfunction = () => {};

  const onClickAddedSong = () => {
    navigate('Added', { type: 'Song' });
    onCloseModal();
  };

  const onClickAddedPlaylist = () => {
    navigate('Added', { type: 'Playlist' });
    onCloseModal();
  };

  const menuListsTop = [
    {
      title: '저장한 곡',
      onClick: onClickAddedSong,
    },
    {
      title: '저장한 플레이리스트',
      onClick: onClickAddedPlaylist,
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
    <View style={[styles.modal, styles.modalContainer]}>
      <ModalInfo name={name} profileImage={profileImage} onCloseModal={onCloseModal} />
      <View style={styles.divideContainer}>
        {menuListsTop.map((item) => {
          const { title, onClick } = item;
          return <SideMenu key={title} title={title} onClick={onClick} />;
        })}
      </View>
      <Divider />
      <View style={styles.divideContainer}>
        {menuListsBottom.map((item) => {
          const { title, onClick } = item;
          return <SideMenu key={title} title={title} onClick={onClick} />;
        })}
      </View>
      <ModalSign />
    </View>
  );
};

export default function SideModal({ modal, setModal }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };

  return (
    <Modal
      isVisible={modal}
      onBackdropPress={onBackdropPress} // Android back press
      onSwipeComplete={onBackdropPress} // Swipe to discard
      animationIn="slideInRight" // Has others, we want slide in from the left
      animationOut="slideOutRight" // When discarding the drawer
      swipeDirection="right" // Discard the drawer with swipe to left
      propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
      style={styles.container} // Needs to contain the width, 75% of screen width in our case
    >
      <SideModalView onCloseModal={onBackdropPress} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  modalContainer: {
    paddingTop: 59 * SCALE_HEIGHT,
  },
  modal: {
    position: 'absolute',
    right: 0,
    width: 264 * SCALE_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
  },
  divideContainer: {
    marginTop: 29 * SCALE_HEIGHT,
  },
});
