/* eslint-disable no-else-return */
/* eslint-disable react/no-unstable-nested-components */
import React, { createContext, useContext, useState, useRef } from 'react';
import { useModal } from 'providers/modal';

const SongActionsContext = createContext(null);

export const useSongActions = () => useContext(SongActionsContext);

export default function SongActionsProvider({ children }) {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const searchInfoRef = useRef();
  const { onPlayValidityModal } = useModal();
  const [validityMsg, setValidityMsg] = useState();
  const songCount = {
    playlist: 8,
    represent: 5,
  };
  const containCheck = (song) => {
    let tok = false;
    Object.values(selectedSongs).forEach((item) => {
      if (song.id === item.id) {
        tok = true;
      }
    });
    return tok;
  };

  const addSongActions = ({ song }) => {
    const isIncludeSong = containCheck(song);
    if (selectedSongs.length < songCount[searchInfoRef.current.key] && !isIncludeSong) {
      setSelectedSongs((prev) => [...prev, song]);
      return true;
    } else if (selectedSongs.length === songCount[searchInfoRef.current.key] && !isIncludeSong) {
      setValidityMsg(`※ 최대 ${songCount[searchInfoRef.current.key]}곡을 초과했습니다.`);
      onPlayValidityModal();
      return false;
    } else {
      setSelectedSongs(selectedSongs.filter((item) => item.id !== song.id));
      return false;
    }
  };

  const onClickComplete = () => {
    searchInfoRef.current.completeFunc(selectedSongs);
  };

  const value = {
    addSongActions,
    containCheck,
    validityMsg,
    searchInfoRef,
    selectedSongs,
    setSelectedSongs,
    onClickComplete,
  };

  return <SongActionsContext.Provider value={value}>{children}</SongActionsContext.Provider>;
}
