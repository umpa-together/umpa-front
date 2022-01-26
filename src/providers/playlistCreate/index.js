import React, { createContext, useContext, useState } from 'react';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as UserContext } from 'context/User';

const PlaylistCreateContext = createContext(null);

export const usePlaylistCreate = () => useContext(PlaylistCreateContext);

export default function PlaylistCreateProvider({ children }) {
  const { editPlaylist, addPlaylist } = useContext(PlaylistContext);
  const { getMyInformation } = useContext(UserContext);
  const [information, setInformation] = useState({
    title: '',
    content: '',
    hashtags: [],
  });
  const [songs, setSongs] = useState([]);
  const [image, setImage] = useState(null);

  const patternSpc = /[~!@#$%^&*()_+|<>?:{}]/;
  const patternNum = /[0-9]/;
  const patternEng = /[a-zA-Z]/;
  const patternKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const setParams = (data) => {
    // eslint-disable-next-line no-shadow
    const { information, songs, image } = data;
    if (image) {
      setImage(image);
    }
    setSongs(songs);
    setInformation(information);
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

  const onClickAddHashtag = (textRef) => {
    const addhashtag = (txt) => {
      if (txt !== '' && !information.hashtags.includes(txt)) {
        setInformation({
          ...information,
          hashtags: [...information.hashtags, txt],
        });
        return true;
      }
      return false;
    };

    if (
      !patternSpc.test(textRef.current.value) &&
      (patternEng.test(textRef.current.value) ||
        patternKor.test(textRef.current.value) ||
        patternNum.test(textRef.current.value))
    ) {
      if (addhashtag(textRef.current.value)) {
        textRef.current.clear();
      }
    }
  };

  const onClickDeleteHashtag = (text) => {
    setInformation({
      ...information,
      hashtags: information.hashtags.filter((item) => item !== text),
    });
  };

  const onClickUpload = async (edit) => {
    if (edit) {
      await editPlaylist({
        title: information.title,
        content: information.content,
        hashtag: information.hashtags,
        playlistId: information.playlistId,
        songs,
      });
    } else {
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
        hashtag: information.hashtags,
        songs,
        fd,
      });
    }
    getMyInformation();
  };

  const value = {
    information,
    songs,
    image,
    onChangeValue,
    onClickUpload,
    onClickAddHashtag,
    onClickDeleteHashtag,
    setImage,
    setParams,
    setSongs,
  };

  return <PlaylistCreateContext.Provider value={value}>{children}</PlaylistCreateContext.Provider>;
}
