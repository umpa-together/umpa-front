import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_5, MAIN_COLOR } from 'constants/colors';
import Modal from 'components/Modal';
import Header from 'components/Header';
import style from 'constants/styles';
import CreateHashtag from 'components/CreateHashtag';
import ValidityModal from 'components/Modal/ValidityModal';
import { useModal } from 'providers/modal';
import Icon from 'widgets/Icon';
import Text from 'components/Text';

const HashtagModalView = ({ onCloseModal, info }) => {
  const { data, deleteAction, addAction } = info;
  const { validityModal, onValidityModal } = useModal();
  const hashtagCount = data.length;
  const Landing = memo(() => {
    return (
      <TouchableOpacity onPress={onCloseModal}>
        <Text style={styles.landingText}>닫기</Text>
      </TouchableOpacity>
    );
  });

  const Action = memo(() => {
    return (
      <TouchableOpacity onPress={onCloseModal}>
        <Text style={styles.actionText}>완료</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={styles.modal}>
      <Header
        headerStyle={styles.headerContainer}
        titleStyle={style.headertitle}
        landings={[<Landing />]}
        actions={[<Action />]}
        title="해시태그 추가"
      />
      <CreateHashtag
        addAction={addAction}
        hashtagCount={hashtagCount}
        onValidityModal={onValidityModal}
      />
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={[style.flexRow, styles.hashtagContainer]}>
          {data.map((item) => {
            return (
              <TouchableOpacity
                key={item}
                onPress={() => deleteAction(item)}
                style={styles.hashtagBox}
              >
                <Text style={styles.hashtagsStyle}>{`# ${item}`}</Text>
                <Icon
                  style={styles.hashtagCancelIcon}
                  source={require('public/icons/hashtag-delete.png')}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {validityModal && <ValidityModal title="※ 최대 3개까지 가능합니다." />}
    </View>
  );
};

export default function HashtagModal({ modal, setModal, info }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };

  return (
    <Modal
      isVisible={modal}
      onBackdropPress={onBackdropPress} // Android back press
      onSwipeComplete={onBackdropPress} // Swipe to discard
      animationIn="slideInUp" // Has others, we want slide in from the left
      animationOut="slideOutDown" // When discarding the drawer
      backdropOpacity={0.1}
      style={styles.container} // Needs to contain the width, 75% of screen width in our case
    >
      <HashtagModalView info={info} onCloseModal={onBackdropPress} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  headerContainer: {
    height: 67 * SCALE_HEIGHT,
  },
  modal: {
    borderTopLeftRadius: 12 * SCALE_HEIGHT,
    borderTopRightRadius: 12 * SCALE_HEIGHT,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 600 * SCALE_HEIGHT,
    backgroundColor: '#fff',
  },
  divideContainer: {
    marginTop: 29 * SCALE_HEIGHT,
  },
  landingText: {
    paddingVertical: 10 * SCALE_HEIGHT,
    paddingHorizontal: 15 * SCALE_WIDTH,
    fontSize: FS(14),
    color: COLOR_5,
  },
  actionText: {
    paddingVertical: 10 * SCALE_HEIGHT,
    paddingHorizontal: 15 * SCALE_WIDTH,
    fontSize: FS(14),
    color: MAIN_COLOR,
  },
  hashtagBox: {
    borderRadius: 43 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    marginRight: 10 * SCALE_WIDTH,
    borderColor: MAIN_COLOR,
    alignSelf: 'flex-start',
  },
  hashtagsStyle: {
    paddingLeft: 8 * SCALE_WIDTH,
    paddingRight: 25 * SCALE_WIDTH,
    paddingVertical: 6 * SCALE_HEIGHT,
    fontSize: FS(14),
    color: MAIN_COLOR,
  },
  hashtagContainer: {
    paddingTop: 24 * SCALE_WIDTH,
    paddingLeft: 18 * SCALE_WIDTH,
  },
  hashtagCancelIcon: {
    position: 'absolute',
    right: 8 * SCALE_WIDTH,
    top: 7.3 * SCALE_HEIGHT,
    width: 14 * SCALE_WIDTH,
    height: 14 * SCALE_WIDTH,
  },
});
