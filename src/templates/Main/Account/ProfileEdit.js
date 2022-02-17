import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, BackHandler } from 'react-native';
import { Context as AuthContext } from 'context/Auth';
import style from 'constants/styles';
import Header from 'components/Header';
import EditSection, {
  GenreSection,
  RepresentSongSection,
  ImageSection,
} from 'components/Account/EditSection';
import { useProfileEdit } from 'providers/profileEdit';
import { COLOR_1, MAIN_COLOR, COLOR_5 } from 'constants/colors';
import FS from 'lib/utils/normalize';
import { useScroll } from 'providers/scroll';
import SongActionsProvider from 'providers/songActions';
import ValidityModal from 'components/Modal/ValidityModal';
import { useModal } from 'providers/modal';
import { navigate } from 'lib/utils/navigation';
import Text from 'components/Text';

const UploadActions = ({ signUp }) => {
  const { state } = useContext(AuthContext);
  const { onClickEdit, profile, songs } = useProfileEdit();

  useEffect(() => {
    if (signUp && state.token) {
      setTimeout(() => {
        navigate('Tab');
      }, 100);
    }
  }, [state]);

  return (
    <TouchableOpacity onPress={() => onClickEdit(signUp)}>
      <Text
        style={
          profile.nickName.length > 0 && songs.length > 0 && profile.genre.length > 0
            ? styles.complete
            : styles.notActive
        }
      >
        완료
      </Text>
    </TouchableOpacity>
  );
};

export default function ProfileEdit({ signUp }) {
  const { handleOutsideScroll, outsideScrollViewRef } = useScroll();
  const { validityModal } = useModal();
  const { validityMsg } = useProfileEdit();

  const sectionLists = [
    {
      title: '닉네임',
      placeholder: '닉네임을 입력해주세요 (필수)',
    },
    {
      title: '이름',
      placeholder: '이름을 입력해주세요.',
    },
    {
      title: '소개글',
      placeholder: '간단한 소개를 입력해주세요.',
    },
  ];

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (signUp) {
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, []);

  return (
    <View style={style.background}>
      <Header
        title={signUp ? '프로필 설정 ' : '프로필 편집'}
        back={!signUp}
        actions={[<UploadActions signUp={signUp} />]}
        titleStyle={styles.title}
      />
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
          <SongActionsProvider>
            <RepresentSongSection />
          </SongActionsProvider>
        </View>
      </ScrollView>
      {validityModal && <ValidityModal title={validityMsg} />}
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
  notActive: {
    fontSize: FS(16),
    color: COLOR_5,
  },
});
