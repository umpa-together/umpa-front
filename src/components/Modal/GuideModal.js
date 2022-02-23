import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useModal } from 'providers/modal';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { checkGuide } from 'lib/utils/guideChecker';
import Modal from '.';

const ModalView = ({ onClose }) => {
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
      <TouchableOpacity style={styles.backgroundImg} onPress={onClose}>
        <FastImage
          source={require('public/images/swipe-guide-5.png')}
          style={styles.backgroundImg}
        />
      </TouchableOpacity>,
    ],
    feed: [
      <FastImage source={require('public/images/feed-guide-1.png')} style={styles.backgroundImg} />,
      <FastImage source={require('public/images/feed-guide-2.png')} style={styles.backgroundImg} />,
      <FastImage source={require('public/images/feed-guide-3.png')} style={styles.backgroundImg} />,
      <FastImage source={require('public/images/feed-guide-4.png')} style={styles.backgroundImg} />,
      <TouchableOpacity style={styles.backgroundImg} onPress={onClose}>
        <FastImage
          source={require('public/images/feed-guide-5.png')}
          style={styles.backgroundImg}
        />
      </TouchableOpacity>,
    ],
    playlist: [
      <FastImage
        source={require('public/images/playlist-guide-1.png')}
        style={styles.backgroundImg}
      />,
      <TouchableOpacity style={styles.backgroundImg} onPress={onClose}>
        <FastImage
          source={require('public/images/playlist-guide-2.png')}
          style={styles.backgroundImg}
        />
      </TouchableOpacity>,
    ],
    search: [
      <TouchableOpacity style={styles.backgroundImg} onPress={onClose}>
        <FastImage
          source={require('public/images/search-guide-1.png')}
          style={styles.backgroundImg}
        />
      </TouchableOpacity>,
    ],
  };

  return (
    <>
      {guideModal && (
        <Swiper height="100%" loop={false} activeDotColor="#fff" dotColor="#ffffff40">
          {guideLists[guideModal].map((guide) => {
            return (
              <View key={Math.random()} style={styles.backgroundImg}>
                {guide}
              </View>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default function GuideModal({ modal, setModal }) {
  const { guideModal } = useModal();
  const onBackdropPress = () => {
    setModal(null);
    checkGuide(guideModal);
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
