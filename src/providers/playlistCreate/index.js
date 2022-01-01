import React, { createContext, useContext, useState } from 'react';
import { Context as PlaylistContext } from 'context/Playlist';

const PlaylistCreateContext = createContext(null);

export const usePlaylistCreate = () => useContext(PlaylistCreateContext);

export default function PlaylistCreateProvider({ children }) {
  const { addPlaylist } = useContext(PlaylistContext);

  const [information, setInformation] = useState({
    title: '',
    content: '',
  });
  const [songs, setSongs] = useState([]);
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState([]);

  const patternSpc = /[~!@#$%^&*()_+|<>?:{}]/;
  const patternNum = /[0-9]/;
  const patternEng = /[a-zA-Z]/;
  const patternKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const setParams = (data) => {
    setSongs(data.songs);
    setHashtags(data.hashtags);
    setInformation({ title: data.title, content: data.content });
  };

  const onChangeValue = (type, value) => {
    if (type === 'title') {
      setInformation({
        ...information,
        title: value,
      });
    } else if (type === 'content') {
      setInformation({
        ...information,
        content: value,
      });
    }
  };

  const onClickAddSong = (song) => {
    let tok = false;
    Object.values(songs).forEach((item) => {
      if (song.id === item.id) {
        tok = true;
      }
    });
    if (songs.length < 7 && !tok) {
      setSongs([...songs, song]);
    }
  };

  const onClickDeleteSong = (song) => {
    setSongs(songs.filter((item) => item.id !== song.id));
  };

  const onClickAddHashtag = (text, setText) => {
    const addhashtag = (txt) => {
      if (txt !== '' && !hashtags.includes(txt)) {
        setHashtags([...hashtags, txt]);
        return true;
      }
      return false;
    };

    if (
      !patternSpc.test(text) &&
      (patternEng.test(text) || patternKor.test(text) || patternNum.test(text))
    ) {
      if (addhashtag(text)) {
        setText();
      }
    }
  };
  const onClickDeleteHashtag = (text) => {
    setHashtags(hashtags.filter((item) => item !== text));
  };

  const onClickUpload = async () => {
    let fd = null;
    if (image) {
      fd = new FormData();
      fd.append('img', {
        name: image.name,
        type: image.type,
        uri: image.uri,
      });
    }

    await addPlaylist({
      title: information.title,
      content: information.content,
      hashtag: hashtags,
      songs,
      fd,
    });
  };

  const value = {
    information,
    songs,
    image,
    hashtags,
    onChangeValue,
    onClickAddSong,
    onClickDeleteSong,
    onClickUpload,
    onClickAddHashtag,
    onClickDeleteHashtag,
    setImage,
    setParams,
  };

  return <PlaylistCreateContext.Provider value={value}>{children}</PlaylistCreateContext.Provider>;
}
