import React, { createContext, useContext, useState } from 'react'
import {Context as UserContext} from 'context/UserContext';
import {Context as DJContext} from 'context/DJContext';
import { navigate, push } from 'navigationRef';
import { useTrackPlayer } from 'providers/trackPlayer';

const StoryContext = createContext(null)

export const useStory = () => useContext(StoryContext)

export default StoryProvider = ({ children }) => {
    const { state, getOtherStory, storyView, getOtheruser, getMyStory } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const { addtracksong, stoptracksong } = useTrackPlayer()

    const [storyModal, setStoryModal] = useState(false)
    const [isMyStory, setIsMyStory] = useState(false)
    const [currentStory, setCurrentStory] = useState({
        story: null, index: 0
    })

    const onClickStory = ({ item, index }) => {
        stoptracksong()
        setCurrentStory({story: item, index})
        setStoryModal(true)
        storyView({ id: item.id })
        if(item.song['song'].attributes.contentRating != 'explicit')    addtracksong({ data: item.song["song"] });
    }

    const onClickMyStory = () => {
        stoptracksong()
        setStoryModal(true)
        setCurrentStory({story: state.myStory, index: 0})
        storyView({ id: state.myInfo._id })
        if(state.myStory.song.attributes.contentRating != 'explicit')    addtracksong({ data: state.myStory.song });
    }

    const onClose = () => {
        if(isMyStory) {
            getMyStory()
        } else {
            getOtherStory()
        }
        setStoryModal(false);
        stoptracksong()
    }

    const onClickProfile = async () => {
        setStoryModal(false);
        if(currentStory.story.id === state.myInfo._id){
            navigate('Account')
        } else{
            await Promise.all([
                getOtheruser({id: currentStory.story.id}),
                getSongs({id: currentStory.story.id}), 
            ])
            push('OtherAccount', { otherUserId:currentStory.story.id })
        }
    }

    const value = {
        currentStory,
        storyModal,
        isMyStory,
        setIsMyStory,
        onClose,
        onClickStory,
        onClickProfile,
        onClickMyStory
    }

    return (
        <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
    )
}