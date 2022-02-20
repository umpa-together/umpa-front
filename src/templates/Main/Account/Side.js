import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Linking,
} from 'react-native';
import { Context as NoticeContext, Provider as NoticeProvider } from 'context/Notice';
import { Context as ReportContext, Provider as ReportProvider } from 'context/Report';
import { Context as UserContext } from 'context/User';
import style from 'constants/styles';
import Header from 'components/Header';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1, COLOR_5, COLOR_2, COLOR_6, MAIN_COLOR } from 'constants/colors';
import PrivacyPolicyForm from 'components/Setting/PrivatePolicyForm';
import TosForm from 'components/Setting/TosForm';
import AnnouncementForm from 'components/Setting/AnnouncementForm';
import { navigate, goBack } from 'lib/utils/navigation';
import KeyboardProvider, { useKeyboard } from 'providers/keyboard';
import { useFocusEffect } from '@react-navigation/native';
import WithDrawalSection from 'components/Setting/WithDrawalSection';
import Text from 'components/Text';

const Notice = () => {
  const onClickSetting = () => {
    Linking.openSettings();
  };
  return (
    <View style={[style.space_between, style.flexRow, styles.noticeConatiner]}>
      <View>
        <Text style={styles.noticeTitle}>알림 설정</Text>
        <Text style={styles.noticeSub}>알림을 설정하시려면 설정을 변경해주세요.</Text>
      </View>
      <TouchableOpacity onPress={onClickSetting}>
        <Text style={styles.setting}>설정하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const Announcement = () => {
  const {
    state: { announcement },
    getAnnouncement,
  } = useContext(NoticeContext);
  useEffect(() => {
    getAnnouncement();
  }, []);

  const onClickAnnouncement = (title, time, content) => {
    navigate('SelectedAnnouncement', { title, time, content });
  };

  const keyExtractor = useCallback((_) => _._id);
  const renderItem = useCallback(({ item }) => {
    const { title, time, content } = item;
    const convertedTime = time.slice(0, 10).replaceAll('-', '.');
    return (
      <TouchableOpacity
        onPress={() => onClickAnnouncement(title, convertedTime, content)}
        activeOpacity={0.6}
      >
        <AnnouncementForm title={title} time={convertedTime} />
      </TouchableOpacity>
    );
  }, []);
  return (
    <FlatList
      data={announcement}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.announcementContainer}
      renderItem={renderItem}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
};

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const { keyboardStyle, onKeyboardDidShow, onKeyboardDidHide, keyboardShowOpt, keyboardHideOpt } =
    useKeyboard();
  const { postReport } = useContext(ReportContext);
  const {
    state: { user },
  } = useContext(UserContext);
  useFocusEffect(
    useCallback(() => {
      const showSubscription = Keyboard.addListener(keyboardShowOpt, onKeyboardDidShow);
      const hideSubscription = Keyboard.addListener(keyboardHideOpt, onKeyboardDidHide);

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []),
  );

  const onClickSend = () => {
    if (feedback.length > 0) {
      postReport({
        type: 'Feedback',
        reason: feedback,
        subjectId: user._id,
      });
      goBack();
    }
  };

  const onChangeText = useCallback((text) => setFeedback(text), []);
  return (
    <>
      <ScrollView>
        <TextInput
          value={feedback}
          onChangeText={onChangeText}
          placeholder="음파 앱 이용에 지장을 겪고 계시거나 건의사항이 있으시다면 아래에 남겨주세요.&#13;&#13;보내주신 의견은 음파 팀 전원이 함께 읽고 고민하여 음파를 더 좋은 방향으로 발전시키도록 하겠습니다.&#13;&#13;소중한 의견 감사드립니다:)"
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          style={styles.feedbackContainer}
          placeholderTextColor={COLOR_5}
        />
      </ScrollView>
      <TouchableOpacity
        style={[styles.sendBox, feedback.length > 0 && styles.active, keyboardStyle]}
        onPress={onClickSend}
      >
        <Text style={styles.sendText}>보내기</Text>
      </TouchableOpacity>
    </>
  );
};

const WithDrawal = () => {
  return (
    <ReportProvider>
      <WithDrawalSection />
    </ReportProvider>
  );
};

export default function Side({ type }) {
  const typeLists = {
    Notice: {
      title: '알림 설정',
      component: <Notice />,
    },
    Announcement: {
      title: '공지사항',
      component: (
        <NoticeProvider>
          <Announcement />
        </NoticeProvider>
      ),
    },
    Service: {
      title: '서비스 이용약관',
      component: <TosForm />,
    },
    Privacy: {
      title: '개인정보 처리방침',
      component: <PrivacyPolicyForm />,
    },
    Feedback: {
      title: '피드백 및 건의사항',
      component: (
        <KeyboardProvider>
          <ReportProvider>
            <Feedback />
          </ReportProvider>
        </KeyboardProvider>
      ),
    },
    WithDrawal: {
      title: '회원 탈퇴',
      component: <WithDrawal />,
    },
  };

  return (
    <View style={style.background}>
      <Header title={typeLists[type].title} back titleStyle={styles.title} />
      {typeLists[type].component}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: COLOR_1,
    fontSize: FS(18),
  },
  announcementContainer: {
    paddingTop: 27 * SCALE_HEIGHT,
    marginHorizontal: 16 * SCALE_WIDTH,
  },
  feedbackContainer: {
    paddingHorizontal: 16 * SCALE_WIDTH,
    lineHeight: 24 * SCALE_HEIGHT,
    fontSize: FS(14),
    color: COLOR_2,
  },
  sendBox: {
    width: 343 * SCALE_WIDTH,
    height: 49 * SCALE_HEIGHT,
    borderRadius: 20 * SCALE_HEIGHT,
    backgroundColor: '#c4c4c4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
  active: {
    backgroundColor: MAIN_COLOR,
  },
  sendText: {
    fontSize: FS(16),
    color: '#fff',
  },
  noticeConatiner: {
    paddingHorizontal: 16 * SCALE_WIDTH,
    marginTop: 20 * SCALE_HEIGHT,
    paddingBottom: 21 * SCALE_HEIGHT,
    borderBottomColor: COLOR_6,
    borderBottomWidth: 3 * SCALE_HEIGHT,
  },
  noticeTitle: {
    fontSize: FS(16),
    color: COLOR_2,
  },
  noticeSub: {
    fontSize: FS(12),
    color: COLOR_5,
    marginTop: 10 * SCALE_HEIGHT,
  },
  setting: {
    fontSize: FS(14),
    color: MAIN_COLOR,
  },
});
