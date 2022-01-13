import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import style from 'constants/styles';
import Header from 'components/Header';
import EditSection, {
  GenreSection,
  RepresentSongSection,
  ImageSection,
} from 'components/Account/EditSection';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';
import { useProfileEdit } from 'providers/profileEdit';
import { Context as UserContext } from 'context/User';
import { COLOR_1, MAIN_COLOR } from 'constants/colors';
import FS from 'lib/utils/normalize';
import { useScroll } from 'providers/scroll';

const UploadActions = () => {
  const { onClickEdit } = useProfileEdit();

  return (
    <TouchableOpacity onPress={onClickEdit}>
      <Text style={styles.complete}>완료</Text>
    </TouchableOpacity>
  );
};

export default function ProfileEdit() {
  const { setActionType, songsRef, actionsRef } = useSongActions();
  const { songs, setSongs } = useProfileEdit();
  const { state } = useContext(UserContext);
  const { handleOutsideScroll, outsideScrollViewRef } = useScroll();

  const sectionLists = [
    {
      title: '닉네임',
      placeholder: '닉네임을 입력해주세요.',
    },
    {
      title: '이름',
      placeholder: '이름을 입력해주세요',
    },
    {
      title: '소개글',
      placeholder: '간단한 소개를 입력해주세요.',
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
      <Header title="프로필 편집" back actions={[<UploadActions />]} titleStyle={styles.title} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleOutsideScroll}
        ref={outsideScrollViewRef}
        scrollEventThrottle={16}
      >
        <ImageSection />
        <View style={style.alignCenter}>
          {sectionLists.map(({ title, placeholder }) => {
            return <EditSection key={title} title={title} placeholder={placeholder} />;
          })}
          <GenreSection />
          <RepresentSongSection />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(18),
    color: COLOR_1,
    fontWeight: '400',
  },
  complete: {
    fontSize: FS(16),
    color: MAIN_COLOR,
    fontWeight: '400',
  },
});
