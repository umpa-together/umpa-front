import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { Context as NoticeContext, Provider as NoticeProvider } from 'context/Notice';
import { Context as ReportContext, Provider as ReportProvider } from 'context/Report';
import { Context as UserContext } from 'context/User';
import style from 'constants/styles';
import Header from 'components/Header';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1, COLOR_5, COLOR_2, MAIN_COLOR } from 'constants/colors';
import PrivacyPolicyForm from 'components/Setting/PrivatePolicyForm';
import TosForm from 'components/Setting/TosForm';
import AnnouncementForm from 'components/Setting/AnnouncementForm';
import { navigate, goBack } from 'lib/utils/navigation';
import KeyboardProvider, { useKeyboard } from 'providers/keyboard';
import { useFocusEffect } from '@react-navigation/native';

const Notice = () => {
  return null;
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

  return (
    <FlatList
      data={announcement}
      keyExtractor={(_) => _._id}
      contentContainerStyle={styles.announcementContainer}
      renderItem={({ item }) => {
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
      }}
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

  return (
    <>
      <ScrollView>
        <TextInput
          value={feedback}
          onChangeText={(input) => setFeedback(input)}
          placeholder="피드백 및 건의사항을 남겨주세요. &#13;&#10;앱을 더 좋은 방향으로 발전시키고자 회원분들의 사소한 &#13;&#10;의견에도 귀 기울이겠습니다."
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
    bottom: 20 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
  active: {
    backgroundColor: MAIN_COLOR,
  },
  sendText: {
    fontSize: FS(16),
    color: '#fff',
  },
});
