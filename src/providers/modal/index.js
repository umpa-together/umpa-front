import React, { createContext, useContext, useState, useEffect } from 'react'

const ModalContext = createContext(null)

export const useModal = () => useContext(ModalContext)

export default ModalProvider = ({ children }) => {
    const [harmfulModal, setHarmfulModal] = useState(false)

    const onCloseModal = () => {
        setHarmfulModal(false)
    }

    const value = {
        harmfulModal,
        setHarmfulModal,
        onCloseModal
    }

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    )
}