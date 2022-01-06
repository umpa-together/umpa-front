import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import Header from 'components/Header';
import EditSection, {
  GenreSection,
  RepresentSongSection,
  ProfileImageSection,
} from 'components/Account/EditSection';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';
import { useProfileEdit } from 'providers/profileEdit';
import { Context as UserContext } from 'context/User';

const UploadActions = () => {
  const { onClickEdit } = useProfileEdit();

  return (
    <TouchableOpacity onPress={onClickEdit}>
      <Text>업로드</Text>
    </TouchableOpacity>
  );
};

export default function ProfileEdit() {
  const { setActionType, songsRef, actionsRef } = useSongActions();
  const { songs, setSongs } = useProfileEdit();
  const { state } = useContext(UserContext);

  const sectionLists = [
    {
      title: '닉네임',
      placeholder: '닉네임을 입력해주세요',
    },
    {
      title: '이름',
      placeholder: '이름을 입력해주세요',
    },
    {
      title: '소개글',
      placeholder: '소개글을 입력해주세요',
    },
  ];

  useFocusEffect(
    useCallback(() => {
      actionsRef.current = setSongs;
      setActionType('playlistDeleteSong');
    }, []),
  );

  useEffect(() => {
    if (state.user) {
      songsRef.current = songs;
    }
  }, [songs]);

  return (
    <View style={style.background}>
      <Header title="프로필 편집" back actions={[<UploadActions />]} />
      <ProfileImageSection />
      {sectionLists.map((section) => {
        const { title, placeholder } = section;
        return <EditSection title={title} placeholder={placeholder} key={title} />;
      })}
      <GenreSection />
      <RepresentSongSection />
    </View>
  );
}
