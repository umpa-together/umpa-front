import React, { useContext, useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { navigate } from 'lib/utils/navigation';
import { Context as RelayContext } from 'context/Relay';
import { Context as UserContext } from 'context/User';
import SearchSongModal from 'components/Modal/SearchSongModal';
import Icon from 'widgets/Icon';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { useSongActions } from 'providers/songActions';
import { useModal } from 'providers/modal';
import Text from 'components/Text';

export default function NavButton({ isSwipe, setValidityMsg }) {
  const {
    state: {
      selectedRelay: {
        playlist: { postUserId },
      },
    },
  } = useContext(RelayContext);
  const { state: user } = useContext(UserContext);
  const { searchInfoRef, selectedSongs } = useSongActions();
  const [searchModal, setSearchModal] = useState(false);
  const { onValidityModal } = useModal();

  const onClickAdd = (isValid) => {
    if (isValid) {
      setSearchModal(true);
    } else {
      setValidityMsg('※ 릴레이 플리에 이미 도전하셨습니다. ');
      onValidityModal();
    }
  };

  const onClickSwipe = (isValid) => {
    if (isValid) {
      navigate('Swipe');
    } else {
      setValidityMsg('※ 현재 심사할 곡이 존재하지 않습니다. ');
      onValidityModal();
    }
  };

  const optionLists = [
    {
      title: '릴레이 곡 도전',
      onClick: onClickAdd,
      isValid: !postUserId.includes(user.user._id),
      icon: <Icon source={require('public/icons/play.png')} style={styles.icon} />,
    },
    {
      title: '심사하기',
      onClick: onClickSwipe,
      isValid: isSwipe,
      icon: <Icon source={require('public/icons/relay-estimate.png')} style={styles.icon} />,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      searchInfoRef.current = {
        title: '릴레이 플리 곡 추천',
        key: 'relay',
      };
    }, [selectedSongs]),
  );

  return (
    <View style={[style.flexRow, style.space_between, styles.container]}>
      {optionLists.map((option) => {
        const { title, onClick, isValid, icon } = option;
        return (
          <TouchableOpacity
            style={[style.flexRow, styles.optionBox, title === '릴레이 곡 도전' && styles.active]}
            onPress={() => onClick(isValid)}
            key={title}
          >
            {icon}
            <Text>{title}</Text>
          </TouchableOpacity>
        );
      })}
      <SearchSongModal
        modal={searchModal}
        setModal={setSearchModal}
        activeCheck={selectedSongs.length > 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22 * SCALE_WIDTH,
    marginTop: 33 * SCALE_HEIGHT,
  },
  optionBox: {
    width: 159 * SCALE_WIDTH,
    paddingVertical: 5 * SCALE_HEIGHT,
    backgroundColor: '#E4E4E440',
    borderRadius: 8 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#85A0FF33',
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
  },
});
