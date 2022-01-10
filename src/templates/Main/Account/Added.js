import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import Header from 'components/Header';
import style from 'constants/styles';
import { AddedSong, AddedPlaylist } from 'components/Account/AddedSection';
import TabView from 'components/TabView';

export default function Added({ type }) {
  const { state, getAddedSong, getAddedPlaylist } = useContext(AddedContext);

  const dataFetch = async () => {
    await Promise.all([getAddedSong(), getAddedPlaylist()]);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <View style={[style.background]}>
      <Header title="담은 목록" back />
      {(state.songLists || state.playlists) && (
        <TabView
          routesMap={[
            { key: 'song', title: '곡' },
            { key: 'playlist', title: '플레이리스트' },
          ]}
          sceneMap={{
            song: AddedSong,
            playlist: AddedPlaylist,
          }}
          idx={type === 'Song' ? 0 : 1}
        />
      )}
    </View>
  );
}
