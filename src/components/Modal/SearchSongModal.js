import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useModal } from 'providers/modal';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Header from 'components/SearchSong/Header';
import SearchBar from 'components/SearchSong/SearchBar';
import SearchProvider, { useSearch } from 'providers/search';
import { Provider as SearchProviderC } from 'context/Search';
import { useSongActions } from 'providers/songActions';
import AddedSongLists from 'components/SearchSong/AddedSongLists';
import { Provider as AddedProvider } from 'context/Added';
import SearchLists from 'components/SearchSong/SearchLists';
import { COLOR_3, MAIN_COLOR, COLOR_1 } from 'constants/colors';
import ValidityModal from 'components/Modal/ValidityModal';
import HarmfulModal from 'components/Modal/HarmfulModal';
import Modal from '.';

const ModalView = ({ onClose }) => {
  const { text, searching } = useSearch();
  const { validityMsg, searchInfoRef, onClickComplete } = useSongActions();
  const { validityModal } = useModal();
  const activeCheck = true;

  const Exit = memo(() => {
    return (
      <TouchableOpacity style={styles.headerTouch} onPress={onClose}>
        <Text style={styles.inactiveText}>닫기</Text>
      </TouchableOpacity>
    );
  });

  const Action = memo(() => {
    const onClickAction = () => {
      onClickComplete();
      onClose();
    };

    return (
      <TouchableOpacity style={styles.headerTouch} onPress={onClickAction}>
        <Text style={activeCheck ? styles.activeText : styles.inactiveText}>완료</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.viewContainer}>
      <Header
        title={searchInfoRef.current.title}
        titleStyle={styles.titleStyle}
        exit={<Exit />}
        action={
          (searchInfoRef.current.key === 'playlist' ||
            searchInfoRef.current.key === 'represent') && <Action />
        }
      />
      <SearchBar />
      {text === '' && !searching ? (
        <AddedProvider>
          <AddedSongLists />
        </AddedProvider>
      ) : (
        <SearchLists />
      )}
      {validityModal && <ValidityModal title={validityMsg} />}
      <HarmfulModal />
    </View>
  );
};

export default function SearchSongModal({ modal, setModal }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      isVisible={modal}
      onBackdropPress={onBackdropPress}
      style={styles.container}
    >
      <SearchProvider>
        <SearchProviderC>
          <ModalView onClose={onBackdropPress} />
        </SearchProviderC>
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
  headerTouch: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {
    fontSize: FS(12),
    color: MAIN_COLOR,
  },
  inactiveText: {
    fontSize: FS(12),
    color: COLOR_3,
  },
  titleStyle: {
    fontSize: FS(16),
    color: COLOR_1,
  },
});
