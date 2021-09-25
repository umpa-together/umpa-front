import React, { createContext, useContext, useState, useRef } from 'react'
import { Context } from 'context/DailyContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { navigate, push } from 'navigationRef';


const DailyContext = createContext(null)
export const useDaily = () => useContext(DailyContext)

export default DailyProvider = ({ children }) => {
    const { getreComment, initRecomment, likescomment, unlikescomment } = useContext(Context);
    const { state: userState, getOtheruser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const [reCommentModal, setReCommentModal] = useState(false)
    const [currentComment, setCurrentComment] = useState(null)
    const [isArchive, setIsArchive] = useState(false)
    const [songs, setSongs] = useState([])
    const [image, setImage] = useState([])
    const [title, setTitle] = useState('')
    const imagecheck = image.length;

    const [validity, setValidity] = useState({
        title: true, 
        song: true,
        hashtag: true,
        thumbnail: true,
    })
    const informationRef = useRef({
        hashtagLists: [], 
        title: '',
        imgUrl: '',
        imgName: '',
        imgType: '',
        songs: [],
        isEdit: false,
    })
    const scrollRef = useRef()
    
    const onClickComment = async (comment) => {
        setReCommentModal(true)
        setCurrentComment(comment)
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

    const onClickCommentLikes = (likes, dailyId, id) => {
        if(likes.includes(userState.myInfo._id)) {
            unlikescomment({ dailyid: dailyId, id })
        } else {
            likescomment({ dailyid: dailyId, id })
        }
    }

    const onClickAddSong = (song) => {
        let tok = false;
        for(let key in songs){
            if(song.id == songs[key].id){
                tok = true;
                break;
            }
        }
        if (songs.length < 1 && !tok) {
            setSongs([...songs, song]);
        }
    }

    const onClickDeleteSong = (song) => {
        setSongs(songs.filter(item => item.id !== song.id));
    }

    const onClickDeleteThumbnail = (item) => {
        setImage(image.filter(state=>state.uri !==item.uri));
        informationRef.current.imgUrl = ''
        informationRef.current.imgName = ''
        informationRef.current.imgType = ''
    }

    const value = {
        scrollRef,
        reCommentModal,
        currentComment,
        informationRef,
        validity,
        isArchive,
        songs,
        image,
        title,
        imagecheck,
        onClickComment,
        onClose,
        onClickProfile,
        onClickCommentLikes,
        onClickAddSong,
        onClickDeleteSong,
        onClickDeleteThumbnail,
        setIsArchive,
        setSongs,
        setImage,
        setValidity,
        setTitle,
    }

    return (
        <DailyContext.Provider value={value}>{children}</DailyContext.Provider>
    )
}