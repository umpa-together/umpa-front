import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { navigate } from 'lib/utils/navigation';
import { Context as RelayContext } from 'context/Relay';
import { Context as UserContext } from 'context/User';
import SearchSongModal from 'components/Modal/SearchSongModal';

export default function NavButton({ isSwipe }) {
  const { state } = useContext(RelayContext);
  const { state: userState } = useContext(UserContext);
  const { playlist } = state.selectedRelay;
  const { postUserId } = playlist;
  const [searchModal, setSearchModal] = useState(false);

  const onClickAdd = (isValid) => {
    if (isValid) {
      setSearchModal(true);
    }
  };

  const onClickSwipe = (isValid) => {
    if (isValid) {
      navigate('Swipe');
    }
  };
  const optionLists = [
    {
      title: '곡 추가하기',
      onClick: onClickAdd,
      isValid: !postUserId.includes(userState.user._id),
    },
    {
      title: '심사하기',
      onClick: onClickSwipe,
      isValid: isSwipe,
    },
  ];

  return (
    <>
      {optionLists.map((option) => {
        const { title, onClick, isValid } = option;
        return (
          <TouchableOpacity
            style={{ borderWidth: 1, width: 200, height: 40 }}
            onPress={() => onClick(isValid)}
            key={title}
          >
            <Text>{title}</Text>
          </TouchableOpacity>
        );
      })}
      <SearchSongModal modal={searchModal} setModal={setSearchModal} />
    </>
  );
}
