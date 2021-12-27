import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Context as AuthContext } from 'context/AuthContext';
import { Context as NoticeContext } from 'context/NoticeContext';
import { NaverLogin } from '@react-native-seoul/naver-login';
import { tmpWidth } from 'components/FontNormalize';
import { navigate } from 'lib/utils/navigation';

const Setting = () => {
  const { signout } = useContext(AuthContext);
  const { deletenoticetoken } = useContext(NoticeContext);
  const AccountLists = ['비밀번호 변경'];
  const AppLists = ['알림 설정'];
  const InformationLists = [
    '공지사항',
    '서비스 이용약관',
    '개인정보 처리방침',
    '피드백 및 건의사항',
  ];
  const SettingLists = [
    {
      title: '계정',
      Lists: AccountLists,
    },
    {
      title: '앱 설정',
      Lists: AppLists,
    },
    {
      title: '이용 안내',
      Lists: InformationLists,
    },
  ];

  const onClickElements = (type) => {
    if (type === '공지사항' || type === '서비스 이용약관' || type === '개인정보 처리방침') {
      navigate('InformationUse', { type });
    } else if (type === '피드백 및 건의사항') {
      navigate('FeedBack');
    }
  };

  const onClickLogOut = async () => {
    await NaverLogin.logout();
    await deletenoticetoken();
    await signout();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={{ backgroundColor: 'rgb(254, 254, 254)' }}
    >
      {SettingLists.map(({ title, Lists }) => (
        <View style={styles.section} key={title}>
          <Text style={styles.title}>{title}</Text>
          {Lists.map((item) => (
            <TouchableOpacity key={item} onPress={() => onClickElements(item)}>
              <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.signOutBox}>
        <TouchableOpacity>
          <Text style={styles.withDraw}>회원 탈퇴</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickLogOut}>
          <Text style={styles.signOut}>로그아웃</Text>
        </TouchableOpacity>
        <Text style={styles.firstLine}>비밀번호 변경 및 계정 삭제는 </Text>
        <Text style={styles.secondLine}>Umpa.together@gmail.com로 문의 부탁드립니다.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 15 * tmpWidth,
    paddingBottom: 24 * tmpWidth,
    backgroundColor: 'rgb(254, 254, 254)',
  },
  section: {
    borderBottomWidth: 4 * tmpWidth,
    borderBottomColor: 'rgba(196,196,196,0.2)',
    paddingLeft: 25 * tmpWidth,
    paddingTop: 16 * tmpWidth,
  },
  title: {
    fontSize: 16 * tmpWidth,
    marginBottom: 16 * tmpWidth,
  },
  item: {
    fontSize: 16 * tmpWidth,
    color: 'rgb(118,118,118)',
    marginBottom: 16 * tmpWidth,
  },
  signOutBox: {
    paddingLeft: 25 * tmpWidth,
    paddingTop: 24 * tmpWidth,
  },
  withDraw: {
    fontSize: 16 * tmpWidth,
    marginBottom: 22 * tmpWidth,
  },
  signOut: {
    fontSize: 16 * tmpWidth,
  },
  firstLine: {
    marginTop: 24 * tmpWidth,
    fontSize: 13 * tmpWidth,
    color: 'rgb(118,118,118)',
  },
  secondLine: {
    marginTop: 5 * tmpWidth,
    fontSize: 13 * tmpWidth,
    color: 'rgb(118,118,118)',
  },
});

export default Setting;
