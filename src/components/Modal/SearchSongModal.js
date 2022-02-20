/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useModal } from 'providers/modal';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Header from 'components/SearchSong/Header';
import SearchBar from 'components/SearchSong/SearchBar';
import SearchProvider, { useSearch } from 'providers/search';
import { Provider as SearchProviderC } from 'context/Search';
import { useSongActions } from 'providers/songActions';
import AddedSongLists from 'components/SearchSong/AddedSongLists';
import SearchLists from 'components/SearchSong/SearchLists';
import { COLOR_3, MAIN_COLOR, COLOR_1 } from 'constants/colors';
import ValidityModal from 'components/Modal/ValidityModal';
import HarmfulModal from 'components/Modal/HarmfulModal';
import Text from 'components/Text';
import TouchableNoDouble from 'components/TouchableNoDouble';
import Modal from '.';
import RelayActionModal from './RelayActionModal';

const ModalView = ({ onClose, activeCheck }) => {
  const { text, searching } = useSearch();
  const { validityMsg, searchInfoRef, onClickComplete } = useSongActions();
  const { validityModal } = useModal();
  const [relayModal, setRelayModal] = useState(false);
  const completeLists = ['playlist', 'represent', 'relay'];

  const Exit = useCallback(() => {
    return (
      <TouchableOpacity style={styles.headerTouch} onPress={onClose}>
        <Text style={styles.inactiveText}>닫기</Text>
      </TouchableOpacity>
    );
  }, []);

  const Action = () => {
    const onClickAction = () => {
      if (activeCheck) {
        if (searchInfoRef.current.key !== 'relay') {
          onClickComplete();
          onClose();
        } else {
          setRelayModal(true);
        }
      }
    };

    return (
      <TouchableNoDouble style={styles.headerTouch} onPress={onClickAction}>
        <Text style={activeCheck ? styles.activeText : styles.inactiveText}>완료</Text>
      </TouchableNoDouble>
    );
  };

  return (
    <View style={styles.viewContainer}>
      <Header
        title={searchInfoRef.current.title}
        titleStyle={styles.titleStyle}
        exit={<Exit />}
        action={completeLists.includes(searchInfoRef.current.key) && <Action />}
      />
      <SearchBar />
      {text === '' && !searching ? <AddedSongLists /> : <SearchLists />}
      {validityModal && <ValidityModal title={validityMsg} />}
      <HarmfulModal />
      {relayModal && (
        <RelayActionModal modal={relayModal} setModal={setRelayModal} onClose={onClose} />
      )}
    </View>
  );
};

export default function SearchSongModal({ modal, setModal, activeCheck }) {
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
          <ModalView onClose={onBackdropPress} activeCheck={activeCheck} />
        </SearchProviderC>
      </SearchProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    position: 'absolute',
    marginTop: 60 * SCALE_HEIGHT,
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
    fontSize: FS(16),
    color: MAIN_COLOR,
  },
  inactiveText: {
    fontSize: FS(16),
    color: COLOR_3,
  },
  titleStyle: {
    fontSize: FS(16),
    color: COLOR_1,
  },
});
