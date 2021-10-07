import React, { createContext, useContext, useState, useRef } from 'react'
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { navigate, push } from 'navigationRef';

const ChatContext = createContext(null)

export const useChat = () => useContext(ChatContext)

export default ChatProvider = ({ children }) => {
    const { state: userState, getOtheruser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const [text, setText] = useState(false)
    const [optionModal, setOptionModal] = useState(false)
    const textRef = useRef()
    const chatRef = useRef()

    const onMove = () => {
        if(chatRef) {
            chatRef.current.scrollToEnd()        
        }
    }

    const onClickProfile = async (id) => {
        if(id == userState.myInfo._id) {
            navigate('Account')
        }else{
            await Promise.all([
                getOtheruser({ id }),
                getSongs({ id })
            ]);
            push('OtherAccount', {otherUserId: id})
        }
    }

    const value = {
        text,
        textRef,
        optionModal,
        chatRef,
        onMove,
        setText,
        setOptionModal,
        onClickProfile,
    }

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    )
}