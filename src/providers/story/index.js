import React, { createContext, useContext, useState } from 'react';
import { Context } from 'context/Story';

const StoryContext = createContext(null);

export const useStory = () => useContext(StoryContext);

export default function StoryProvider({ children }) {
  const { state } = useContext(Context);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const onClickMyStory = (song) => {
    setCurrentSong(song);
  };

  const onClickOtherStory = (song, idx) => {
    setCurrentSong(song);
    setCurrentIdx(idx);
  };

  const onClickLeft = () => {
    if (currentIdx > 0) {
      setCurrentSong(state.otherStoryLists[currentIdx - 1]);
      setCurrentIdx(currentIdx - 1);
    }
  };

  const onClickRight = () => {
    if (currentIdx < state.otherStoryLists.length - 1) {
      setCurrentSong(state.otherStoryLists[currentIdx + 1]);
      setCurrentIdx(currentIdx + 1);
    }
  };

  const value = {
    onClickMyStory,
    onClickOtherStory,
    onClickLeft,
    onClickRight,
    currentSong,
  };

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}
