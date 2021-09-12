import React, { createContext, useContext, useState, useEffect } from 'react'
import { useModal } from 'providers/modal';
import TrackPlayer from 'react-native-track-player';

const TrackPlayerContext = createContext(null)

export const useTrackPlayer = () => useContext(TrackPlayerContext)

export default TrackPlayerProvider = ({ children }) => {
    const [isPlayingId, setIsPlayingId] = useState('0')
    const [currentSong, setCurrentSong] = useState(null)
    const [playTime, setPlayTime] = useState(0)
    const { setHarmfulModal } = useModal()

    const addtracksong= async ({ data }) => {
        const track = new Object();
        track.id = data.id;
        track.url = data.attributes.previews[0].url;
        track.title = data.attributes.name;
        track.artist = data.attributes.artistName;
        if (data.attributes.contentRating != "explicit") {
            setIsPlayingId(data.id);
            await TrackPlayer.reset()
            await TrackPlayer.add(track);
            TrackPlayer.play();
        } else {
            setHarmfulModal(true);
        }
        setCurrentSong(data)
    };
    
    const stoptracksong= () => {    
        setIsPlayingId('0');
        setCurrentSong(null)
        TrackPlayer.reset()
    };

    const value = {
        isPlayingId,
        currentSong,
        playTime,
        addtracksong,
        stoptracksong,
    }

    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingId('0'), 31000);
        setPlayTime(0)
        return () => clearTimeout(trackPlayer);
    }, [isPlayingId])

    useEffect(() => {
        const timeInterval = setInterval(() => setPlayTime((prev) => prev+1), 1000)
        return () => {
            if(playTime === 30) clearInterval(timeInterval)
        }
    }, [])
    return (
        <TrackPlayerContext.Provider value={value}>{children}</TrackPlayerContext.Provider>
    )
}