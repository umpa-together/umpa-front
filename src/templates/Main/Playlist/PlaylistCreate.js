/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-new-object */
import React, { useCallback, useEffect, useRef } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { navigate } from 'lib/utils/navigation';
import { useSharedValue } from 'react-native-reanimated';
import CreateInput from 'components/Playlist/CreateInput';
import CreateSongList from 'components/Playlist/CreateSongList';
import { usePlaylistCreate } from 'providers/playlistCreate';
import CreateHashtag from 'components/Playlist/CreateHashtag';
import Header from 'components/Header';
import style from 'constants/styles';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';

const listToObject = (list) => {
  const object = {};

  Object.values(list).forEach((song, index) => {
    object[song.id] = index;
  });
  return object;
};
const NextActions = ({ positions }) => {
  const { information, setSongs, songs, image } = usePlaylistCreate();
  const arrayCheck = () => {
    const result = new Object([]);
    for (const i in positions.current.value) {
      result[positions.current.value[i]] = songs[songs.findIndex((item) => item.id === i)];
    }
    setSongs(result);
    return result;
  };
  const onPressNext = async () => {
    const songsChange = arrayCheck();
    navigate('PlaylistUpload', {
      data: { information, songs: songsChange, image },
    });
  };

  return <Button title="next" onPress={onPressNext} />;
};

export default function PlaylistCreate({ data }) {
  const { setParams, songs, setSongs } = usePlaylistCreate();
  const { setActionType, songsRef, actionsRef } = useSongActions();
  const positions = useRef(useSharedValue(listToObject(songs)));

  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  useEffect(() => {
    songsRef.current = songs;
  }, [songs]);

  useFocusEffect(
    useCallback(() => {
      actionsRef.current = setSongs;
      setActionType('playlistAddSong');
    }, []),
  );

  return (
    <View style={style.background}>
      <Header title="새 플레이리스트 추가" back actions={[<NextActions positions={positions} />]} />
      <ScrollView>
        <CreateInput />
        <CreateSongList positions={positions} />
        <CreateHashtag />
      </ScrollView>
    </View>
  );
}
