import React, { createContext, useContext, useState, useEffect } from 'react';
import { useModal } from 'providers/modal';
import TrackPlayer, { useProgress } from 'react-native-track-player';

const TrackPlayerContext = createContext(null);

export const useTrackPlayer = () => useContext(TrackPlayerContext);

export default function TrackPlayerProvider({ children }) {
  const [isPlayingId, setIsPlayingId] = useState('0');
  const [currentSong, setCurrentSong] = useState(null);
  const [isMute, setIsMute] = useState(false);
  const [isStop, setIsStop] = useState(false);

  const { setHarmfulModal } = useModal();
  const { position, duration } = useProgress();
  const addtracksong = async ({ data }) => {
    setIsStop(false);
    data.attributes.artwork.url = data.attributes.artwork.url.replace('{w}', '300');
    data.attributes.artwork.url = data.attributes.artwork.url.replace('{h}', '300');
    const { attributes } = data;
    const {
      previews,
      name,
      artistName,
      releaseDate,
      albumName,
      durationInMillis,
      artwork,
      contentRating,
    } = attributes;
    const track = {
      id: data.id,
      url: previews[0].url,
      title: name,
      artist: artistName,
      date: releaseDate,
      album: albumName,
      duration: durationInMillis,
      artwork: artwork.url,
    };
    if (contentRating !== 'explicit') {
      setIsPlayingId(data.id);
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      TrackPlayer.play();
      setCurrentSong(data);
    } else {
      setHarmfulModal(true);
    }
  };

  const stoptracksong = async () => {
    setIsStop(false);
    setIsPlayingId('0');
    setCurrentSong(null);
    await TrackPlayer.reset();
  };

  const onClickSong = (data) => {
    if (isPlayingId !== data.id) {
      addtracksong({ data });
    } else {
      stoptracksong();
    }
  };

  const onClickVolume = () => {
    if (isMute) {
      TrackPlayer.setVolume(1.0);
    } else {
      TrackPlayer.setVolume(0);
    }
    setIsMute(!isMute);
  };

  const onClickPause = () => {
    if (isStop) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
    setIsStop(!isStop);
  };

  const value = {
    isPlayingId,
    currentSong,
    position,
    duration,
    isMute,
    isStop,
    addtracksong,
    stoptracksong,
    onClickVolume,
    onClickSong,
    onClickPause,
  };

  useEffect(() => {
    if (duration !== 0 && position !== 0 && duration === position) {
      stoptracksong();
    }
  }, [isPlayingId, duration, position]);

  return <TrackPlayerContext.Provider value={value}>{children}</TrackPlayerContext.Provider>;
}
