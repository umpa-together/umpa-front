import React, { createContext, useContext, useRef } from 'react';

const TabContext = createContext(null);

export const useTabRef = () => useContext(TabContext);

export default function TabRefProvider({ children }) {
  const relayRef = useRef();
  const feedRef = useRef();
  const searchRef = useRef();
  const noticeRef = useRef();

  const value = {
    relayRef,
    feedRef,
    searchRef,
    noticeRef,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}
