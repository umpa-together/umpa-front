import React from 'react';
import { View, Button } from 'react-native';
import { useModal } from 'providers/modal';

export default function CreateSongAdd() {
  const { setIsSearchModal } = useModal();

  const onClickAdd = () => {
    setIsSearchModal(true);
  };
  return (
    <View>
      <Button title="song add" onPress={onClickAdd} />
    </View>
  );
}
