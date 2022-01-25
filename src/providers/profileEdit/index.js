import React, { createContext, useContext, useEffect, useState } from 'react';
import { Context as UserContext } from 'context/User';
import { Context as AuthContext } from 'context/Auth';
import { goBack } from 'lib/utils/navigation';
import { useScroll } from 'providers/scroll';
import server from 'lib/api/server';

const ProfileEditContext = createContext(null);

export const useProfileEdit = () => useContext(ProfileEditContext);

export default function ProfileEditProvider({ children }) {
  const {
    state: { user, genreLists },
    editProfile,
  } = useContext(UserContext);
  const { tryLocalSignIn } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    nickName: user ? user.name : '',
    introduction: user ? user.introduction : '',
    genre: [],
  });
  const [songs, setSongs] = useState(user ? user.songs : []);
  const [profileImage, setProfileImage] = useState({
    name: '',
    uri: user ? user.profileImage : '',
    type: 'image/jpeg',
  });
  const [backgroundImage, setBackgroundImage] = useState({
    name: '',
    uri: user ? user.backgroundImage : '',
    type: 'image/jpeg',
  });
  const { arraySort } = useScroll();

  const onChangeValue = (type, value) => {
    if (type === '닉네임') {
      setProfile({
        ...profile,
        nickName: value,
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
    } else if (profile.genre.length < 3) {
      setProfile({
        ...profile,
        genre: [...profile.genre, genre],
      });
    }
  };

  const onClickEdit = async () => {
    let fd = null;
    if (profileImage.name !== '') {
      fd = new FormData();
      fd.append('img', {
        name: profileImage.name,
        type: profileImage.type,
        uri: profileImage.uri,
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

  const onClickComplete = async () => {
    let fd = null;
    if (profileImage.name !== '') {
      fd = new FormData();
      fd.append('img', {
        name: profileImage.name,
        type: profileImage.type,
        uri: profileImage.uri,
      });
    }
    const songsChange = arraySort(songs, setSongs);
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
      await tryLocalSignIn();
    } else {
      console.log('이름이 똑같은 계정 존재');
    }
  };

  useEffect(() => {
    if (genreLists && profile.genre.length === 0) {
      setProfile({
        ...profile,
        genre: user && user.genre,
      });
    }
  }, [genreLists]);

  const value = {
    profile,
    songs,
    profileImage,
    backgroundImage,
    onChangeValue,
    onClickGenre,
    setSongs,
    setProfileImage,
    setBackgroundImage,
    onClickEdit,
    onClickComplete,
  };

  return <ProfileEditContext.Provider value={value}>{children}</ProfileEditContext.Provider>;
}
