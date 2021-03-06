import React, { createContext, useContext, useState } from 'react';
import { Context as DailyContext } from 'context/Daily';
import { Context as UserContext } from 'context/User';

const DailyCreateContext = createContext(null);

export const useDailyCreate = () => useContext(DailyCreateContext);

export default function DailyCreateProvider({ children }) {
  const { addDaily, editDaily } = useContext(DailyContext);
  const { getMyInformation } = useContext(UserContext);
  const [information, setInformation] = useState({
    content: '',
    hashtags: [],
    dailyId: '',
  });
  const [song, setSong] = useState(null);
  const [images, setImages] = useState([]);

  const patternSpc = /[~!@#$%^&*()_+|<>?:{}]/;
  const patternNum = /[0-9]/;
  const patternEng = /[a-zA-Z]/;
  const patternKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const setParams = (data) => {
    // eslint-disable-next-line no-shadow
    const { information, song, images } = data;
    if (images.length > 0) {
      setImages(images);
    }
    setSong(song);
    setInformation(information);
  };

  const onChangeValue = (value) => {
    setInformation((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const onClickAddHashtag = (textRef) => {
    const addhashtag = (txt) => {
      if (txt !== '' && !information.hashtags.includes(txt)) {
        setInformation((prev) => ({
          ...prev,
          hashtags: [...prev.hashtags, txt],
        }));
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
    setInformation((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((item) => item !== text),
    }));
  };

  const onClickDeleteSong = () => {
    setSong(null);
  };

  const onClickDeleteImage = (item) => {
    setImages(images.filter((state) => state.uri !== item.uri));
  };

  const onClickUpload = async (edit) => {
    if (edit) {
      await editDaily({
        textcontent: information.content,
        song,
        hashtag: information.hashtags,
        dailyId: information.dailyId,
      });
    } else {
      const fd = new FormData();
      if (images.length > 0) {
        images.forEach(({ name, type, uri }) => {
          fd.append('img', {
            name,
            type,
            uri,
          });
        });
      }
      await addDaily({
        textcontent: information.content,
        hashtag: information.hashtags,
        song,
        fd,
      });
    }
    getMyInformation();
  };

  const value = {
    information,
    song,
    images,
    onChangeValue,
    onClickUpload,
    onClickAddHashtag,
    onClickDeleteHashtag,
    onClickDeleteSong,
    onClickDeleteImage,
    setImages,
    setParams,
    setSong,
  };

  return <DailyCreateContext.Provider value={value}>{children}</DailyCreateContext.Provider>;
}
