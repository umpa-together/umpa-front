import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Context as StoryContext } from 'context/Story';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import UserView from 'components/UserView';
import Modal from '.';

const ModalView = ({ onClose }) => {
  const {
    state: { storyViewer },
  } = useContext(StoryContext);

  const onClickProfile = () => {
    onClose();
  };

  const keyExtractor = useCallback((_) => _._id, []);
  const renderItem = useCallback(({ item }) => <UserView user={item} func={onClickProfile} />, []);
  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={storyViewer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        maxToRenderPerBatch={5}
        windowSize={5}
        contentContainerStyle={styles.padding}
      />
    </View>
  );
};

export default function StoryViewerModal({ modal, setModal, onClose }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };

  const onCloseStory = () => {
    onClose();
    setModal(false);
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={modal}
      onBackdropPress={onBackdropPress}
      style={styles.container}
    >
      <ModalView onClose={onCloseStory} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  viewContainer: {
    width: '100%',
    height: 400 * SCALE_HEIGHT,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 28 * SCALE_HEIGHT,
    paddingTop: 21 * SCALE_HEIGHT,
  },
  padding: {
    paddingTop: 20 * SCALE_HEIGHT,
  },
});
