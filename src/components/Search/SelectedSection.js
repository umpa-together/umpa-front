/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Context as SearchContext } from 'context/Search';

export const Playlist = () => {
  const { state } = useContext(SearchContext);
  return (
    <>
      {state.selected.playlist.map((playlist) => {
        const { _id: id } = playlist;
        return (
          <View key={id}>
            <Text>playlist</Text>
          </View>
        );
      })}
    </>
  );
};

export const Daily = () => {
  const { state } = useContext(SearchContext);

  return (
    <>
      {state.selected.daily.map((daily) => {
        const { _id: id } = daily;
        return (
          <View key={id}>
            <Text>daily</Text>
          </View>
        );
      })}
    </>
  );
};

export const DJ = () => {
  const { state } = useContext(SearchContext);

  return (
    <>
      {state.selected.dj.map((dj) => {
        const { _id: id } = dj;
        return (
          <View key={id}>
            <Text>dj</Text>
          </View>
        );
      })}
    </>
  );
};
