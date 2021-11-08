import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import Modal from 'react-native-modal';
import { useChat } from 'providers/chat';
import SearchProvider from 'providers/search';
import SearchInput from 'components/Chat/SearchInput';
import Searchopt from 'components/Chat/Searchopt';
import SearchResult from 'components/Chat/SearchResult';

const SearchSong = ({ socket, chatroom }) => {
  const { searchSongModal, setSearchSongModal } = useChat();

  const onClose = () => {
    setSearchSongModal(false);
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={searchSongModal}
      backdropOpacity={0.4}
      onBackdropPress={onClose}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <View style={styles.modal}>
        <SearchProvider>
          <SearchInput />
          <Searchopt />
          <SearchResult socket={socket} chatroom={chatroom} />
        </SearchProvider>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: 375 * tmpWidth,
    height: 600 * tmpWidth,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18 * tmpWidth,
    borderTopRightRadius: 18 * tmpWidth,
    paddingLeft: 14 * tmpWidth,
    paddingRight: 14 * tmpWidth,
  },
  chatProfile: {
    height: 40 * tmpWidth,
    width: 40 * tmpWidth,
    borderRadius: 40 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  margin: {
    marginTop: 16 * tmpWidth,
  },
  space: {
    justifyContent: 'space-between',
  },
  name: {
    marginLeft: 10 * tmpWidth,
    fontSize: 16 * tmpWidth,
    fontWeight: '500',
  },
  nameArea: {
    width: 240 * tmpWidth,
  },
  textbox: {
    width: 167 * tmpWidth,
    height: 40 * tmpWidth,
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 10 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16 * tmpWidth,
    color: '#ff0000',
  },
  exit: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  boxMargin: {
    marginTop: 20 * tmpWidth,
  },
});

export default SearchSong;
