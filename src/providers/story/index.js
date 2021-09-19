import React, { createContext, useContext, useState } from 'react'
import {Context as UserContext} from 'context/UserContext';
import {Context as DJContext} from 'context/DJContext';
import { push } from 'navigationRef';
import { useTrackPlayer } from 'providers/trackPlayer';

const StoryContext = createContext(null)

export const useStory = () => useContext(StoryContext)

export default StoryProvider = ({ children }) => {
    const { getOtherStory, storyView } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const { addtracksong, stoptracksong } = useTrackPlayer()

    const [storyModal, setStoryModal] = useState(false)
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

    const onClose = () => {
        getOtherStory()
        setStoryModal(false);
        stoptracksong()
    }

    const onClickProfile = async () => {
        setStoryModal(false);
        await Promise.all([
            getOtheruser({id: currentStory.story.id}),
            getSongs({id: currentStory.id}), 
        ])
        push('OtherAccount', { otherUserId:currentStory.id })
    }

    const value = {
        currentStory,
        storyModal,
        onClose,
        onClickStory,
        onClickProfile
    }

    return (
        <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
    )
}