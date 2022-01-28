import React, { createContext, useContext, useEffect, useState } from 'react';
import { Context as UserContext } from 'context/User';
import { Context as AuthContext } from 'context/Auth';
import { goBack } from 'lib/utils/navigation';
import { useScroll } from 'providers/scroll';
import server from 'lib/api/server';
import { useModal } from 'providers/modal';

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
    realName: user ? user.realName : '',
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
  const [validityMsg, setValidityMsg] = useState(null);
  const { arraySort } = useScroll();
  const { onValidityModal } = useModal();

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
    } else if (type === '이름') {
      setProfile({
        ...profile,
        realName: value,
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

  const onClickEdit = async (signUp) => {
    if (profile.nickName.length === 0 || songs.length === 0) {
      setValidityMsg('※ 닉네임, 대표곡을 입력해주세요.');
      onValidityModal();
      return;
    }
    let profileFormData = null;
    let backgroundFormData = null;
    if (profileImage.name !== '') {
      profileFormData = new FormData();
      profileFormData.append('img', {
        name: profileImage.name,
        type: profileImage.type,
        uri: profileImage.uri,
      });
    }
    if (backgroundImage.name !== '') {
      backgroundFormData = new FormData();
      backgroundFormData.append('img', {
        name: backgroundImage.name,
        type: backgroundImage.type,
        uri: backgroundImage.uri,
      });
    }
    const songsChange = arraySort(songs, setSongs);

    if (user.name !== profile.nickName) {
      response = await server.get(`/nickName/${profile.nickName}`);
      if (response.data) {
        await editProfile({
          nickName: profile.nickName,
          name: profile.realName,
          introduction: profile.introduction,
          genre: profile.genre,
          songs: songsChange,
          profileFd: profileFormData,
          backgroundFd: backgroundFormData,
        });
        if (signUp) {
          await tryLocalSignIn();
        } else {
          goBack();
        }
      } else {
        setValidityMsg('※ 닉네임이 같은 계정이 존재합니다.');
        onValidityModal();
      }
    } else {
      await editProfile({
        nickName: profile.nickName,
        name: profile.realName,
        introduction: profile.introduction,
        genre: profile.genre,
        songs: songsChange,
        profileFd: profileFormData,
        backgroundFd: backgroundFormData,
      });
      goBack();
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
    validityMsg,
  };

  return <ProfileEditContext.Provider value={value}>{children}</ProfileEditContext.Provider>;
}
