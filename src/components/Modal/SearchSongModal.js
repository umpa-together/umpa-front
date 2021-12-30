import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useModal } from 'providers/modal';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import Header from 'components/SearchSong/Header';
import SearchBar from 'components/SearchSong/SearchBar';
import SearchProvider, { useSearch } from 'providers/search';
import AddedSongLists from 'components/SearchSong/AddedSongLists';
import { Provider as AddedProvider } from 'context/Added';
import SearchLists from 'components/SearchSong/SearchLists';
import Modal from '.';

const Exit = () => {
  return <Text>닫기</Text>;
};

const ModalView = () => {
  const { text } = useSearch();

  return (
    <View style={styles.viewContainer}>
      <Header title="곡 추가" exit={<Exit />} />
      <SearchBar />
      {text === '' ? (
        <AddedProvider>
          <AddedSongLists />
        </AddedProvider>
      ) : (
        <SearchLists />
      )}
    </View>
  );
};

export default function SearchSongModal() {
  const { isSearchModal, onCloseModal } = useModal();
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      isVisible={isSearchModal}
      onBackdropPress={onCloseModal}
      style={styles.container}
    >
      <SearchProvider>
        <ModalView />
      </SearchProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewContainer: {
    width: '100%',
    height: 750 * SCALE_HEIGHT,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 10 * SCALE_HEIGHT,
  },
});
