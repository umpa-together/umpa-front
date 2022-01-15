import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/User';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1, MAIN_COLOR, COLOR_2 } from 'constants/colors';
import style from 'constants/styles';
import { useProfileEdit } from 'providers/profileEdit';
import Modal from '.';

const ModalView = ({ onCloseGenreModal }) => {
  const { state, getGenreLists } = useContext(UserContext);
  const { profile, onClickGenre } = useProfileEdit();

  useEffect(() => {
    getGenreLists();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>선호 장르 선택</Text>
      <TouchableOpacity style={styles.completeView} onPress={onCloseGenreModal}>
        <Text style={styles.complete}>완료</Text>
      </TouchableOpacity>
      <ScrollView>
        {state.genreLists &&
          state.genreLists.map(({ genre }) => {
            return (
              <TouchableOpacity
                key={genre}
                style={[style.flexRow, styles.box]}
                onPress={() => onClickGenre(genre)}
                activeOpacity={0.9}
              >
                <View style={styles.circle}>
                  {profile.genre.includes(genre) && <View style={styles.activeCircle} />}
                </View>
                <Text style={styles.genre}>{genre}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default function GenreModal({ modal, setModal }) {
  const onCloseGenreModal = () => {
    setModal(!modal);
  };
  return (
    <Modal
      isVisible={modal}
      onBackdropPress={onCloseGenreModal}
      style={styles.container}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <ModalView onCloseGenreModal={onCloseGenreModal} />
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
    height: 755 * SCALE_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10 * SCALE_HEIGHT,
    borderTopRightRadius: 10 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(16),
    color: COLOR_1,
    marginTop: 25 * SCALE_HEIGHT,
    textAlign: 'center',
    marginBottom: 30 * SCALE_HEIGHT,
  },
  completeView: {
    position: 'absolute',
    right: 14 * SCALE_WIDTH,
    top: 29 * SCALE_HEIGHT,
  },
  complete: {
    fontSize: FS(12),
    color: MAIN_COLOR,
  },
  box: {
    height: 42 * SCALE_HEIGHT,
    paddingLeft: 18 * SCALE_WIDTH,
    alignItems: 'center',
  },
  circle: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    borderRadius: 20 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    width: 12 * SCALE_WIDTH,
    height: 12 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
  },
  genre: {
    fontSize: FS(15),
    fontWeight: '400',
    color: COLOR_2,
    marginLeft: 20 * SCALE_WIDTH,
  },
});
