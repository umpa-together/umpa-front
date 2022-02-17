import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/User';
import { useModal } from 'providers/modal';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import Modal from '.';

const ModalView = ({ onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { guideModal } = useModal();

  const guideLists = {
    swipe: [
      <FastImage
        source={require('public/images/swipe-guide-1.png')}
        style={styles.backgroundImg}
      />,
      <FastImage
        source={require('public/images/swipe-guide-2.png')}
        style={styles.backgroundImg}
      />,
      <FastImage
        source={require('public/images/swipe-guide-3.png')}
        style={styles.backgroundImg}
      />,
      <FastImage
        source={require('public/images/swipe-guide-4.png')}
        style={styles.backgroundImg}
      />,
      <FastImage
        source={require('public/images/swipe-guide-5.png')}
        style={styles.backgroundImg}
      />,
    ],
    feed: [
      <FastImage source={require('public/images/feed-guide-1.png')} style={styles.backgroundImg} />,
      <FastImage source={require('public/images/feed-guide-2.png')} style={styles.backgroundImg} />,
      <FastImage source={require('public/images/feed-guide-3.png')} style={styles.backgroundImg} />,
      <FastImage source={require('public/images/feed-guide-4.png')} style={styles.backgroundImg} />,
      <FastImage source={require('public/images/feed-guide-5.png')} style={styles.backgroundImg} />,
    ],
    playlist: [
      <FastImage
        source={require('public/images/playlist-guide-1.png')}
        style={styles.backgroundImg}
      />,
      <FastImage
        source={require('public/images/playlist-guide-2.png')}
        style={styles.backgroundImg}
      />,
    ],
    search: [
      <FastImage
        source={require('public/images/search-guide-1.png')}
        style={styles.backgroundImg}
      />,
    ],
  };

  const onClickNext = () => {
    if (currentIdx < guideLists[guideModal].length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onClose();
    }
  };

  return (
    <TouchableOpacity style={styles.viewContainer} activeOpacity={1} onPress={onClickNext}>
      {guideModal && guideLists[guideModal][currentIdx]}
    </TouchableOpacity>
  );
};

export default function GuideModal({ modal, setModal }) {
  const { checkGuide } = useContext(UserContext);
  const { guideModal } = useModal();
  const onBackdropPress = () => {
    checkGuide({ type: guideModal });
    setModal(null);
  };
  return (
    <Modal isVisible={modal} onBackdropPress={onBackdropPress} style={styles.container}>
      <ModalView onClose={onBackdropPress} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  viewContainer: {
    width: '100%',
    height: '100%',
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
