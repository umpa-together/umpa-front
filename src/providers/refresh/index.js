import React, { createContext, useContext, useState, useRef } from 'react'

const RefreshContext = createContext(null)

export const useRefresh = () => useContext(RefreshContext)

export default RefreshProvider = ({ children }) => {
    const [refreshing, setRefreshing] = useState(false);
    const refreshRef = useRef()

    const fetchData = async () => {
        setRefreshing(true);
        await refreshRef.current?.call()
        setRefreshing(false);
    }

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }

    const setRefresh = (callback) => {
        refreshRef.current = callback
    }

    const value = {
        refreshing,
        onRefresh,
        setRefresh,
    }

    return (
        <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
    )
}