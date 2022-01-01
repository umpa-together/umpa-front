import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';

export default function CreateSearchAction({ song }) {
  const { onClickAddSong, onClickDeleteSong } = usePlaylistCreate();
  const [isAdd, setIsAdd] = useState(false);
  const onClickButton = () => {
    if (isAdd) {
      onClickDeleteSong(song);
    } else {
      onClickAddSong(song);
    }
    setIsAdd(!isAdd);
  };
  return (
    <TouchableOpacity
      style={{ width: 40, height: 40, backgroundColor: '#1e1' }}
      onPress={onClickButton}
    >
      <Text>{isAdd ? '추가 취소' : '추가'}</Text>
    </TouchableOpacity>
  );
}
