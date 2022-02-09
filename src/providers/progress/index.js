import React, { createContext, useContext, useEffect } from 'react';
import { useProgress as trackProgess } from 'react-native-track-player';
import { useTrackPlayer } from 'providers/trackPlayer';

const ProgressContext = createContext(null);

export const useProgress = () => useContext(ProgressContext);

export default function ProgressProvider({ children }) {
  const { position, duration } = trackProgess();
  const { stopTrackSong } = useTrackPlayer();

  const value = {
    position,
    duration,
  };

  useEffect(() => {
    if (duration !== 0 && position !== 0 && duration === position) {
      stopTrackSong();
    }
  }, [duration, position]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
