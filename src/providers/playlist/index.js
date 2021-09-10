import React, { createContext, useContext, useState, useRef } from 'react'
import { Context } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { navigate, push } from 'navigationRef';

const PlaylistContext = createContext(null)
export const usePlaylist = () => useContext(PlaylistContext)

export default PlaylistProvider = ({ children }) => {
    const { getreComment, initRecomment, likescomment, unlikescomment } = useContext(Context);
    const { state: userState, getOtheruser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const [reCommentModal, setReCommentModal] = useState(false)
    const [currentComment, setCurrentComment] = useState(null)
    const scrollRef = useRef()
    
    const onClickComment = async (comment) => {
        setReCommentModal(true)
        setCurrentComment(comment)
        console.log(currentComment)
        await getreComment({ commentid: comment._id })
    }
    
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

    const onClickCommentLikes = async (likes, playlistId, id) => {
        if(likes.includes(userState.myInfo._id)) {
            await unlikescomment({ playlistid: playlistId, id })
        } else {
            await likescomment({ playlistid: playlistId, id })
        }
    }

    const value = {
        scrollRef,
        reCommentModal,
        currentComment,
        onClickComment,
        onClose,
        onClickProfile,
        onClickCommentLikes,
    }

    return (
        <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
    )
}