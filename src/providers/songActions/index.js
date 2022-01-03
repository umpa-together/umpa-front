/* eslint-disable react/no-unstable-nested-components */
import React, { createContext, useContext, useState, useRef } from 'react';
import { Button } from 'react-native';

const SongActionsContext = createContext(null);

export const useSongActions = () => useContext(SongActionsContext);

export default function SongActionsProvider({ children }) {
  const [actionType, setActionType] = useState(null);
  const songsRef = useRef();
  const actionsRef = useRef();

  const PlaylistAddSongActions = ({ song }) => {
    const onClickActions = () => {
      let tok = false;
      Object.values(songsRef.current).forEach((item) => {
        if (song.id === item.id) {
          tok = true;
        }
      });
      if (songsRef.current.length < 7 && !tok) {
        actionsRef.current((prev) => [...prev, song]);
      }
    };
    return <Button title="플리생성" onPress={onClickActions} />;
  };

  const PlaylistDeleteSongActions = ({ song }) => {
    const onClickActions = () => {
      actionsRef.current(songsRef.current.filter((item) => item.id !== song.id));
    };
    return <Button title="삭제" onPress={onClickActions} />;
  };

  const getActionComponent = ({ data }) => {
    if (actionType === 'playlistAddSong') {
      return <PlaylistAddSongActions song={data} />;
    }
    if (actionType === 'playlistDeleteSong') {
      return <PlaylistDeleteSongActions song={data} />;
    }
    return null;
  };

  const value = {
    setActionType,
    getActionComponent,
    songsRef,
    actionsRef,
  };

  return <SongActionsContext.Provider value={value}>{children}</SongActionsContext.Provider>;
}
