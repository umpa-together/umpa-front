import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { tmpWidth } from 'components/FontNormalize';
import Modal from 'react-native-modal';
import { push } from 'lib/utils/navigation';
import ProfileImage from 'components/ProfileImage';

const StoryViewer = ({ viewerModal, setViewerModal, setStoryModal }) => {
  const { state: userState, getOtheruser } = useContext(UserContext);
  const { getSongs } = useContext(DJContext);

  const onClose = () => {
    setViewerModal(false);
  };

  const onClickPeople = async (item) => {
    setViewerModal(false);
    setStoryModal(false);
    await Promise.all([getOtheruser({ id: item._id }), getSongs({ id: item._id })]);
    if (item._id !== userState.myInfo._id) push('OtherAccount', { otherUserId: item._id });
  };

  return (
    <Modal
      isVisible={viewerModal}
      onBackdropPress={onClose}
      backdropOpacity={0.2}
      style={styles.modalContainer}
    >
      <View style={styles.viewerContainer}>
        <FlatList
          data={userState.storyViewer}
          keyExtractor={(user) => user._id}
          style={styles.viewerBox}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.peopleBox} onPress={() => onClickPeople(item)}>
              <ProfileImage img={item.profileImage} imgStyle={styles.storyProfileImage} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  viewerContainer: {
    height: 352 * tmpWidth,
    borderRadius: 16 * tmpWidth,
    backgroundColor: 'rgb(250,250,250)',
    shadowColor: 'rgb(146, 158, 200)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 60 * tmpWidth,
    shadowOpacity: 0.04,
    width: '100%',
  },
  viewerBox: {
    paddingTop: 18 * tmpWidth,
    paddingLeft: 24 * tmpWidth,
  },
  peopleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18 * tmpWidth,
  },
  storyProfileImage: {
    width: 50 * tmpWidth,
    height: 50 * tmpWidth,
    borderRadius: 50 * tmpWidth,
  },
  name: {
    marginLeft: 12 * tmpWidth,
  },
});

export default StoryViewer;
