import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useModal } from 'providers/modal';
import TrackPlayer, { useProgress } from 'react-native-track-player';

const TrackPlayerContext = createContext(null);

export const useTrackPlayer = () => useContext(TrackPlayerContext);

const TrackPlayerProvider = ({ children }) => {
  const [isPlayingId, setIsPlayingId] = useState(1);
  const [currentSong, setCurrentSong] = useState(null);
  const [isMute, setIsMute] = useState(false);
  // const { setHarmfulModal } = useModal();
  const { position, duration } = useProgress();

  const addtracksong = async ({ data }) => {
    data.attributes.artwork.url = data.attributes.artwork.url.replace('{w}', '300');
    data.attributes.artwork.url = data.attributes.artwork.url.replace('{h}', '300');

    const track = {
      id: data.id,
      url: data.attributes.previews[0].url,
      title: data.attributes.name,
      artist: data.attributes.artistName,
      date: data.attributes.releaseDate,
      album: data.attributes.albumName,
      duration: data.attributes.durationInMillis,
      artwork: data.attributes.artwork.url,
    };

    if (data.attributes.contentRating !== 'explicit') {
      setIsPlayingId(data.id);
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      TrackPlayer.play();
    } else {
      // setHarmfulModal(true);
    }
    setCurrentSong(data);
  };

  const stoptracksong = () => {
    setIsPlayingId('0');
    setCurrentSong(null);
    TrackPlayer.reset();
  };

  const onClickVolume = () => {
    if (isMute) {
      TrackPlayer.setVolume(1.0);
    } else {
      TrackPlayer.setVolume(0);
    }
    setIsMute(!isMute);
  };

  const value = {
    isPlayingId,
    currentSong,
    position,
    duration,
    isMute,
    addtracksong,
    stoptracksong,
    onClickVolume,
  };

  useEffect(() => {
    if (duration - position <= 1) {
      stoptracksong();
    }
  }, [isPlayingId, duration, position]);

  return <TrackPlayerContext.Provider value={value}>{children}</TrackPlayerContext.Provider>;
};

export default TrackPlayerProvider;
