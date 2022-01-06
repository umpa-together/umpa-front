import React, { createContext, useContext, useEffect, useState } from 'react';
import { Context as UserContext } from 'context/User';
import { goBack } from 'lib/utils/navigation';
import { useScroll } from 'providers/scroll';
import server from 'lib/api/server';

const ProfileEditContext = createContext(null);

export const useProfileEdit = () => useContext(ProfileEditContext);

export default function ProfileEditProvider({ children }) {
  const { state, editProfile } = useContext(UserContext);
  const { user } = state;
  const [profile, setProfile] = useState({
    nickName: user ? user.name : '',
    name: user ? user.realName : '',
    introduction: user ? user.introduction : '',
    genre: [],
  });
  const [songs, setSongs] = useState(user ? user.songs : []);
  const [image, setImage] = useState({
    name: '',
    uri: user ? user.profileImage : '',
    type: 'image/jpeg',
  });
  const { arraySort } = useScroll();

  const onChangeValue = (type, value) => {
    if (type === '닉네임') {
      setProfile({
        ...profile,
        nickName: value,
      });
    } else if (type === '이름') {
      setProfile({
        ...profile,
        name: value,
      });
    } else if (type === '소개글') {
      setProfile({
        ...profile,
        introduction: value,
      });
    }
  };

  const onClickGenre = (genre) => {
    if (profile.genre.includes(genre)) {
      setProfile({
        ...profile,
        genre: profile.genre.filter((item) => item !== genre),
      });
    } else {
      setProfile({
        ...profile,
        genre: [...profile.genre, genre],
      });
    }
  };

  const onClickEdit = async () => {
    let fd = null;
    if (image.name !== '') {
      fd = new FormData();
      fd.append('img', {
        name: image.name,
        type: image.type,
        uri: image.uri,
      });
    }
    const songsChange = arraySort(songs, setSongs);

    if (user.name !== profile.nickName) {
      response = await server.get(`/nickName/${profile.nickName}`);
      if (response.data) {
        await editProfile({
          nickName: profile.nickName,
          name: profile.name,
          introduction: profile.introduction,
          genre: profile.genre,
          songs: songsChange,
          fd,
        });
        goBack();
      } else {
        console.log('이름이 똑같은 계정 존재');
      }
    } else {
      await editProfile({
        nickName: profile.nickName,
        name: profile.name,
        introduction: profile.introduction,
        genre: profile.genre,
        songs: songsChange,
        fd,
      });
      goBack();
    }
  };

  useEffect(() => {
    if (state.genreLists) {
      setProfile({
        ...profile,
        genre: state.user.genre,
      });
    }
  }, [state.genreLists]);

  const value = {
    profile,
    songs,
    image,
    onChangeValue,
    onClickGenre,
    setSongs,
    setImage,
    onClickEdit,
  };

  return <ProfileEditContext.Provider value={value}>{children}</ProfileEditContext.Provider>;
}
