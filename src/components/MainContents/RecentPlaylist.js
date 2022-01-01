import React, { useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import PlaylistCard from 'components/MainContents/PlaylistCard';

export default function recentPlaylist() {
  const { state } = useContext(MainContentsContext);
  return (
    <View>
      <Text>최근</Text>
      <FlatList
        data={state.recentPlaylists}
        keyExtractor={(playlist) => playlist._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <PlaylistCard info={item} />;
        }}
      />
    </View>
  );
}
