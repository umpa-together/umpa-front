import React, { createContext, useContext, useState, useRef } from 'react'
import { Context } from 'context/ChatContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { navigate, push } from 'navigationRef';


const ChatContext = createContext(null)
export const useChat = () => useContext(ChatContext)

export default ChatProvider = ({ children }) => {
    const { state: userState, getOtheruser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const [reCommentModal, setReCommentModal] = useState(false)
    const [text, setText] = useState(false)
    const textRef = useRef()
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef()

    
    const onClose = () => {
        setReCommentModal(false)
        initRecomment()
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
        setReCommentModal(false)
    }



    const value = {
        text,
        textRef,
        loading,
        setLoading,
        setText,
        onClose,
        onClickProfile,
        

    }

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    )
}