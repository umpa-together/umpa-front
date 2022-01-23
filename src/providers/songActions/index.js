/* eslint-disable no-else-return */
/* eslint-disable react/no-unstable-nested-components */
import React, { createContext, useContext, useState, useRef } from 'react';
import { useModal } from 'providers/modal';

const SongActionsContext = createContext(null);

export const useSongActions = () => useContext(SongActionsContext);

export default function SongActionsProvider({ children }) {
  const songsRef = useRef();
  const actionsRef = useRef();
  const { onPlayValidityModal } = useModal();
  const [validityMsg, setValidityMsg] = useState();
  const [opt, setOpt] = useState('');

  const containCheck = ({ song }) => {
    let tok = false;
    Object.values(songsRef.current).forEach((item) => {
      if (song.id === item.id) {
        tok = true;
      }
    });
    return tok;
  };

  const addSongActions = ({ song }) => {
    const tok = containCheck({ song });
    if (opt === 'playlist') {
      if (songsRef.current.length < 8 && !tok) {
        actionsRef.current((prev) => [...prev, song]);
        return true;
      }
      if (songsRef.current.length === 8 && !tok) {
        setValidityMsg('※ 최대 8곡을 초과했습니다.');
        onPlayValidityModal();
        return false;
      }
    } else {
      if (songsRef.current.length < 3 && !tok) {
        actionsRef.current((prev) => [...prev, song]);
        return true;
      }
      if (songsRef.current.length === 3 && !tok) {
        setValidityMsg('※ 최대 3곡을 초과했습니다.');
        onPlayValidityModal();
        return false;
      }
    }
    actionsRef.current(songsRef.current.filter((item) => item.id !== song.id));
    return false;
  };

  const value = {
    opt,
    setOpt,
    addSongActions,
    containCheck,
    validityMsg,
    songsRef,
    actionsRef,
  };

  return <SongActionsContext.Provider value={value}>{children}</SongActionsContext.Provider>;
}
