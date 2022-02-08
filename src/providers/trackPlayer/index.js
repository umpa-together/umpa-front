import React, { createContext, useContext, useState, useEffect } from 'react';
import { useModal } from 'providers/modal';
import TrackPlayer, { useProgress } from 'react-native-track-player';

const TrackPlayerContext = createContext(null);

export const useTrackPlayer = () => useContext(TrackPlayerContext);

export default function TrackPlayerProvider({ children }) {
  const [state, setState] = useState('stop'); // stop, pause, play
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlayingId, setIsPlayingId] = useState(0);
  const { setHarmfulModal } = useModal();
  const { position, duration } = useProgress();

  const addTrackSong = async (song) => {
    const { attributes, id } = song;
    attributes.artwork.url = attributes.artwork.url.replace('{w}', '300');
    attributes.artwork.url = attributes.artwork.url.replace('{h}', '300');
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
      id,
      url: previews[0].url,
      title: name,
      artist: artistName,
      date: releaseDate,
      album: albumName,
      duration: durationInMillis,
      artwork: artwork.url,
    };

    if (contentRating === 'explicit') {
      setHarmfulModal(true);
    } else {
      await Promise.all([TrackPlayer.reset(), TrackPlayer.add(track)]);
      TrackPlayer.play();
      setCurrentSong(song);
      setIsPlayingId(song.id);
      setState('play');
    }
  };

  const stopTrackSong = async () => {
    await TrackPlayer.reset();
    setCurrentSong(null);
    setIsPlayingId(0);
    setState('stop');
  };

  const onClickSong = (song) => {
    if (isPlayingId === song.id) {
      stopTrackSong();
    } else {
      addTrackSong(song);
    }
  };

  const onClickPlayBar = () => {
    if (state === 'play') {
      setState('pause');
      TrackPlayer.pause();
    } else {
      setState('play');
      TrackPlayer.play();
    }
  };

  const value = {
    currentSong,
    position,
    duration,
    state,
    isPlayingId,
    addTrackSong,
    stopTrackSong,
    onClickSong,
    onClickPlayBar,
  };

  useEffect(() => {
    if (duration !== 0 && position !== 0 && duration === position) {
      stopTrackSong();
    }
  }, [duration, position]);

  return <TrackPlayerContext.Provider value={value}>{children}</TrackPlayerContext.Provider>;
}
